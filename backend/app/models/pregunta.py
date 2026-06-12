from datetime import datetime

from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Pregunta(Base):
    __tablename__ = "pregunta"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    pregunta: Mapped[str] = mapped_column(String(400), nullable=False)
    categoria: Mapped[str] = mapped_column(String(120), nullable=False)
    orden: Mapped[int] = mapped_column(Integer, default=0)
    activa: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    opciones: Mapped[list["OpcionRespuesta"]] = relationship(
        back_populates="pregunta", cascade="all, delete-orphan",
        order_by="OpcionRespuesta.inciso",
    )


class OpcionRespuesta(Base):
    __tablename__ = "opcion_respuesta"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    pregunta_id: Mapped[int] = mapped_column(
        ForeignKey("pregunta.id", ondelete="CASCADE"), nullable=False
    )
    inciso: Mapped[str] = mapped_column(String(1), nullable=False)
    texto: Mapped[str] = mapped_column(String(300), nullable=False)
    categoria_destino: Mapped[str] = mapped_column(String(120), nullable=False)
    puntuacion: Mapped[int] = mapped_column(Integer, default=1)

    pregunta: Mapped["Pregunta"] = relationship(back_populates="opciones")
