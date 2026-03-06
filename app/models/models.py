from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)  # Firebase UID
    email = Column(String, unique=True, index=True)
    display_name = Column(String)
    photo_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    projects = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    category = Column(String)
    status = Column(String, default="Active")
    progress = Column(Integer, default=0)
    color = Column(String)
    members = Column(Integer, default=1)
    tasks_count = Column(Integer, default=0)
    owner_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    priority = Column(String)
    status = Column(String)
    assignee = Column(String)
    due_date = Column(String)
    comments_count = Column(Integer, default=0)
    tags = Column(JSON, default=list)
    project_id = Column(Integer, ForeignKey("projects.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    project = relationship("Project", back_populates="tasks")
