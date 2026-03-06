from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models import models
from app.schemas import schemas
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/{project_id}", response_model=List[schemas.Task])
def read_tasks(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Verify project ownership
    project = db.query(models.Project).filter(
        models.Project.id == project_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project.tasks

@router.post("/", response_model=schemas.Task)
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Verify project ownership
    project = db.query(models.Project).filter(
        models.Project.id == task.project_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/{task_id}", response_model=schemas.Task)
def update_task(
    task_id: int,
    task_update: schemas.TaskBase,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_task = db.query(models.Task).join(models.Project).filter(
        models.Task.id == task_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for var, value in task_update.model_dump().items():
        setattr(db_task, var, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_task = db.query(models.Task).join(models.Project).filter(
        models.Task.id == task_id,
        models.Project.owner_id == current_user["uid"]
    ).first()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}
