"""Esquemas del panel administrativo: estadísticas y configuración."""
from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_visitantes: int
    total_analisis: int
    total_recomendaciones: int
    total_experiencias: int
    total_categorias: int


class LabelValue(BaseModel):
    label: str
    value: int


class DashboardCharts(BaseModel):
    perfiles_detectados: list[LabelValue]
    categorias_elegidas: list[LabelValue]
    distribucion_visitantes: list[LabelValue]
    afinidad_turistica: list[LabelValue]


class ConfigItem(BaseModel):
    clave: str
    valor: str


class ThemeUpdate(BaseModel):
    theme: str  # "ixa" | "4t"
