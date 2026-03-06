from datetime import datetime
from decimal import Decimal
from typing import Optional, List

from pydantic import BaseModel


class CreateOrderBody(BaseModel):
    receiver_name: str
    receiver_phone: str
    shipping_address: str
    note: Optional[str] = None
    payment_method: str = "cod"


class OrderItemOut(BaseModel):
    id: int
    product_id: int
    variant_id: Optional[int] = None
    product_name: str
    color: Optional[str] = None
    size: Optional[str] = None
    unit_price: Decimal
    quantity: int
    line_total: Decimal

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    code: str
    status: str
    receiver_name: str
    receiver_phone: str
    shipping_address: str
    note: Optional[str] = None
    payment_method: str
    total_amount: Decimal
    created_at: datetime
    items: List[OrderItemOut] = []

    class Config:
        from_attributes = True


class OrderListItemOut(BaseModel):
    id: int
    code: str
    status: str
    total_amount: Decimal
    created_at: datetime

    class Config:
        from_attributes = True


class UpdateOrderStatusBody(BaseModel):
    status: str