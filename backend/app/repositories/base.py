"""Repositorio genérico (Repository Pattern) para operaciones CRUD."""
from typing import Generic, TypeVar

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: type[ModelType], db: Session) -> None:
        self.model = model
        self.db = db

    def get(self, obj_id: int) -> ModelType | None:
        return self.db.get(self.model, obj_id)

    def list(self) -> list[ModelType]:
        return list(self.db.scalars(select(self.model)).all())

    def create(self, data: dict) -> ModelType:
        obj = self.model(**data)
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def update(self, obj: ModelType, data: dict) -> ModelType:
        for key, value in data.items():
            if value is not None:
                setattr(obj, key, value)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def delete(self, obj: ModelType) -> None:
        self.db.delete(obj)
        self.db.commit()

    def count(self) -> int:
        from sqlalchemy import func
        return self.db.scalar(select(func.count()).select_from(self.model)) or 0
