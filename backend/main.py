import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from phishing_model import predict_phishing
from schemas import PhishingRequest
from ai_schema import AIChatRequest
from ai_engine import cyberguard_ai

configured_origins = os.getenv("CYBERGUARD_CORS_ORIGINS")
cors_origins = (
    [origin.strip() for origin in configured_origins.split(",") if origin.strip()]
    if configured_origins
    else ["http://localhost:5173", "http://127.0.0.1:5173"]
)

if "*" in cors_origins:
    raise ValueError("CYBERGUARD_CORS_ORIGINS must contain explicit origins, not '*'.")

app = FastAPI(
    title="CyberGuard AI Security API",
    description="AI-powered cyber threat, phishing and digital impersonation detection backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "system": "CYBERGUARD",
        "status": "operational",
        "engine": "AI threat analysis online"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "engine": "online"
    }

@app.post("/api/phishing/analyze")
def analyze_phishing(request: PhishingRequest):
    return {
        "success": True,
        "analysis": predict_phishing(request.text)
    }

@app.post("/api/ai/chat")
def ai_chat(request: AIChatRequest):
    return {
        "success": True,
        "mode": request.mode,
        "response": cyberguard_ai(request.message, request.mode)
    }
