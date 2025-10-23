from pydantic import BaseModel, validator, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

from app.schemas.category import Category


class ProductImageBase(BaseModel):
    image_url: str
    alt_text: Optional[str] = None
    is_primary: bool = False
    order: int = 0


class ProductImageCreate(ProductImageBase):
    pass


class ProductImageUpdate(ProductImageBase):
    image_url: Optional[str] = None


class ProductImage(ProductImageBase):
    id: int
    product_id: int
    
    class Config:
        orm_mode = True


class ProductVariantBase(BaseModel):
    sku: str
    variant_name: Optional[str] = None
    price: float
    stock_qty: int = 0
    attributes: Optional[Dict[str, Any]] = None
    is_active: bool = True


class ProductVariantCreate(ProductVariantBase):
    pass


class ProductVariantUpdate(ProductVariantBase):
    sku: Optional[str] = None
    price: Optional[float] = None


class ProductVariant(ProductVariantBase):
    id: int
    product_id: int
    
    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    category_id: Optional[int] = None
    brand: Optional[str] = None
    base_price: float
    discount_percent: float = 0.0
    is_active: bool = True
    is_featured: bool = False
    product_metadata: Optional[Dict[str, Any]] = None


class ProductCreate(ProductBase):
    variants: Optional[List[ProductVariantCreate]] = None
    images: Optional[List[ProductImageCreate]] = None
    
    @validator('slug')
    def validate_slug(cls, v):
        if v and ' ' in v:
            raise ValueError('slug cannot contain spaces')
        return v


class ProductUpdate(ProductBase):
    name: Optional[str] = None
    slug: Optional[str] = None
    base_price: Optional[float] = None
    
    @validator('slug')
    def validate_slug(cls, v):
        if v and ' ' in v:
            raise ValueError('slug cannot contain spaces')
        return v


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    variants: List[ProductVariant] = []
    images: List[ProductImage] = []
    
    class Config:
        orm_mode = True


class ProductWithCategory(Product):
    category: Optional["Category"] = None


# Extended product response with calculated fields
class ProductResponse(Product):
    final_price: float
    
    @validator('final_price', pre=True)
    def calculate_final_price(cls, v, values):
        base_price = values.get('base_price', 0)
        discount = values.get('discount_percent', 0)
        return round(base_price * (1 - discount / 100), 2)