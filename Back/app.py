from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..Back.chat_bot import chat_with_bot, ChatRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/bot/chat")
def chatWithBot(request: ChatRequest):
    return chat_with_bot(request)

@app.get("/test")
def test():
    return {"message": "Hello World du fion"}