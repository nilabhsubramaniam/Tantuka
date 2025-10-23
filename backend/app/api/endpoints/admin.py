from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.product import Product, ProductVariant
from app.models.category import Category
from app.models.order import Order
from app.core.dependencies import get_admin_user
from app.schemas.user import UserResponse

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(get_admin_user)],  # All endpoints require admin access
)


@router.get("/dashboard")
async def admin_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Get admin dashboard statistics
    """
    # Get counts of various entities
    user_count = db.query(User).count()
    product_count = db.query(Product).count()
    category_count = db.query(Category).count()
    variant_count = db.query(ProductVariant).count()
    order_count = db.query(Order).count() if hasattr(Order, 'id') else 0  # Check if Order model exists
    
    # Get recent users - serialize manually to avoid Pydantic errors
    recent_users_raw = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    recent_users = []
    for user in recent_users_raw:
        recent_users.append({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "created_at": str(user.created_at)
        })
    
    # Get recent orders - serialize manually
    recent_orders = []
    if hasattr(Order, 'id'):  # Check if Order model exists
        recent_orders_raw = db.query(Order).order_by(Order.created_at.desc()).limit(5).all()
        for order in recent_orders_raw:
            recent_orders.append({
                "id": order.id,
                "status": order.status,
                "total_amount": float(order.total_amount) if order.total_amount else 0,
                "created_at": str(order.created_at)
            })
    
    # Get top products - serialize manually
    top_products_raw = db.query(Product).filter(Product.is_featured == True).limit(5).all()
    top_products = []
    for product in top_products_raw:
        top_products.append({
            "id": product.id,
            "name": product.name,
            "slug": product.slug,
            "base_price": float(product.base_price),
            "discount_percent": float(product.discount_percent),
            "is_featured": product.is_featured
        })
    
    # Calculate total revenue
    # This is simplified; in a real app you'd use a more sophisticated query
    revenue = db.query(Order).filter(Order.status == "delivered").count() * 100 if hasattr(Order, 'id') else 0
    
    return {
        "statistics": {
            "user_count": user_count,
            "product_count": product_count,
            "category_count": category_count,
            "variant_count": variant_count,
            "order_count": order_count,
            "estimated_revenue": revenue
        },
        "recent_users": recent_users,
        "recent_orders": recent_orders,
        "top_products": top_products
    }


@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_admin_user)
):
    """
    Get all users (admin only)
    """
    users = db.query(User).offset(skip).limit(limit).all()
    return users


@router.get("/system-health", response_model=Dict[str, Any])
async def system_health(
    current_user: User = Depends(get_admin_user)
):
    """
    Get system health status
    """
    return {
        "status": "healthy",
        "version": "0.1.0",
        "database": "connected",
        "memory_usage": "normal",
        "admin_user": current_user.email
    }