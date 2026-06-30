from datetime import datetime
from decimal import Decimal

from sqlalchemy import String, Text, Numeric, Boolean, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Experiencia(Base):
    __tablename__ = "experiencia"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    categoria_id: Mapped[int] = mapped_column(
        ForeignKey("categoria.id", ondelete="CASCADE"), nullable=False
    )
    nombre: Mapped[str] = mapped_column(String(180), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    historia: Mapped[str | None] = mapped_column(Text, nullable=True)
    latitud: Mapped[Decimal | None] = mapped_column(Numeric(10, 7), nullable=True)
    longitud: Mapped[Decimal | None] = mapped_column(Numeric(10, 7), nullable=True)
    imagen_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    puntuacion_promedio: Mapped[Decimal] = mapped_column(Numeric(3, 2), default=0)
    duracion_horas: Mapped[Decimal] = mapped_column(Numeric(4, 1), default=2)
    precio_aprox: Mapped[Decimal] = mapped_column(Numeric(8, 2), default=0)
    pueblo_magico: Mapped[str] = mapped_column(String(120), default="Isla Mujeres")
    activa: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    categoria: Mapped["Categoria"] = relationship(back_populates="experiencias")  # noqa: F821
