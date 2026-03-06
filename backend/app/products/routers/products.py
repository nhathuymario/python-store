from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.db.db import get_db
from app.products.models.product import Product
from app.products.models.product_variant import ProductVariant
from app.products.schemas.product import ProductCreate, ProductOut, ProductUpdate
from app.core.dependencies import get_current_user

router = APIRouter(tags=["Products"])


@router.get("/products", response_model=list[ProductOut])
def get_products(
    db: Session = Depends(get_db),
    category_id: int | None = None,
    search: str | None = None,
    min_price: float | None = None,
    max_price: float | None = None,
    page: int = 1,
    page_size: int = 20,
):
    query = db.query(Product).filter(Product.is_active == True)

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    if search:
        query = query.filter(
            or_(
                Product.name.ilike(f"%{search}%"),
                Product.description.ilike(f"%{search}%")
            )
        )

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    return query.offset((page - 1) * page_size).limit(page_size).all()


@router.get("/products/{slug}", response_model=ProductOut)
def get_product_detail(slug: str, db: Session = Depends(get_db)):
    item = db.query(Product).filter(
        Product.slug == slug,
        Product.is_active == True
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Product not found")

    return item


@router.post("/admin/products", response_model=ProductOut)
def create_product(
    data: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    product = Product(
        name=data.name,
        slug=data.slug,
        sku=data.sku,
        description=data.description,
        price=data.price,
        sale_price=data.sale_price,
        thumbnail_url=data.thumbnail_url,
        category_id=data.category_id,
        is_active=data.is_active,
    )
    db.add(product)
    db.flush()

    for v in data.variants:
        db.add(
            ProductVariant(
                product_id=product.id,
                color=v.color,
                size=v.size,
                stock=v.stock,
            )
        )

    db.commit()
    db.refresh(product)
    return product