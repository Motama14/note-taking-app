from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import httpx
import os
from dotenv import load_dotenv
import uvicorn

# connect = mysql.connector.connect(user="root", password="root",
#                                     host="127.0.0.1", database="noteit")

# cursor = connect.cursor()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
API_KEY = os.getenv("quotes_api_key")


@app.get("/quote")
async def get_quotes():
    url = "https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom"
    
    headers = {
        "X-Api-key": API_KEY
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        data = response.json()
    
    return data

# @app.get("/notes")
# def get_notes():
#     query = """SELECT * FROM notas LIMIT 20"""
    
#     cursor.execute(query)
    
#     return cursor.fetchall()









if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=8000, reload=True)