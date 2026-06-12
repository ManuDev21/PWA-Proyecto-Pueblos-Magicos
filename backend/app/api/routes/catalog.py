"""Rutas CRUD de catálogo: categorías, experiencias, preguntas, perfiles."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.database import get_db
from app.models import Categoria, Experiencia, Pregunta, OpcionRespuesta, PerfilTuristico
from app.repositories.base import BaseRepository
from app.schemas.catalog import (
    CategoriaCreate, CategoriaUpdate, CategoriaOut,
    ExperienciaCreate, ExperienciaUpdate, ExperienciaOut,
    PreguntaCreate, PreguntaUpdate, PreguntaOut,
    PerfilOut,
)

router = APIRouter(tags=["catalogo"])


# ===================== PERFILES =====================
@router.get("/perfiles", response_model=list[PerfilOut])
def listar_perfiles(db: Session = Depends(get_db)):
    return BaseRepository(PerfilTuristico, db).list()


# ===================== CATEGORÍAS =====================
@router.get("/categorias", response_model=list[CategoriaOut])
def listar_categorias(db: Session = Depends(get_db)):
    return BaseRepository(Categoria, db).list()


@router.post("/categorias", response_model=CategoriaOut, status_code=201)
def crear_categoria(payload: CategoriaCreate, db: Session = Depends(get_db)):
    return BaseRepository(Categoria, db).create(payload.model_dump())


@router.put("/categorias/{cat_id}", response_model=CategoriaOut)
def editar_categoria(cat_id: int, payload: CategoriaUpdate, db: Session = Depends(get_db)):
    repo = BaseRepository(Categoria, db)
    obj = repo.get(cat_id)
    if not obj:
        raise HTTPException(404, "Categoría no encontrada")
    return repo.update(obj, payload.model_dump(exclude_unset=True))


@router.delete("/categorias/{cat_id}", status_code=204)
def eliminar_categoria(cat_id: int, db: Session = Depends(get_db)):
    repo = BaseRepository(Categoria, db)
    obj = repo.get(cat_id)
    if not obj:
        raise HTTPException(404, "Categoría no encontrada")
    repo.delete(obj)


# ===================== EXPERIENCIAS =====================
@router.get("/experiencias", response_model=list[ExperienciaOut])
def listar_experiencias(db: Session = Depends(get_db)):
    return db.scalars(
        select(Experiencia).options(selectinload(Experiencia.categoria))
    ).all()


@router.post("/experiencias", response_model=ExperienciaOut, status_code=201)
def crear_experiencia(payload: ExperienciaCreate, db: Session = Depends(get_db)):
    obj = BaseRepository(Experiencia, db).create(payload.model_dump())
    db.refresh(obj)
    return obj


@router.put("/experiencias/{exp_id}", response_model=ExperienciaOut)
def editar_experiencia(exp_id: int, payload: ExperienciaUpdate, db: Session = Depends(get_db)):
    repo = BaseRepository(Experiencia, db)
    obj = repo.get(exp_id)
    if not obj:
        raise HTTPException(404, "Experiencia no encontrada")
    return repo.update(obj, payload.model_dump(exclude_unset=True))


@router.delete("/experiencias/{exp_id}", status_code=204)
def eliminar_experiencia(exp_id: int, db: Session = Depends(get_db)):
    repo = BaseRepository(Experiencia, db)
    obj = repo.get(exp_id)
    if not obj:
        raise HTTPException(404, "Experiencia no encontrada")
    repo.delete(obj)


# ===================== PREGUNTAS =====================
@router.get("/preguntas-admin", response_model=list[PreguntaOut])
def listar_preguntas_admin(db: Session = Depends(get_db)):
    return db.scalars(
        select(Pregunta).options(selectinload(Pregunta.opciones)).order_by(Pregunta.orden)
    ).all()


@router.post("/preguntas", response_model=PreguntaOut, status_code=201)
def crear_pregunta(payload: PreguntaCreate, db: Session = Depends(get_db)):
    pregunta = Pregunta(
        pregunta=payload.pregunta,
        categoria=payload.categoria,
        orden=payload.orden,
        activa=payload.activa,
    )
    db.add(pregunta)
    db.flush()
    for op in payload.opciones:
        db.add(OpcionRespuesta(pregunta_id=pregunta.id, **op.model_dump()))
    db.commit()
    db.refresh(pregunta)
    return pregunta


@router.put("/preguntas/{q_id}", response_model=PreguntaOut)
def editar_pregunta(q_id: int, payload: PreguntaUpdate, db: Session = Depends(get_db)):
    repo = BaseRepository(Pregunta, db)
    obj = repo.get(q_id)
    if not obj:
        raise HTTPException(404, "Pregunta no encontrada")
    return repo.update(obj, payload.model_dump(exclude_unset=True))


@router.delete("/preguntas/{q_id}", status_code=204)
def eliminar_pregunta(q_id: int, db: Session = Depends(get_db)):
    repo = BaseRepository(Pregunta, db)
    obj = repo.get(q_id)
    if not obj:
        raise HTTPException(404, "Pregunta no encontrada")
    repo.delete(obj)
