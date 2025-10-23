from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime


class CategoryBase(BaseModel):
    name: str
    slug: str
    parent_id: Optional[int] = None
    description: Optional[str] = None


class CategoryCreate(CategoryBase):
    @validator('slug')
    def validate_slug(cls, v):
        if v and ' ' in v:
            raise ValueError('slug cannot contain spaces')
        return v


class CategoryUpdate(CategoryBase):
    name: Optional[str] = None
    slug: Optional[str] = None
    
    @validator('slug')
    def validate_slug(cls, v):
        if v and ' ' in v:
            raise ValueError('slug cannot contain spaces')
        return v


class Category(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True


class CategoryWithSubcategories(Category):
    subcategories: List['CategoryWithSubcategories'] = []
    
    class Config:
        orm_mode = True


CategoryWithSubcategories.update_forward_refs()