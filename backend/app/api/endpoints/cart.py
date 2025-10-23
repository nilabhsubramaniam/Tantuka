from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import Dict, Any

from app.services.cart_service import CartService
from app.schemas.cart import CartItemCreate, CartItemUpdate, CartResponse
from app.models.user import User
from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/cart",
    tags=["cart"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=CartResponse)
async def get_cart(
    current_user: User = Depends(get_current_user),
    cart_service: CartService = Depends()
):
    """
    Get the current user's shopping cart
    """
    return cart_service.get_cart_with_details(current_user.id)


@router.post("/items", status_code=status.HTTP_201_CREATED)
async def add_to_cart(
    item_data: CartItemCreate,
    current_user: User = Depends(get_current_user),
    cart_service: CartService = Depends()
):
    """
    Add an item to the shopping cart
    """
    cart_item = cart_service.add_to_cart(current_user.id, item_data)
    return {"message": "Item added to cart", "item_id": cart_item.id}


@router.put("/items/{item_id}")
async def update_cart_item(
    item_id: int,
    item_data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    cart_service: CartService = Depends()
):
    """
    Update the quantity of a cart item
    """
    cart_service.update_cart_item(current_user.id, item_id, item_data)
    return {"message": "Cart item updated"}


@router.delete("/items/{item_id}")
async def remove_from_cart(
    item_id: int,
    current_user: User = Depends(get_current_user),
    cart_service: CartService = Depends()
):
    """
    Remove an item from the shopping cart
    """
    cart_service.remove_from_cart(current_user.id, item_id)
    return {"message": "Item removed from cart"}


@router.delete("/")
async def clear_cart(
    current_user: User = Depends(get_current_user),
    cart_service: CartService = Depends()
):
    """
    Clear all items from the shopping cart
    """
    cart_service.clear_cart(current_user.id)
    return {"message": "Cart cleared"}