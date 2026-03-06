from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "NeuraBoard API"
    API_V1_STR: str = "/api/v1"
    
    # Security
    DATABASE_URL: str = "sqlite:///./neuraboard.db"
    
    # Firebase
    FIREBASE_SERVICE_ACCOUNT_PATH: Optional[str] = None
    
    # AI
    GEMINI_API_KEY: Optional[str] = None
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
