from sqlalchemy.orm import Session
from app.users.models.models import User
from app.core.security import hash_password


def seed_users(db: Session):
    # Check admin
    admin = db.query(User).filter(User.email == "admin@gmail.com").first()
    if not admin:
        admin_user = User(
            email="admin@gmail.com",
            hashed_password=hash_password("123456"),
            role="admin",
        )
        db.add(admin_user)
        print("✅ Admin user created")

    # Check viewer
    viewer = db.query(User).filter(User.email == "viewer@gmail.com").first()
    if not viewer:
        viewer_user = User(
            email="viewer@gmail.com",
            hashed_password=hash_password("123456"),
            role="viewer",
        )
        db.add(viewer_user)
        print("✅ Viewer user created")

    db.commit()