from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.categories.models.category import Category
from app.categories.schemas.category import CategoryCreate, CategoryUpdate, CategoryOut
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active == True).all()


@router.get("/{slug}", response_model=CategoryOut)
def get_category(slug: str, db: Session = Depends(get_db)):
    item = db.query(Category).filter(Category.slug == slug).first()
    if not item:
        raise HTTPException(status_code=404, detail="Category not found")
    return item


@router.post("/admin", response_model=CategoryOut)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    item = Category(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item