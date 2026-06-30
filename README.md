# ÍXA · Algoritmo de Recomendación de Experiencias Turísticas

PWA basada en Inteligencia Artificial que identifica el **perfil turístico** del visitante y recomienda **experiencias personalizadas** (cultural, gastronómico, ecológico, comunitario, bienestar y fotográfico) en los **Pueblos Mágicos de Isla Mujeres**. No está enfocada en playas ni turismo masivo: promueve el **turismo alternativo, sostenible y auténtico**.

---

## Arquitectura

```
IXA-Proyecto-PWA/
├── database/
│   └── ixa_db.sql            # Script completo MySQL (esquema + datos semilla)
├── backend/                  # API FastAPI + Machine Learning (Clean Architecture)
│   └── app/
│       ├── core/             # config, database
│       ├── models/           # SQLAlchemy (ORM)
│       ├── schemas/          # Pydantic
│       ├── repositories/     # Repository Pattern
│       ├── services/         # Service Layer (quiz, itinerario, admin)
│       ├── ml/               # Motor IA: KNN, Decision Tree, Random Forest
│       └── api/routes/       # Endpoints REST
└── frontend/                 # React 19 + Vite (Feature-Based Architecture)
    └── src/
        ├── components/       # UI, layout, efectos (Three.js)
        ├── features/         # splash, chatbot, quiz, results, admin
        ├── pages/            # rutas
        ├── store/            # Zustand (tema, visitante)
        ├── lib/              # cliente Axios
        └── config/           # temas (ÍXA / 4T)
```

**Principios:** Clean Architecture · SOLID · DRY · KISS · Repository Pattern · Service Layer · Feature-Based Architecture.

---

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, Vite, TailwindCSS, React Router, Axios, React Query, Zustand, React Hook Form, Zod, SweetAlert2, Lucide, Chart.js, Recharts |
| Animación | Three.js, PixiJS, GSAP + ScrollTrigger, Framer Motion, Lottie, Matter.js |
| Backend | Python, FastAPI, SQLAlchemy, Alembic, Pydantic, Uvicorn |
| IA / ML | Pandas, NumPy, Scikit-Learn (KNN, Decision Tree, Random Forest) |
| Base de datos | MySQL 8+ |

---

## Puesta en marcha

### 1) Base de datos (MySQL 8+)
```bash
mysql -u root -p --default-character-set=utf8mb4 < database/ixa_db.sql
```
Crea la base `ixa_db` con tablas y datos semilla (5 perfiles, 6 categorías, 10 preguntas con opciones y 17 experiencias).

> **Importante (Windows/PowerShell):** importa siempre con `--default-character-set=utf8mb4` y usando redirección de archivo (`<`) desde **cmd**, no con `Get-Content | mysql`. El pipe de PowerShell re-codifica los bytes y corrompe los acentos (`ó`, `á`...), lo que rompe el motor de recomendación.
> ```bat
> cmd /c "mysql -u root -h 127.0.0.1 -P 3306 --default-character-set=utf8mb4 < database\ixa_db.sql"
> ```

### 2) Backend (FastAPI)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env         # configura DB_USER / DB_PASSWORD
uvicorn app.main:app --reload --port 8000
```
- Docs interactivas: http://localhost:8000/docs

### 3) Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
- App: http://localhost:5173 (proxy de `/api` hacia `:8000`)

---

## Flujo de la aplicación

1. **Splash cinematográfico** — partículas Three.js, letras que caen (GSAP) con la frase *"Cada viajero tiene una historia..."*, revelado del logo ÍXA con glow flotante y selección de Pueblo Mágico (Isla Mujeres / Otros).
2. **Chatbot** (video `chatbot.mp4`) — sin login/registro. Pregunta nombre, edad, correo y celular.
3. **Detección de administrador** — si el nombre es `AdminIXA@UTCancun.com`, redirige al **Panel Administrativo**.
4. **Quiz inteligente** — 10 preguntas estilo Kahoot/Duolingo/Typeform con barra de progreso y animaciones.
5. **Motor de recomendación (2 capas):**
   - *Capa 1:* puntuación por categoría.
   - *Capa 2:* clasificación IA (Random Forest + KNN + Decision Tree) → perfil + confianza.
6. **Resultados explicables** — justificación IA, tarjetas 3D, ubicaciones en Google Maps, folleto descargable en **PDF**.
7. **Generador de itinerarios** — medio día, 1 día, 2 días, fin de semana.

### Panel Administrativo
- Dashboard con totales y gráficas (Recharts / Chart.js).
- CRUD de Categorías, Experiencias y Preguntas.
- Estadísticas IA (perfil detectado, confianza, historial).
- **Botón de tema global 4T**: cambia toda la plataforma a los colores gubernamentales de la 4T de forma global y permanente (persistido en backend); de lo contrario mantiene los colores ÍXA.

---

## PWA
Instalable en Android e iOS, con `manifest`, Service Worker, modo offline y *smart cache* (vía `vite-plugin-pwa`).

---

## Acceso administrador
`AdminIXA@UTCancun.com`

mar turquesa -> mar caribe 