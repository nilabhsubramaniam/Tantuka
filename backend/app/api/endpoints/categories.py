from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.category_service import CategoryService
from app.schemas.category import Category, CategoryCreate, CategoryUpdate, CategoryWithSubcategories
from app.models.user import User
from app.core.dependencies import get_admin_user

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[Category])
async def read_categories(
    skip: int = 0, 
    limit: int = 100,
    category_service: CategoryService = Depends()
):
    """
    Get all categories
    """
    categories = category_service.get_all_categories(skip=skip, limit=limit)
    return categories


@router.get("/tree", response_model=List[CategoryWithSubcategories])
async def read_categories_tree(
    category_service: CategoryService = Depends()
):
    """
    Get categories as a tree structure with subcategories
    """
    categories = category_service.get_categories_tree()
    return categories


@router.get("/{category_id}", response_model=Category)
async def read_category(
    category_id: int,
    category_service: CategoryService = Depends()
):
    """
    Get a specific category by ID
    """
    return category_service.get_category_by_id(category_id)


@router.get("/slug/{slug}", response_model=Category)
async def read_category_by_slug(
    slug: str,
    category_service: CategoryService = Depends()
):
    """
    Get a specific category by slug
    """
    return category_service.get_category_by_slug(slug)


@router.post("/", response_model=Category, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_data: CategoryCreate,
    current_user: User = Depends(get_admin_user),
    category_service: CategoryService = Depends()
):
    """
    Create a new category (admin only)
    """
    return category_service.create_category(category_data)


@router.put("/{category_id}", response_model=Category)
async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    current_user: User = Depends(get_admin_user),
    category_service: CategoryService = Depends()
):
    """
    Update a category (admin only)
    """
    return category_service.update_category(category_id, category_data)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: int,
    current_user: User = Depends(get_admin_user),
    category_service: CategoryService = Depends()
):
    """
    Delete a category (admin only)
    """
    category_service.delete_category(category_id)
    return None


@router.post("/generate-slug")
async def generate_slug(
    name: str,
    category_service: CategoryService = Depends()
):
    """
    Generate a unique category slug from a name
    """
    return {"slug": category_service.generate_unique_slug(name)}