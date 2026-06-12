"""Esquemas de visitante, respuestas y envío del quiz."""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class VisitanteBase(BaseModel):
    nombre: str = Field(..., max_length=150)
    edad: int = Field(..., ge=1, le=120)
    correo_electronico: EmailStr
    telefono: str | None = Field(None, max_length=30)


class VisitanteCreate(VisitanteBase):
    pass


class VisitanteOut(VisitanteBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    perfil_id: int | None = None
    fecha_registro: datetime


class RespuestaIn(BaseModel):
    pregunta_id: int
    inciso: str = Field(..., max_length=1)


class QuizSubmission(BaseModel):
    """Envío completo: datos del visitante + respuestas del quiz."""
    visitante: VisitanteCreate
    respuestas: list[RespuestaIn]


class NombreCheck(BaseModel):
    nombre: str


class NombreCheckOut(BaseModel):
    is_admin: bool
    redirect: str
