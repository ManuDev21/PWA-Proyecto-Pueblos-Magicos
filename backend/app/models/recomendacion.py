from datetime import datetime
from decimal import Decimal

from sqlalchemy import Numeric, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Recomendacion(Base):
    __tablename__ = "recomendacion"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    visitante_id: Mapped[int] = mapped_column(
        ForeignKey("visitante.id", ondelete="CASCADE"), nullable=False
    )
    experiencia_id: Mapped[int] = mapped_column(
        ForeignKey("experiencia.id", ondelete="CASCADE"), nullable=False
    )
    score: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=0)
    fecha_generada: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    visitante: Mapped["Visitante"] = relationship(back_populates="recomendaciones")  # noqa: F821
    experiencia: Mapped["Experiencia"] = relationship()  # noqa: F821
