from datetime import datetime

from sqlalchemy import String, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Categoria(Base):
    __tablename__ = "categoria"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    icono: Mapped[str | None] = mapped_column(String(60), nullable=True)
    color_hex: Mapped[str] = mapped_column(String(9), default="#C9A227")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    experiencias: Mapped[list["Experiencia"]] = relationship(  # noqa: F821
        back_populates="categoria", cascade="all, delete-orphan"
    )
