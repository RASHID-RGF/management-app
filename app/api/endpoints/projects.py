from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models import models
from app.schemas import schemas
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[schemas.Project])
def read_projects(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    projects = db.query(models.Project).filter(models.Project.owner_id == current_user["uid"]).all()
    return projects

@router.post("/", response_model=schemas.Project)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Ensure user exists in our DB
    user = db.query(models.User).filter(models.User.id == current_user["uid"]).first()
    if not user:
        user = models.User(
            id=current_user["uid"],
            email=current_user["email"],
            display_name=current_user["name"],
            photo_url=current_user["picture"]
        )
        db.add(user)
        db.commit()
    
    db_project = models.Project(
        **project.model_dump(),
        owner_id=current_user["uid"]
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/{project_id}", response_model=schemas.Project)
def read_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(project)
    db.commit()
    return {"message": "Project deleted"}
