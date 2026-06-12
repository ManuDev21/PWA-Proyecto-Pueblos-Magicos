"""Configuración de la base de datos (SQLAlchemy 2.0)."""
from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

from app.core.config import settings

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False,
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
