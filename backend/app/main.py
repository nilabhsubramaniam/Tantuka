from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import os
from pathlib import Path

# Create static directory if it doesn't exist
static_dir = Path("/home/nilabh/Projects/Tantuka/backend/app/static")
static_dir.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="Tantuka E-Commerce Admin Panel",
    description="""
    ## 🛍️ Tantuka E-Commerce Platform Administration
    
    This admin panel allows you to manage your e-commerce platform:
    
    - **Users**: Manage customer accounts
    - **Products**: Add, edit, and organize your product catalog
    - **Categories**: Organize your products into categories
    - **Orders**: Process and track customer orders
    - **System Health**: Monitor the platform's performance
    
    Use the JWT token from login to authenticate all API calls.
    """,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1, "persistAuthorization": True},
)

# CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",  # Next.js frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Import and include API router
from app.api import api_router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Tantuka E-Commerce API"}


@app.get("/admin", include_in_schema=False)
def admin_redirect():
    """Redirect to admin UI"""
    return RedirectResponse(url="/docs")  # Redirect to Swagger UI, which is more functional as an admin panel


@app.get("/health")
def health_check():
    return {"status": "ok"}