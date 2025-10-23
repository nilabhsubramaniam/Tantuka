from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from slugify import slugify

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


class CategoryService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
    
    def get_all_categories(self, skip: int = 0, limit: int = 100) -> List[Category]:
        """Get all categories with optional pagination"""
        return self.db.query(Category).offset(skip).limit(limit).all()
    
    def get_categories_tree(self) -> List[Category]:
        """Get all root categories with their subcategories"""
        return self.db.query(Category).filter(Category.parent_id.is_(None)).all()
    
    def get_category_by_id(self, category_id: int) -> Optional[Category]:
        """Get a category by its ID"""
        category = self.db.query(Category).filter(Category.id == category_id).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        return category
    
    def get_category_by_slug(self, slug: str) -> Optional[Category]:
        """Get a category by its slug"""
        category = self.db.query(Category).filter(Category.slug == slug).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        return category
    
    def create_category(self, category_data: CategoryCreate) -> Category:
        """Create a new category"""
        # Check for duplicate slug
        existing = self.db.query(Category).filter(Category.slug == category_data.slug).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A category with this slug already exists"
            )
        
        # Create new category
        db_category = Category(**category_data.dict())
        
        self.db.add(db_category)
        self.db.commit()
        self.db.refresh(db_category)
        
        return db_category
    
    def update_category(self, category_id: int, category_data: CategoryUpdate) -> Category:
        """Update an existing category"""
        db_category = self.get_category_by_id(category_id)
        
        # Check for duplicate slug if slug is being changed
        if category_data.slug and category_data.slug != db_category.slug:
            existing = self.db.query(Category).filter(Category.slug == category_data.slug).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A category with this slug already exists"
                )
        
        # Update fields
        update_data = category_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_category, key, value)
        
        self.db.add(db_category)
        self.db.commit()
        self.db.refresh(db_category)
        
        return db_category
    
    def delete_category(self, category_id: int) -> bool:
        """Delete a category by ID"""
        db_category = self.get_category_by_id(category_id)
        
        # Check if has subcategories
        subcategories = self.db.query(Category).filter(Category.parent_id == category_id).count()
        if subcategories > 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete a category with subcategories"
            )
        
        self.db.delete(db_category)
        self.db.commit()
        
        return True
    
    def generate_unique_slug(self, name: str) -> str:
        """Generate a unique slug based on the category name"""
        base_slug = slugify(name)
        slug = base_slug
        counter = 1
        
        while self.db.query(Category).filter(Category.slug == slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
            
        return slug