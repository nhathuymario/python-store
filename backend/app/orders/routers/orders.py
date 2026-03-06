from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.core.dependencies import get_current_user
from app.orders.schemas.order import CreateOrderBody, OrderOut
from app.orders.services import order_service

router = APIRouter(tags=["Orders"])


@router.post("/orders", response_model=OrderOut)
def create_order(
    body: CreateOrderBody,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return order_service.create_order(db, user, body)