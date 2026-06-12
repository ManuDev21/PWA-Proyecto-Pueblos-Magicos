"""Punto de entrada de la API ÍXA."""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import visitor, catalog, admin
from app.ml.recommender import get_engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-entrena los modelos de IA al arrancar
    get_engine()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="API del Algoritmo de Recomendación de Experiencias Turísticas · "
                "Pueblos Mágicos de Isla Mujeres.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visitor.router, prefix=settings.API_PREFIX)
app.include_router(catalog.router, prefix=settings.API_PREFIX)
app.include_router(admin.router, prefix=settings.API_PREFIX)


@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs": "/docs",
    }


@app.get(f"{settings.API_PREFIX}/health")
def health():
    return {"status": "ok"}
