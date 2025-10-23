from fastapi import APIRouter, Depends, HTTPException, status, Query, Path, Form, UploadFile, File
from typing import List, Optional, Union
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.product_service import ProductService
from app.schemas.product import (
    Product, ProductCreate, ProductUpdate, ProductResponse,
    ProductVariant, ProductVariantCreate, ProductVariantUpdate,
    ProductImage, ProductImageCreate, ProductImageUpdate
)
from app.models.user import User
from app.core.dependencies import get_current_user, get_admin_user

router = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[ProductResponse])
async def read_products(
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = None,
    sort_order: str = "asc",
    is_active: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    product_service: ProductService = Depends()
):
    """
    Get all products with filtering and sorting options
    """
    products = product_service.get_products(
        skip=skip,
        limit=limit,
        category_id=category_id,
        search=search,
        sort_by=sort_by,
        sort_order=sort_order,
        is_active=is_active,
        is_featured=is_featured,
        min_price=min_price,
        max_price=max_price
    )
    
    # Add calculated final_price field to the response
    product_responses = []
    for product in products:
        # Calculate final_price
        final_price = round(product.base_price * (1 - product.discount_percent / 100), 2)
        
        # Create a dict from the product and add the calculated field
        product_dict = {**product.__dict__}
        product_dict["final_price"] = final_price
        product_responses.append(product_dict)
    
    return product_responses


@router.get("/{product_id}", response_model=ProductResponse)
async def read_product(
    product_id: int,
    product_service: ProductService = Depends()
):
    """
    Get a specific product by ID
    """
    product = product_service.get_product_by_id(product_id)
    
    # Calculate final_price for response
    final_price = round(product.base_price * (1 - product.discount_percent / 100), 2)
    
    # Create a dict from the product and add the calculated field
    product_dict = {**product.__dict__}
    product_dict["final_price"] = final_price
    
    return product_dict


@router.get("/slug/{slug}", response_model=ProductResponse)
async def read_product_by_slug(
    slug: str,
    product_service: ProductService = Depends()
):
    """
    Get a specific product by slug
    """
    product = product_service.get_product_by_slug(slug)
    
    # Calculate final_price for response
    final_price = round(product.base_price * (1 - product.discount_percent / 100), 2)
    
    # Create a dict from the product and add the calculated field
    product_dict = {**product.__dict__}
    product_dict["final_price"] = final_price
    
    return product_dict


@router.post("/", response_model=Product, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_admin_user),
    product_service: ProductService = Depends()
):
    """
    Create a new product (admin only)
    """
    return product_service.create_product(product_data)


@router.put("/{product_id}", response_model=Product)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    current_user: User = Depends(get_admin_user),
    product_service: ProductService = Depends()
):
    """
    Update a product (admin only)
    """
    return product_service.update_product(product_id, product_data)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    current_user: User = Depends(get_admin_user),
    product_service: ProductService = Depends()
):
    """
    Delete a product (admin only)
    """
    product_service.delete_product(product_id)
    return None


@router.post("/{product_id}/variants", response_model=ProductVariant)
async def add_product_variant(
    product_id: int,
    variant_data: ProductVariantCreate,
    current_user: User = Depends(get_admin_user),
    product_service: ProductService = Depends()
):
    """
    Add a variant to a product (admin only)
    """
    return product_service.add_product_variant(product_id, variant_data)


@router.post("/{product_id}/images", response_model=ProductImage)
async def add_product_image(
    product_id: int,
    image_data: ProductImageCreate,
    current_user: User = Depends(get_admin_user),
    product_service: ProductService = Depends()
):
    """
    Add an image to a product (admin only)
    """
    return product_service.add_product_image(product_id, image_data)


@router.post("/generate-slug")
async def generate_slug(
    name: str,
    product_service: ProductService = Depends()
):
    """
    Generate a unique product slug from a name
    """
    return {"slug": product_service.generate_unique_slug(name)}