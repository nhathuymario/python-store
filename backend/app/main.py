from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.db import Base, engine, get_db
from app.models.models import Post
from app.schemas.schemas import PostCreate, PostOut

app = FastAPI(title="MyApp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# tạo bảng nhanh (tạm thời). Sau sẽ chuyển qua Alembic
Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/posts", response_model=PostOut)
def create_post(payload: PostCreate, db: Session = Depends(get_db)):
    post = Post(title=payload.title, content=payload.content)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@app.get("/posts", response_model=list[PostOut])
def list_posts(db: Session = Depends(get_db)):
    posts = db.scalars(select(Post).order_by(Post.id.desc())).all()
    return posts

@app.get("/posts/{post_id}", response_model=PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post not found")
    return post

@app.put("/posts/{post_id}", response_model=PostOut)
def update_post(post_id: int, payload: PostCreate, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post not found")
    post.title = payload.title
    post.content = payload.content
    db.commit()
    db.refresh(post)
    return post

@app.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(404, "Post not found")
    db.delete(post)
    db.commit()
    return {"deleted": True}