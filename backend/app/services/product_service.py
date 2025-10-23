from typing import List, Optional, Dict, Any, Union
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from fastapi import Depends, HTTPException, status
from slugify import slugify

from app.database import get_db
from app.models.product import Product, ProductVariant, ProductImage
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductUpdate, ProductVariantCreate, ProductImageCreate


class ProductService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
    
    def get_products(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        category_id: Optional[int] = None,
        search: Optional[str] = None,
        sort_by: Optional[str] = None,
        sort_order: str = "asc",
        is_active: Optional[bool] = None,
        is_featured: Optional[bool] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None
    ) -> List[Product]:
        """
        Get products with various filters and sorting options
        """
        query = self.db.query(Product)
        
        # Apply filters
        if category_id:
            query = query.filter(Product.category_id == category_id)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                Product.name.ilike(search_term) | 
                Product.description.ilike(search_term) |
                Product.brand.ilike(search_term)
            )
        
        if is_active is not None:
            query = query.filter(Product.is_active == is_active)
            
        if is_featured is not None:
            query = query.filter(Product.is_featured == is_featured)
            
        if min_price is not None:
            query = query.filter(Product.base_price >= min_price)
            
        if max_price is not None:
            query = query.filter(Product.base_price <= max_price)
        
        # Apply sorting
        if sort_by:
            column = getattr(Product, sort_by, None)
            if column is not None:
                if sort_order.lower() == "desc":
                    query = query.order_by(column.desc())
                else:
                    query = query.order_by(column.asc())
            else:
                # Default sort by created_at
                query = query.order_by(Product.created_at.desc())
        else:
            # Default sort by created_at
            query = query.order_by(Product.created_at.desc())
        
        # Apply pagination and load relationships
        return query.options(
            joinedload(Product.variants),
            joinedload(Product.images),
            joinedload(Product.category)
        ).offset(skip).limit(limit).all()
    
    def get_product_by_id(self, product_id: int) -> Product:
        """Get product by ID with variants and images"""
        product = self.db.query(Product).filter(
            Product.id == product_id
        ).options(
            joinedload(Product.variants),
            joinedload(Product.images),
            joinedload(Product.category)
        ).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return product
    
    def get_product_by_slug(self, slug: str) -> Product:
        """Get product by slug with variants and images"""
        product = self.db.query(Product).filter(
            Product.slug == slug
        ).options(
            joinedload(Product.variants),
            joinedload(Product.images),
            joinedload(Product.category)
        ).first()
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        
        return product
    
    def create_product(self, product_data: ProductCreate) -> Product:
        """Create a new product with variants and images"""
        # Check for duplicate slug
        existing = self.db.query(Product).filter(Product.slug == product_data.slug).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A product with this slug already exists"
            )
        
        # Check if category exists if category_id is provided
        if product_data.category_id:
            category = self.db.query(Category).filter(Category.id == product_data.category_id).first()
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Category not found"
                )
        
        # Extract variants and images data before creating product
        variants_data = product_data.variants or []
        images_data = product_data.images or []
        
        # Remove variants and images from the product data
        product_dict = product_data.dict(exclude={"variants", "images"})
        
        # Create product
        db_product = Product(**product_dict)
        self.db.add(db_product)
        self.db.flush()  # Flush to get the ID without committing
        
        # Create variants
        for variant_data in variants_data:
            db_variant = ProductVariant(**variant_data.dict(), product_id=db_product.id)
            self.db.add(db_variant)
        
        # Create images
        for image_data in images_data:
            db_image = ProductImage(**image_data.dict(), product_id=db_product.id)
            self.db.add(db_image)
        
        # Commit all changes
        self.db.commit()
        self.db.refresh(db_product)
        
        return db_product
    
    def update_product(self, product_id: int, product_data: ProductUpdate) -> Product:
        """Update an existing product"""
        # Get the product
        db_product = self.get_product_by_id(product_id)
        
        # Check for duplicate slug if slug is being changed
        if product_data.slug and product_data.slug != db_product.slug:
            existing = self.db.query(Product).filter(Product.slug == product_data.slug).first()
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="A product with this slug already exists"
                )
        
        # Check if category exists if category_id is being changed
        if product_data.category_id and product_data.category_id != db_product.category_id:
            category = self.db.query(Category).filter(Category.id == product_data.category_id).first()
            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Category not found"
                )
        
        # Update product fields
        update_data = product_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_product, key, value)
        
        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)
        
        return db_product
    
    def delete_product(self, product_id: int) -> bool:
        """Delete a product by ID"""
        db_product = self.get_product_by_id(product_id)
        
        self.db.delete(db_product)
        self.db.commit()
        
        return True
    
    def add_product_variant(self, product_id: int, variant_data: ProductVariantCreate) -> ProductVariant:
        """Add a variant to a product"""
        # Verify product exists
        product = self.get_product_by_id(product_id)
        
        # Check for duplicate SKU
        existing = self.db.query(ProductVariant).filter(ProductVariant.sku == variant_data.sku).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A variant with this SKU already exists"
            )
        
        # Create variant
        db_variant = ProductVariant(**variant_data.dict(), product_id=product_id)
        self.db.add(db_variant)
        self.db.commit()
        self.db.refresh(db_variant)
        
        return db_variant
    
    def add_product_image(self, product_id: int, image_data: ProductImageCreate) -> ProductImage:
        """Add an image to a product"""
        # Verify product exists
        product = self.get_product_by_id(product_id)
        
        # If this is set as primary, un-set other primary images
        if image_data.is_primary:
            self.db.query(ProductImage).filter(
                ProductImage.product_id == product_id,
                ProductImage.is_primary == True
            ).update({"is_primary": False})
        
        # Create image
        db_image = ProductImage(**image_data.dict(), product_id=product_id)
        self.db.add(db_image)
        self.db.commit()
        self.db.refresh(db_image)
        
        return db_image
    
    def generate_unique_slug(self, name: str) -> str:
        """Generate a unique slug based on the product name"""
        base_slug = slugify(name)
        slug = base_slug
        counter = 1
        
        while self.db.query(Product).filter(Product.slug == slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
            
        return slug