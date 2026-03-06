import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.db.db import Base, engine, SessionLocal
from app.auth.router.router import router as auth_router
from app.seed.seed_data import seed_users

from app.users.models.models import User  # noqa: F401
from app.categories.models.category import Category  # noqa: F401
from app.products.models.product import Product  # noqa: F401
from app.products.models.product_variant import ProductVariant  # noqa: F401
from app.cart.models.cart import Cart, CartItem  # noqa: F401
from app.orders.models.order import Order, OrderItem  # noqa: F401

from app.categories.routers.categories import router as categories_router
from app.products.routers.products import router as products_router
from app.cart.routers.cart import router as cart_router
from app.orders.routers.orders import router as orders_router
from app.uploads.routers.upload import router as upload_router

app = FastAPI(title="MyApp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

db = SessionLocal()
seed_users(db)
db.close()

app.include_router(auth_router)
app.include_router(categories_router)
app.include_router(products_router)
app.include_router(cart_router)
app.include_router(orders_router)
app.include_router(upload_router)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/health")
def health():
    return {"ok": True}