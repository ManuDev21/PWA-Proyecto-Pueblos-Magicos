from datetime import datetime

from sqlalchemy import String, Integer, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Respuesta(Base):
    __tablename__ = "respuesta"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    visitante_id: Mapped[int] = mapped_column(
        ForeignKey("visitante.id", ondelete="CASCADE"), nullable=False
    )
    pregunta_id: Mapped[int] = mapped_column(
        ForeignKey("pregunta.id", ondelete="CASCADE"), nullable=False
    )
    respuesta: Mapped[str] = mapped_column(String(300), nullable=False)
    puntuacion: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    visitante: Mapped["Visitante"] = relationship(back_populates="respuestas")  # noqa: F821
