"""Servicio del quiz: procesa el envío, ejecuta IA y genera recomendaciones."""
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.ml.recommender import get_engine, CATEGORY_TO_PROFILE
from app.models import (
    Visitante, Pregunta, OpcionRespuesta, Respuesta,
    PerfilTuristico, Experiencia, Recomendacion, AnalisisIA, Categoria,
)
from app.schemas.visitor import QuizSubmission
from app.services.utils import maps_url

MAX_RECOMENDACIONES = 8


class QuizService:
    def __init__(self, db: Session) -> None:
        self.db = db
        self.engine = get_engine()

    # ----------------------------------------------------------------
    def process(self, submission: QuizSubmission) -> dict:
        # 1) Crear visitante
        visitante = Visitante(**submission.visitante.model_dump())
        self.db.add(visitante)
        self.db.flush()

        # 2) Registrar respuestas + recolectar categorías
        answer_categories: list[str] = []
        for r in submission.respuestas:
            opcion = self.db.scalar(
                select(OpcionRespuesta).where(
                    OpcionRespuesta.pregunta_id == r.pregunta_id,
                    OpcionRespuesta.inciso == r.inciso.upper(),
                )
            )
            if not opcion:
                continue
            answer_categories.append(opcion.categoria_destino)
            self.db.add(Respuesta(
                visitante_id=visitante.id,
                pregunta_id=r.pregunta_id,
                respuesta=opcion.texto,
                puntuacion=opcion.puntuacion,
            ))

        # 3) Capa 1 + Capa 2 (IA)
        result = self.engine.predict(answer_categories, model_name="RandomForest")
        perfil_nombre = result["perfil_detectado"]

        # 4) Asignar perfil al visitante
        perfil = self.db.scalar(
            select(PerfilTuristico).where(PerfilTuristico.nombre_perfil == perfil_nombre)
        )
        if perfil:
            visitante.perfil_id = perfil.id

        # 5) Guardar análisis IA
        analisis = AnalisisIA(
            visitante_id=visitante.id,
            perfil_detectado=perfil_nombre,
            confianza=result["confianza"],
            modelo_usado=result["modelo_usado"],
            explicacion=result["explicacion"],
        )
        self.db.add(analisis)

        # 6) Generar recomendaciones
        recomendaciones = self._generate_recommendations(
            visitante.id, result["puntuaciones"], result["categoria_dominante"]
        )

        self.db.commit()
        self.db.refresh(visitante)

        return {
            "visitante_id": visitante.id,
            "perfil_detectado": perfil_nombre,
            "confianza": result["confianza"],
            "modelo_usado": result["modelo_usado"],
            "explicacion": result["explicacion"],
            "puntuaciones": [
                {"categoria": k, "puntos": v} for k, v in result["puntuaciones"].items()
            ],
            "recomendaciones": recomendaciones,
        }

    # ----------------------------------------------------------------
    def _generate_recommendations(
        self, visitante_id: int, scores: dict[str, int], dominante: str
    ) -> list[dict]:
        # Ordenar categorías por puntaje
        ordered = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
        cat_weight = {c: v for c, v in scores.items()}

        experiencias = self.db.scalars(
            select(Experiencia)
            .options(selectinload(Experiencia.categoria))
            .where(Experiencia.activa == True)  # noqa: E712
        ).all()

        scored: list[tuple[float, Experiencia]] = []
        for exp in experiencias:
            cat = exp.categoria.nombre if exp.categoria else ""
            weight = cat_weight.get(cat, 0)
            base = float(exp.puntuacion_promedio or 0)
            # score = afinidad de categoría (peso) * 10 + reputación
            score = weight * 10.0 + base * 2.0
            if cat == dominante:
                score += 15.0
            scored.append((score, exp))

        scored.sort(key=lambda t: t[0], reverse=True)
        top = scored[:MAX_RECOMENDACIONES]

        items = []
        for score, exp in top:
            self.db.add(Recomendacion(
                visitante_id=visitante_id,
                experiencia_id=exp.id,
                score=round(score, 2),
            ))
            items.append({
                "experiencia": exp,
                "score": round(score, 2),
                "maps_url": maps_url(exp.latitud, exp.longitud, exp.nombre),
            })
        return items
