from fastapi import APIRouter, Depends, HTTPException
from typing import List
import google.generativeai as genai
from app.core.config import settings
from app.schemas import schemas
from app.core.auth import get_current_user

router = APIRouter()

if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
else:
    model = None

@router.post("/chat", response_model=schemas.AIResponse)
async def chat_with_ai(
    request: schemas.AIRequest,
    current_user: dict = Depends(get_current_user)
):
    if not model:
        raise HTTPException(status_code=503, detail="AI service not configured (GEMINI_API_KEY missing)")
    
    try:
        full_prompt = request.prompt
        if request.context:
            full_prompt = f"Context: {request.context}\n\nUser Question: {request.prompt}"
            
        response = model.generate_content(full_prompt)
        return schemas.AIResponse(response=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarize-tasks")
async def summarize_tasks(
    tasks: List[schemas.Task],
    current_user: dict = Depends(get_current_user)
):
    if not model:
        raise HTTPException(status_code=503, detail="AI service not configured")
    
    task_list = "\n".join([f"- {t.title}: {t.description} ({t.status})" for t in tasks])
    prompt = f"Please summarize the following tasks and suggest the next 3 priority items:\n\n{task_list}"
    
    try:
        response = model.generate_content(prompt)
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
