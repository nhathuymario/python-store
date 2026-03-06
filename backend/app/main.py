from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.db import Base, engine, SessionLocal
from app.auth.router.router import router as auth_router
from app.seed.seed_data import seed_users

# import models để Base "thấy" bảng
from app.users.models.models import User  # noqa: F401

# import models mới
from app.categories.models.category import Category  # noqa: F401
from app.products.models.product import Product  # noqa: F401
from app.products.models.product_variant import ProductVariant  # noqa: F401
from app.cart.models.cart import Cart, CartItem  # noqa: F401

# import routers
from app.categories.routers.categories import router as categories_router
from app.products.routers.products import router as products_router
from app.cart.routers.cart import router as cart_router


app = FastAPI(title="MyApp API")


# CORS (để React gọi API được)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# tạo bảng
Base.metadata.create_all(bind=engine)


# run seeder
db = SessionLocal()
seed_users(db)
db.close()


# routers
app.include_router(auth_router)

app.include_router(categories_router)
app.include_router(products_router)
app.include_router(cart_router)


@app.get("/health")
def health():
    return {"ok": True}