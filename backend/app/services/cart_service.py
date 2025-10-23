from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session, joinedload
from fastapi import Depends, HTTPException, status

from app.database import get_db
from app.models.cart import Cart, CartItem
from app.models.product import ProductVariant, Product, ProductImage
from app.schemas.cart import CartItemCreate, CartItemUpdate


class CartService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
    
    def get_user_cart(self, user_id: int) -> Cart:
        """Get or create a cart for a user"""
        # Try to find existing active cart
        cart = self.db.query(Cart).filter(Cart.user_id == user_id).first()
        
        # If no cart exists, create one
        if not cart:
            cart = Cart(user_id=user_id)
            self.db.add(cart)
            self.db.commit()
            self.db.refresh(cart)
        
        return cart
    
    def add_to_cart(self, user_id: int, item_data: CartItemCreate) -> CartItem:
        """Add an item to the user's cart"""
        # Get or create cart
        cart = self.get_user_cart(user_id)
        
        # Check if the variant exists
        variant = self.db.query(ProductVariant).filter(
            ProductVariant.id == item_data.variant_id,
            ProductVariant.is_active == True
        ).first()
        
        if not variant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product variant not found or is not active"
            )
        
        # Check if the item is already in the cart
        existing_item = self.db.query(CartItem).filter(
            CartItem.cart_id == cart.id,
            CartItem.variant_id == item_data.variant_id
        ).first()
        
        if existing_item:
            # Update quantity if item exists
            existing_item.quantity += item_data.quantity
            self.db.add(existing_item)
            self.db.commit()
            self.db.refresh(existing_item)
            return existing_item
        
        # Create new cart item
        cart_item = CartItem(
            cart_id=cart.id,
            variant_id=item_data.variant_id,
            quantity=item_data.quantity
        )
        
        self.db.add(cart_item)
        self.db.commit()
        self.db.refresh(cart_item)
        
        return cart_item
    
    def update_cart_item(self, user_id: int, item_id: int, item_data: CartItemUpdate) -> CartItem:
        """Update the quantity of a cart item"""
        # Get user's cart
        cart = self.get_user_cart(user_id)
        
        # Find the cart item
        cart_item = self.db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()
        
        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart item not found"
            )
        
        # Update quantity
        cart_item.quantity = item_data.quantity
        
        self.db.add(cart_item)
        self.db.commit()
        self.db.refresh(cart_item)
        
        return cart_item
    
    def remove_from_cart(self, user_id: int, item_id: int) -> bool:
        """Remove an item from the cart"""
        # Get user's cart
        cart = self.get_user_cart(user_id)
        
        # Find the cart item
        cart_item = self.db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.cart_id == cart.id
        ).first()
        
        if not cart_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cart item not found"
            )
        
        # Delete the cart item
        self.db.delete(cart_item)
        self.db.commit()
        
        return True
    
    def clear_cart(self, user_id: int) -> bool:
        """Remove all items from a user's cart"""
        # Get user's cart
        cart = self.get_user_cart(user_id)
        
        # Delete all cart items
        self.db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
        self.db.commit()
        
        return True
    
    def get_cart_with_details(self, user_id: int) -> Dict[str, Any]:
        """Get cart with product details and calculated totals"""
        # Get user's cart
        cart = self.get_user_cart(user_id)
        
        # Get cart items with product details
        cart_items_query = (
            self.db.query(
                CartItem,
                ProductVariant.price,
                ProductVariant.variant_name,
                Product.name.label("product_name"),
                Product.slug.label("product_slug"),
                ProductImage.image_url
            )
            .join(ProductVariant, CartItem.variant_id == ProductVariant.id)
            .join(Product, ProductVariant.product_id == Product.id)
            .outerjoin(
                ProductImage,
                (ProductImage.product_id == Product.id) & 
                (ProductImage.is_primary == True)
            )
            .filter(CartItem.cart_id == cart.id)
            .all()
        )
        
        # Calculate total items and subtotal
        total_items = 0
        subtotal = 0.0
        
        cart_items = []
        for item, price, variant_name, product_name, product_slug, image_url in cart_items_query:
            total_items += item.quantity
            item_subtotal = price * item.quantity
            subtotal += item_subtotal
            
            # Create a dict with all the item details
            cart_item_dict = {
                "id": item.id,
                "cart_id": item.cart_id,
                "variant_id": item.variant_id,
                "quantity": item.quantity,
                "price": price,
                "variant_name": variant_name,
                "product_name": product_name,
                "product_slug": product_slug,
                "image_url": image_url
            }
            
            cart_items.append(cart_item_dict)
        
        # Create cart response
        cart_response = {
            "id": cart.id,
            "user_id": cart.user_id,
            "created_at": cart.created_at,
            "updated_at": cart.updated_at,
            "items": cart_items,
            "total_items": total_items,
            "subtotal": round(subtotal, 2)
        }
        
        return cart_response