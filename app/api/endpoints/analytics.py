from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models import models
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/overview")
def get_analytics_overview(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    # Overall task status counts
    status_counts = db.query(
        models.Task.status, 
        func.count(models.Task.id)
    ).join(models.Project).filter(
        models.Project.owner_id == current_user["uid"]
    ).group_by(models.Task.status).all()
    
    # Project counts
    project_count = db.query(models.Project).filter(
        models.Project.owner_id == current_user["uid"]
    ).count()
    
    # Category distribution
    category_counts = db.query(
        models.Project.category,
        func.count(models.Project.id)
    ).filter(
        models.Project.owner_id == current_user["uid"]
    ).group_by(models.Project.category).all()
    
    return {
        "status_distribution": {status: count for status, count in status_counts},
        "project_count": project_count,
        "category_distribution": {cat: count for cat, count in category_counts}
    }
