from typing import Optional
from sqlalchemy.orm import Session
from app.users.models.models import User
from app.core.security import verify_password


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def authenticate(db: Session, email: str, password: str) -> Optional[User]:
    user = get_user_by_email(db, email)
    if user is None:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user