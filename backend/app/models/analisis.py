from datetime import datetime
from decimal import Decimal

from sqlalchemy import String, Text, Numeric, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class AnalisisIA(Base):
    __tablename__ = "analisis_ia"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    visitante_id: Mapped[int] = mapped_column(
        ForeignKey("visitante.id", ondelete="CASCADE"), nullable=False
    )
    perfil_detectado: Mapped[str] = mapped_column(String(120), nullable=False)
    confianza: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=0)
    modelo_usado: Mapped[str] = mapped_column(String(80), default="RandomForest")
    explicacion: Mapped[str | None] = mapped_column(Text, nullable=True)
    fecha_analisis: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    visitante: Mapped["Visitante"] = relationship(back_populates="analisis")  # noqa: F821

    @property
    def visitante_nombre(self) -> str | None:
        return self.visitante.nombre if self.visitante else None
