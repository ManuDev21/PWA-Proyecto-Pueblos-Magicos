from datetime import datetime

from sqlalchemy import String, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class PerfilTuristico(Base):
    __tablename__ = "perfil_turistico"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre_perfil: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    icono: Mapped[str | None] = mapped_column(String(60), nullable=True)
    color_hex: Mapped[str] = mapped_column(String(9), default="#0F3D2E")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    visitantes: Mapped[list["Visitante"]] = relationship(back_populates="perfil")  # noqa: F821
