from datetime import datetime

from sqlalchemy import String, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Visitante(Base):
    __tablename__ = "visitante"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    edad: Mapped[int] = mapped_column(Integer, nullable=False)
    correo_electronico: Mapped[str] = mapped_column(String(180), nullable=False)
    telefono: Mapped[str | None] = mapped_column(String(30), nullable=True)
    fecha_registro: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    perfil_id: Mapped[int | None] = mapped_column(
        ForeignKey("perfil_turistico.id", ondelete="SET NULL"), nullable=True
    )

    perfil: Mapped["PerfilTuristico"] = relationship(back_populates="visitantes")  # noqa: F821
    respuestas: Mapped[list["Respuesta"]] = relationship(  # noqa: F821
        back_populates="visitante", cascade="all, delete-orphan"
    )
    recomendaciones: Mapped[list["Recomendacion"]] = relationship(  # noqa: F821
        back_populates="visitante", cascade="all, delete-orphan"
    )
    analisis: Mapped[list["AnalisisIA"]] = relationship(  # noqa: F821
        back_populates="visitante", cascade="all, delete-orphan"
    )
