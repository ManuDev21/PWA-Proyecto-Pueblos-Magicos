from datetime import datetime

from sqlalchemy import String, Text, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Configuracion(Base):
    __tablename__ = "configuracion"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    clave: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    valor: Mapped[str] = mapped_column(Text, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )
