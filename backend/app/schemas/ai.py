"""Esquemas de IA: análisis, recomendaciones e itinerarios."""
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict

from app.schemas.catalog import ExperienciaOut


class AnalisisOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    visitante_id: int
    visitante_nombre: str | None = None
    perfil_detectado: str
    confianza: Decimal
    modelo_usado: str
    explicacion: str | None = None
    fecha_analisis: datetime


class RecomendacionItem(BaseModel):
    experiencia: ExperienciaOut
    score: float
    maps_url: str


class CategoriaScore(BaseModel):
    categoria: str
    puntos: int


class RecommendationResult(BaseModel):
    """Resultado completo entregado tras el quiz."""
    visitante_id: int
    perfil_detectado: str
    confianza: float
    modelo_usado: str
    explicacion: str
    puntuaciones: list[CategoriaScore]
    recomendaciones: list[RecomendacionItem]


class ItinerarioActividad(BaseModel):
    hora: str
    experiencia: ExperienciaOut
    maps_url: str


class ItinerarioBloque(BaseModel):
    titulo: str
    actividades: list[ItinerarioActividad]


class ItinerarioResult(BaseModel):
    tipo: str
    perfil: str
    bloques: list[ItinerarioBloque]
