from fastapi import FastAPI
from app.db.db import Base, engine
from app.auth.router.router import router as auth_router
from app.seed.seed_data import seed_users
from app.db.db import SessionLocal

# import models để Base "thấy" bảng
from app.users.models.models import User  # noqa: F401

app = FastAPI(title="MyApp API")

Base.metadata.create_all(bind=engine)

# Run seeder
db = SessionLocal()
seed_users(db)
db.close()

app.include_router(auth_router)

@app.get("/health")
def health():
    return {"ok": True}