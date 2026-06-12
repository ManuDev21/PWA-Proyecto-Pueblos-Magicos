"""Servicio generador de itinerarios dinámicos basados en el perfil."""
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Visitante, Experiencia, Recomendacion
from app.services.utils import maps_url

# Plantillas de bloques por tipo de itinerario
PLANTILLAS = {
    "medio_dia": [("Mañana", ["09:00", "11:00"])],
    "1_dia": [("Mañana", ["09:00", "11:00"]), ("Tarde", ["14:00", "17:00"])],
    "2_dias": [
        ("Día 1 · Mañana", ["09:00", "11:30"]),
        ("Día 1 · Tarde", ["15:00", "17:30"]),
        ("Día 2 · Mañana", ["09:00", "11:30"]),
        ("Día 2 · Tarde", ["15:00", "17:30"]),
    ],
    "fin_de_semana": [
        ("Viernes · Tarde", ["16:00", "18:30"]),
        ("Sábado · Mañana", ["09:00", "11:30"]),
        ("Sábado · Tarde", ["15:00", "17:30"]),
        ("Domingo · Mañana", ["09:30", "12:00"]),
    ],
}


class ItineraryService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def generate(self, visitante_id: int, tipo: str) -> dict:
        visitante = self.db.get(Visitante, visitante_id)
        if not visitante:
            raise ValueError("Visitante no encontrado")

        plantilla = PLANTILLAS.get(tipo, PLANTILLAS["1_dia"])

        # Experiencias recomendadas ordenadas por score
        recs = self.db.scalars(
            select(Recomendacion)
            .options(
                selectinload(Recomendacion.experiencia).selectinload(Experiencia.categoria)
            )
            .where(Recomendacion.visitante_id == visitante_id)
            .order_by(Recomendacion.score.desc())
        ).all()
        experiencias = [r.experiencia for r in recs if r.experiencia]

        if not experiencias:
            experiencias = list(self.db.scalars(
                select(Experiencia)
                .options(selectinload(Experiencia.categoria))
                .where(Experiencia.activa == True)  # noqa: E712
                .order_by(Experiencia.puntuacion_promedio.desc())
            ).all())

        bloques = []
        idx = 0
        for titulo, horas in plantilla:
            actividades = []
            for hora in horas:
                if idx < len(experiencias):
                    exp = experiencias[idx]
                    actividades.append({
                        "hora": hora,
                        "experiencia": exp,
                        "maps_url": maps_url(exp.latitud, exp.longitud, exp.nombre),
                    })
                    idx += 1
            if actividades:
                bloques.append({"titulo": titulo, "actividades": actividades})

        perfil = visitante.perfil.nombre_perfil if visitante.perfil else "Viajero ÍXA"
        return {"tipo": tipo, "perfil": perfil, "bloques": bloques}
