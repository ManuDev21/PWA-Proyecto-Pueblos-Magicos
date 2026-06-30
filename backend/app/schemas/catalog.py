"""Esquemas de catálogo: perfil, categoría, pregunta, experiencia."""
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


# ---------- Perfil ----------
class PerfilBase(BaseModel):
    nombre_perfil: str = Field(..., max_length=120)
    descripcion: str
    icono: str | None = None
    color_hex: str = "#0F3D2E"


class PerfilCreate(PerfilBase):
    pass


class PerfilOut(PerfilBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Categoría ----------
class CategoriaBase(BaseModel):
    nombre: str = Field(..., max_length=120)
    descripcion: str
    icono: str | None = None
    color_hex: str = "#C9A227"


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    icono: str | None = None
    color_hex: str | None = None


class CategoriaOut(CategoriaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Opción de respuesta ----------
class OpcionBase(BaseModel):
    inciso: str = Field(..., max_length=1)
    texto: str
    categoria_destino: str
    puntuacion: int = 1


class OpcionCreate(OpcionBase):
    pass


class OpcionOut(OpcionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


# ---------- Pregunta ----------
class PreguntaBase(BaseModel):
    pregunta: str
    categoria: str = "mixta"
    orden: int = 0
    activa: bool = True


class PreguntaCreate(PreguntaBase):
    opciones: list[OpcionCreate] = []


class PreguntaUpdate(BaseModel):
    pregunta: str | None = None
    categoria: str | None = None
    orden: int | None = None
    activa: bool | None = None
    opciones: list[OpcionCreate] | None = None


class PreguntaOut(PreguntaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    opciones: list[OpcionOut] = []


# ---------- Experiencia ----------
class ExperienciaBase(BaseModel):
    categoria_id: int
    nombre: str = Field(..., max_length=180)
    descripcion: str
    historia: str | None = None
    latitud: Decimal | None = None
    longitud: Decimal | None = None
    imagen_url: str | None = None
    puntuacion_promedio: Decimal = Decimal("0")
    duracion_horas: Decimal = Decimal("2")
    precio_aprox: Decimal = Decimal("0")
    pueblo_magico: str = "Isla Mujeres"
    activa: bool = True


class ExperienciaCreate(ExperienciaBase):
    pass


class ExperienciaUpdate(BaseModel):
    categoria_id: int | None = None
    nombre: str | None = None
    descripcion: str | None = None
    historia: str | None = None
    latitud: Decimal | None = None
    longitud: Decimal | None = None
    imagen_url: str | None = None
    puntuacion_promedio: Decimal | None = None
    duracion_horas: Decimal | None = None
    precio_aprox: Decimal | None = None
    activa: bool | None = None


class ExperienciaOut(ExperienciaBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    categoria: CategoriaOut | None = None
