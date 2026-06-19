"""Servicio generador de itinerarios dinámicos basados en el perfil."""
from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Visitante, Experiencia, Recomendacion
from app.services.utils import maps_url

# Plantillas de bloques por tipo de itinerario (horas de inicio sugeridas).
# La hora de fin de cada actividad se calcula con la duración real de la experiencia.
PLANTILLAS = {
    "medio_dia": [("Mañana", ["09:00", "10:30", "12:00"])],
    "1_dia": [
        ("Mañana", ["09:00", "10:30", "12:00"]),
        ("Tarde", ["14:00", "16:00", "17:30"]),
    ],
    "2_dias": [
        ("Día 1 · Mañana", ["09:00", "10:30", "12:00"]),
        ("Día 1 · Tarde", ["14:30", "16:00", "17:30"]),
        ("Día 2 · Mañana", ["09:00", "10:30", "12:00"]),
        ("Día 2 · Tarde", ["15:00", "17:00"]),
    ],
    "fin_de_semana": [
        ("Viernes · Tarde", ["16:00", "18:00"]),
        ("Sábado · Mañana", ["09:00", "10:30", "12:00"]),
        ("Sábado · Tarde", ["15:00", "16:30", "18:00"]),
        ("Domingo · Mañana", ["09:30", "11:00", "12:30"]),
    ],
}


def _rango_horario(inicio: str, duracion_horas) -> str:
    """Devuelve un rango 'HH:MM - HH:MM' usando la duración real de la experiencia."""
    try:
        dur = float(duracion_horas or 1)
    except (TypeError, ValueError):
        dur = 1.0
    dur = max(0.5, min(dur, 6.0))  # acotar para itinerarios razonables
    try:
        start = datetime.strptime(inicio, "%H:%M")
    except ValueError:
        return inicio
    fin = start + timedelta(hours=dur)
    return f"{start.strftime('%H:%M')} - {fin.strftime('%H:%M')}"


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
                        "hora": _rango_horario(hora, exp.duracion_horas),
                        "experiencia": exp,
                        "maps_url": maps_url(exp.latitud, exp.longitud, exp.nombre),
                    })
                    idx += 1
            if actividades:
                bloques.append({"titulo": titulo, "actividades": actividades})

        perfil = visitante.perfil.nombre_perfil if visitante.perfil else "Viajero ÍXA"
        return {"tipo": tipo, "perfil": perfil, "bloques": bloques}
