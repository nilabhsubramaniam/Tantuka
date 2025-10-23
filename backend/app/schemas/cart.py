from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class CartItemBase(BaseModel):
    variant_id: int
    quantity: int = Field(..., gt=0)


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)


class CartItem(CartItemBase):
    id: int
    cart_id: int
    
    # Additional fields from variant
    variant_name: Optional[str] = None
    price: Optional[float] = None
    product_name: Optional[str] = None
    product_slug: Optional[str] = None
    image_url: Optional[str] = None
    
    class Config:
        orm_mode = True


class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class CartUpdate(BaseModel):
    pass  # No fields to update directly on cart


class CartResponse(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    items: List[CartItem] = []
    total_items: int
    subtotal: float
    
    class Config:
        orm_mode = True