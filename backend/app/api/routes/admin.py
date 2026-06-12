"""Rutas del panel administrativo: estadísticas, gráficas, tema e IA."""
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import AnalisisIA
from app.schemas.admin import DashboardStats, DashboardCharts, ThemeUpdate
from app.schemas.ai import AnalisisOut
from app.services.admin_service import AdminService

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats", response_model=DashboardStats)
def estadisticas(db: Session = Depends(get_db)):
    return AdminService(db).dashboard_stats()


@router.get("/charts", response_model=DashboardCharts)
def graficas(db: Session = Depends(get_db)):
    return AdminService(db).dashboard_charts()


@router.get("/analisis", response_model=list[AnalisisOut])
def historial_analisis(db: Session = Depends(get_db)):
    return db.scalars(
        select(AnalisisIA).order_by(AnalisisIA.fecha_analisis.desc())
    ).all()


@router.get("/theme")
def obtener_tema(db: Session = Depends(get_db)):
    return AdminService(db).get_theme()


@router.put("/theme")
def actualizar_tema(payload: ThemeUpdate, db: Session = Depends(get_db)):
    """Cambia el tema global (ÍXA <-> 4T) de forma permanente."""
    return AdminService(db).set_theme(payload.theme)
