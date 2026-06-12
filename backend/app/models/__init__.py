"""Modelos ORM de ÍXA."""
from app.models.perfil import PerfilTuristico
from app.models.categoria import Categoria
from app.models.visitante import Visitante
from app.models.pregunta import Pregunta, OpcionRespuesta
from app.models.respuesta import Respuesta
from app.models.experiencia import Experiencia
from app.models.recomendacion import Recomendacion
from app.models.analisis import AnalisisIA
from app.models.configuracion import Configuracion

__all__ = [
    "PerfilTuristico",
    "Categoria",
    "Visitante",
    "Pregunta",
    "OpcionRespuesta",
    "Respuesta",
    "Experiencia",
    "Recomendacion",
    "AnalisisIA",
    "Configuracion",
]
