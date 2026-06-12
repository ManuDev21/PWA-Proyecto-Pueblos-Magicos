"""Rutas del flujo del visitante: chatbot, quiz, recomendaciones, itinerario."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.config import settings
from app.core.database import get_db
from app.models import Pregunta, AnalisisIA, Recomendacion, Experiencia
from app.schemas.visitor import NombreCheck, NombreCheckOut, QuizSubmission
from app.schemas.catalog import PreguntaOut
from app.schemas.ai import RecommendationResult, ItinerarioResult
from app.services.quiz_service import QuizService
from app.services.itinerary_service import ItineraryService
from app.services.utils import maps_url

router = APIRouter(tags=["visitante"])


@router.post("/check-admin", response_model=NombreCheckOut)
def check_admin(payload: NombreCheck):
    """Detecta si el nombre corresponde al administrador."""
    is_admin = payload.nombre.strip().lower() == settings.ADMIN_EMAIL.lower()
    return NombreCheckOut(
        is_admin=is_admin,
        redirect="/admin" if is_admin else "/quiz",
    )


@router.get("/preguntas", response_model=list[PreguntaOut])
def listar_preguntas(db: Session = Depends(get_db)):
    """Devuelve las preguntas activas del quiz con sus opciones."""
    preguntas = db.scalars(
        select(Pregunta)
        .options(selectinload(Pregunta.opciones))
        .where(Pregunta.activa == True)  # noqa: E712
        .order_by(Pregunta.orden)
    ).all()
    return preguntas


@router.post("/quiz/submit", response_model=RecommendationResult)
def enviar_quiz(submission: QuizSubmission, db: Session = Depends(get_db)):
    """Procesa el quiz, ejecuta IA y genera recomendaciones explicables."""
    service = QuizService(db)
    return service.process(submission)


@router.get("/recomendaciones/{visitante_id}", response_model=RecommendationResult)
def obtener_recomendaciones(visitante_id: int, db: Session = Depends(get_db)):
    """Recupera el resultado IA y recomendaciones de un visitante."""
    analisis = db.scalar(
        select(AnalisisIA)
        .where(AnalisisIA.visitante_id == visitante_id)
        .order_by(AnalisisIA.fecha_analisis.desc())
    )
    if not analisis:
        raise HTTPException(404, "No hay análisis para este visitante")

    recs = db.scalars(
        select(Recomendacion)
        .options(
            selectinload(Recomendacion.experiencia).selectinload(Experiencia.categoria)
        )
        .where(Recomendacion.visitante_id == visitante_id)
        .order_by(Recomendacion.score.desc())
    ).all()

    recomendaciones = [
        {
            "experiencia": r.experiencia,
            "score": float(r.score),
            "maps_url": maps_url(
                r.experiencia.latitud, r.experiencia.longitud, r.experiencia.nombre
            ),
        }
        for r in recs if r.experiencia
    ]

    return {
        "visitante_id": visitante_id,
        "perfil_detectado": analisis.perfil_detectado,
        "confianza": float(analisis.confianza),
        "modelo_usado": analisis.modelo_usado,
        "explicacion": analisis.explicacion or "",
        "puntuaciones": [],
        "recomendaciones": recomendaciones,
    }


@router.get("/itinerario/{visitante_id}", response_model=ItinerarioResult)
def generar_itinerario(
    visitante_id: int, tipo: str = "1_dia", db: Session = Depends(get_db)
):
    """Genera un itinerario dinámico: medio_dia | 1_dia | 2_dias | fin_de_semana."""
    try:
        return ItineraryService(db).generate(visitante_id, tipo)
    except ValueError as e:
        raise HTTPException(404, str(e))
