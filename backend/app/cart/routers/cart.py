from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.cart.models.cart import Cart, CartItem
from app.products.models.product import Product
from app.products.models.product_variant import ProductVariant
from app.core.dependencies import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/cart", tags=["Cart"])

class AddCartItemBody(BaseModel):
    product_id: int
    variant_id: int | None = None
    quantity: int = 1

@router.get("")
def get_cart(db: Session = Depends(get_db), user=Depends(get_current_user)):
    cart = db.query(Cart).filter(Cart.user_id == user.id).first()
    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

@router.post("/items")
def add_to_cart(body: AddCartItemBody, db: Session = Depends(get_db), user=Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == body.product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart = db.query(Cart).filter(Cart.user_id == user.id).first()
    if not cart:
        cart = Cart(user_id=user.id)
        db.add(cart)
        db.flush()

    item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == body.product_id,
        CartItem.variant_id == body.variant_id,
    ).first()

    if item:
        item.quantity += body.quantity
    else:
        item = CartItem(
            cart_id=cart.id,
            product_id=body.product_id,
            variant_id=body.variant_id,
            quantity=body.quantity,
        )
        db.add(item)

    db.commit()
    return {"message": "Added to cart"}