import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Header, HTTPException, Depends
from app.core.config import settings
from typing import Optional
import os

# Initialize Firebase Admin
if not firebase_admin._apps:
    if settings.FIREBASE_SERVICE_ACCOUNT_PATH and os.path.exists(settings.FIREBASE_SERVICE_ACCOUNT_PATH):
        cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    else:
        # If no service account is provided, it might work in some environments (like GCP)
        # or we might need to handle it differently.
        # For local development with FastAPI, we'll just try default credentials.
        try:
            firebase_admin.initialize_app()
        except Exception:
            print("Firebase Admin could not be initialized. Auth will fail.")

async def verify_firebase_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid Firebase token: {str(e)}")

def get_current_user(token_data: dict = Depends(verify_firebase_token)):
    return {
        "uid": token_data.get("user_id"),
        "email": token_data.get("email"),
        "name": token_data.get("name"),
        "picture": token_data.get("picture")
    }
