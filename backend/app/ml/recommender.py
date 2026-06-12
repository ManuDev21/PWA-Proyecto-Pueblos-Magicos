"""
Motor de Recomendación ÍXA (Machine Learning).

Capa 1: Sistema de puntuación por categoría (regla determinista).
Capa 2: Clasificación IA con Random Forest, KNN y Decision Tree
        entrenados sobre datos sintéticos generados a partir de
        distribuciones de afinidad por perfil turístico.

Características (features): vector de 5 dimensiones con el conteo de
respuestas por categoría -> [Cultural, Gastronómico, Ecológico,
Comunitario, Bienestar].
"""
from __future__ import annotations

import threading

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

# Orden canónico de categorías (features)
CATEGORIES: list[str] = [
    "Cultural",
    "Gastronómico",
    "Ecológico",
    "Comunitario",
    "Bienestar",
]

# Mapeo categoría dominante -> perfil turístico
CATEGORY_TO_PROFILE: dict[str, str] = {
    "Cultural": "Explorador Cultural",
    "Gastronómico": "Viajero Gastronómico",
    "Ecológico": "Ecoturista",
    "Comunitario": "Descubridor Comunitario",
    "Bienestar": "Buscador de Bienestar",
}

PROFILES: list[str] = [CATEGORY_TO_PROFILE[c] for c in CATEGORIES]

N_QUESTIONS = 10


class RecommenderEngine:
    """Singleton perezoso con los tres modelos entrenados."""

    _instance: "RecommenderEngine | None" = None
    _lock = threading.Lock()

    def __init__(self) -> None:
        self.models: dict = {}
        self._train_all()

    # ----------------------------------------------------------------
    @classmethod
    def instance(cls) -> "RecommenderEngine":
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = RecommenderEngine()
        return cls._instance

    # ----------------------------------------------------------------
    def _generate_dataset(self, n_per_profile: int = 600, seed: int = 42):
        """Genera datos sintéticos con Dirichlet sesgado a cada perfil."""
        rng = np.random.default_rng(seed)
        X, y = [], []
        n_cat = len(CATEGORIES)
        for idx in range(n_cat):
            # alpha alto en la categoría dominante -> afinidad marcada
            alpha = np.ones(n_cat) * 1.2
            alpha[idx] = 7.0
            for _ in range(n_per_profile):
                probs = rng.dirichlet(alpha)
                counts = rng.multinomial(N_QUESTIONS, probs)
                X.append(counts)
                y.append(idx)
        return np.array(X), np.array(y)

    def _train_all(self) -> None:
        X, y = self._generate_dataset()
        self.models = {
            "RandomForest": RandomForestClassifier(
                n_estimators=160, max_depth=10, random_state=42
            ).fit(X, y),
            "KNN": KNeighborsClassifier(n_neighbors=15).fit(X, y),
            "DecisionTree": DecisionTreeClassifier(
                max_depth=8, random_state=42
            ).fit(X, y),
        }

    # ----------------------------------------------------------------
    def category_scores(self, answers_categories: list[str]) -> dict[str, int]:
        """Capa 1: cuenta puntos por categoría."""
        scores = {c: 0 for c in CATEGORIES}
        for cat in answers_categories:
            if cat in scores:
                scores[cat] += 1
        return scores

    def _feature_vector(self, scores: dict[str, int]) -> np.ndarray:
        return np.array([[scores[c] for c in CATEGORIES]])

    def predict(
        self, answers_categories: list[str], model_name: str = "RandomForest"
    ) -> dict:
        """Capa 2: clasificación IA con explicabilidad."""
        scores = self.category_scores(answers_categories)
        features = self._feature_vector(scores)

        model = self.models.get(model_name, self.models["RandomForest"])
        proba = model.predict_proba(features)[0]
        pred_idx = int(np.argmax(proba))
        confidence = float(proba[pred_idx]) * 100.0

        perfil = PROFILES[pred_idx]
        dominant_category = CATEGORIES[pred_idx]

        # Consenso entre los tres modelos (robustez)
        votes = {}
        for name, m in self.models.items():
            p = PROFILES[int(m.predict(features)[0])]
            votes[name] = p

        explanation = self._build_explanation(scores, perfil, confidence)

        return {
            "perfil_detectado": perfil,
            "categoria_dominante": dominant_category,
            "confianza": round(confidence, 2),
            "modelo_usado": model_name,
            "puntuaciones": scores,
            "explicacion": explanation,
            "consenso_modelos": votes,
        }

    def _build_explanation(
        self, scores: dict[str, int], perfil: str, confidence: float
    ) -> str:
        ordered = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
        top = [c for c, v in ordered[:3] if v > 0]
        afinidades = ", ".join(top[:-1]) + (f" y {top[-1]}" if len(top) > 1 else "")
        rasgos = {
            "Explorador Cultural": "actividades culturales, históricas y patrimoniales",
            "Viajero Gastronómico": "experiencias culinarias y sabores locales",
            "Ecoturista": "naturaleza, conservación y ecosistemas",
            "Descubridor Comunitario": "tradiciones vivas y convivencia con la comunidad",
            "Buscador de Bienestar": "calma, equilibrio y experiencias de bienestar",
        }[perfil]
        return (
            f"Te identificamos como «{perfil}» con una confianza del {confidence:.0f}%. "
            f"Durante el cuestionario mostraste una fuerte afinidad hacia {afinidades}. "
            f"Por eso te recomendamos experiencias enfocadas en {rasgos} "
            f"dentro de los Pueblos Mágicos de Isla Mujeres."
        )


def get_engine() -> RecommenderEngine:
    return RecommenderEngine.instance()
