"""Servicio del panel administrativo: estadísticas, gráficas y configuración."""
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.models import (
    Visitante, AnalisisIA, Recomendacion, Experiencia,
    Categoria, PerfilTuristico, Respuesta, Configuracion,
)


class AdminService:
    def __init__(self, db: Session) -> None:
        self.db = db

    # ---------- Stats ----------
    def dashboard_stats(self) -> dict:
        c = self.db.scalar
        return {
            "total_visitantes": c(select(func.count()).select_from(Visitante)) or 0,
            "total_analisis": c(select(func.count()).select_from(AnalisisIA)) or 0,
            "total_recomendaciones": c(select(func.count()).select_from(Recomendacion)) or 0,
            "total_experiencias": c(select(func.count()).select_from(Experiencia)) or 0,
            "total_categorias": c(select(func.count()).select_from(Categoria)) or 0,
        }

    # ---------- Charts ----------
    def dashboard_charts(self) -> dict:
        perfiles = self.db.execute(
            select(AnalisisIA.perfil_detectado, func.count())
            .group_by(AnalisisIA.perfil_detectado)
        ).all()

        categorias = self.db.execute(
            select(Categoria.nombre, func.count(Experiencia.id))
            .join(Experiencia, Experiencia.categoria_id == Categoria.id, isouter=True)
            .group_by(Categoria.nombre)
        ).all()

        # Distribución de visitantes por perfil
        distribucion = self.db.execute(
            select(PerfilTuristico.nombre_perfil, func.count(Visitante.id))
            .join(Visitante, Visitante.perfil_id == PerfilTuristico.id, isouter=True)
            .group_by(PerfilTuristico.nombre_perfil)
        ).all()

        # Afinidad: respuestas por categoría destino (via opciones no disponible aquí)
        afinidad = self.db.execute(
            select(Respuesta.respuesta, func.count())
            .group_by(Respuesta.respuesta)
            .order_by(func.count().desc())
            .limit(8)
        ).all()

        def lv(rows):
            return [{"label": str(r[0]), "value": int(r[1])} for r in rows]

        return {
            "perfiles_detectados": lv(perfiles),
            "categorias_elegidas": lv(categorias),
            "distribucion_visitantes": lv(distribucion),
            "afinidad_turistica": lv(afinidad),
        }

    # ---------- Configuración / Tema ----------
    def get_config(self, clave: str, default: str = "") -> str:
        row = self.db.scalar(select(Configuracion).where(Configuracion.clave == clave))
        return row.valor if row else default

    def set_config(self, clave: str, valor: str) -> None:
        row = self.db.scalar(select(Configuracion).where(Configuracion.clave == clave))
        if row:
            row.valor = valor
        else:
            self.db.add(Configuracion(clave=clave, valor=valor))
        self.db.commit()

    def get_theme(self) -> dict:
        return {
            "theme": self.get_config("theme", "ixa"),
            "theme_4t_enabled": self.get_config("theme_4t_enabled", "false"),
        }

    def set_theme(self, theme: str) -> dict:
        theme = "4t" if theme.lower() == "4t" else "ixa"
        self.set_config("theme", theme)
        self.set_config("theme_4t_enabled", "true" if theme == "4t" else "false")
        return self.get_theme()
