from fastapi import APIRouter

from app.api.endpoints import users, auth, products, categories, cart, admin, admin_ui, admin_dashboard
# Import other endpoint routers as they are created

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(auth.router)
api_router.include_router(products.router)
api_router.include_router(categories.router)
api_router.include_router(cart.router)
api_router.include_router(admin.router)
api_router.include_router(admin_ui.router)
api_router.include_router(admin_dashboard.router)
# Include other routers as they are created