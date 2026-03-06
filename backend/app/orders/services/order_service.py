import uuid
from decimal import Decimal
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.orders.models.order import Order, OrderItem
from app.orders.repositories import order_repo


def generate_order_code():
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


def create_order(db: Session, user, body):

    cart = order_repo.get_user_cart(db, user.id)

    if not cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart not found"
        )

    cart_items = order_repo.get_cart_items(db, cart.id)

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )

    total_amount = Decimal("0")

    order = Order(
        user_id=user.id,
        code=generate_order_code(),
        status="pending",
        receiver_name=body.receiver_name,
        receiver_phone=body.receiver_phone,
        shipping_address=body.shipping_address,
        note=body.note,
        payment_method=body.payment_method,
        total_amount=Decimal("0"),
    )

    order_repo.create_order(db, order)

    for cart_item in cart_items:

        product = order_repo.get_product(db, cart_item.product_id)

        if not product:
            raise HTTPException(
                status_code=400,
                detail="Product not found"
            )

        variant = None
        if cart_item.variant_id:
            variant = order_repo.get_variant(db, cart_item.variant_id)

            if variant.stock < cart_item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail="Not enough stock"
                )

        price = product.sale_price if product.sale_price else product.price

        line_total = Decimal(price) * cart_item.quantity
        total_amount += line_total

        db.add(OrderItem(
            order_id=order.id,
            product_id=product.id,
            variant_id=variant.id if variant else None,
            product_name=product.name,
            color=variant.color if variant else None,
            size=variant.size if variant else None,
            unit_price=price,
            quantity=cart_item.quantity,
            line_total=line_total
        ))

        if variant:
            variant.stock -= cart_item.quantity

    order.total_amount = total_amount

    order_repo.clear_cart(db, cart.id)

    db.commit()
    db.refresh(order)

    return order