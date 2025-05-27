from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..Back.chat_bot import chat_with_bot, ChatRequest, generate_chat_id

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
    response = chat_with_bot(request)
    return {"response": response[0], "conversation_history": response[1]}

@app.get("/chat/generate")
def generateChatId():
    return generate_chat_id()

@app.get("/test")
def test():
    return {"message": "Hello World du fion"}