from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Text
from sqlalchemy.orm import relationship

from app.db.db import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    code = Column(String(50), unique=True, nullable=False, index=True)
    status = Column(String(30), nullable=False, default="pending")

    receiver_name = Column(String(255), nullable=False)
    receiver_phone = Column(String(50), nullable=False)
    shipping_address = Column(String(500), nullable=False)
    note = Column(Text, nullable=True)
    payment_method = Column(String(50), nullable=False, default="cod")

    total_amount = Column(Numeric(12, 2), nullable=False, default=0)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    variant_id = Column(Integer, ForeignKey("product_variants.id"), nullable=True)

    product_name = Column(String(255), nullable=False)
    color = Column(String(50), nullable=True)
    size = Column(String(20), nullable=True)

    unit_price = Column(Numeric(12, 2), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    line_total = Column(Numeric(12, 2), nullable=False, default=0)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
    variant = relationship("ProductVariant")