# app/schemas/product.py
from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class ProductVariantCreate(BaseModel):
    color: Optional[str] = None
    size: Optional[str] = None
    stock: int = 0

class ProductVariantOut(ProductVariantCreate):
    id: int

    class Config:
        from_attributes = True

class ProductCreate(BaseModel):
    name: str
    slug: str
    sku: Optional[str] = None
    description: Optional[str] = None
    price: Decimal
    sale_price: Optional[Decimal] = None
    thumbnail_url: Optional[str] = None
    category_id: int
    is_active: bool = True
    variants: List[ProductVariantCreate] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    sku: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    thumbnail_url: Optional[str] = None
    category_id: Optional[int] = None
    is_active: Optional[bool] = None

class ProductOut(BaseModel):
    id: int
    name: str
    slug: str
    sku: Optional[str] = None
    description: Optional[str] = None
    price: Decimal
    sale_price: Optional[Decimal] = None
    thumbnail_url: Optional[str] = None
    category_id: int
    is_active: bool
    variants: List[ProductVariantOut] = []

    class Config:
        from_attributes = True