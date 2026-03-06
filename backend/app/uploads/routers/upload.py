import os
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from app.core.dependencies import require_admin
from app.users.models.models import User


router = APIRouter(tags=["Upload"])

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
    admin: User = Depends(require_admin),
):
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid filename",
        )

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File type not allowed",
        )

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    new_filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return {
        "filename": new_filename,
        "url": f"/uploads/{new_filename}",
    }