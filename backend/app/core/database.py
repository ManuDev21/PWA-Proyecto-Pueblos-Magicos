"""Configuración de la base de datos (SQLAlchemy 2.0)."""
import os
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

from app.core.config import settings

_is_production = os.getenv("DB_HOST", "localhost") not in ("localhost", "127.0.0.1")

_connect_args = {}
if _is_production:
    _connect_args["ssl"] = {"ssl_mode": "REQUIRED"}

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False,
    connect_args=_connect_args,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Base declarativa para todos los modelos ORM."""
    pass


def get_db() -> Generator[Session, None, None]:
    """Dependencia FastAPI que provee una sesión de base de datos."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
