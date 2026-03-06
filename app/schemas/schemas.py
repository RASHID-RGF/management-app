from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    display_name: Optional[str] = None
    photo_url: Optional[str] = None

class UserCreate(UserBase):
    id: str  # Firebase UID

class User(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    status: str
    assignee: Optional[str] = None
    due_date: Optional[str] = None
    tags: List[str] = []

class TaskCreate(TaskBase):
    project_id: int

class Task(TaskBase):
    id: int
    project_id: int
    comments_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    status: str = "Active"
    progress: int = 0
    color: str
    members: int = 1
    tasks: int = 0

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    owner_id: str
    created_at: datetime
    tasks: List[Task] = []

    class Config:
        from_attributes = True

class AIRequest(BaseModel):
    prompt: str
    context: Optional[str] = None

class AIResponse(BaseModel):
    response: str
