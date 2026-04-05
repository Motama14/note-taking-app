from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import httpx
import os
from dotenv import load_dotenv
import uvicorn
from pydantic import BaseModel

load_dotenv()
API_KEY = os.getenv("quotes_api_key")
DB_USER = os.getenv("db_user")
DB_PASSWORD = os.getenv("db_password")

def get_connection():
    return mysql.connector.connect(user=DB_USER, password=DB_PASSWORD,
                                    host="localhost", database="noteit", ssl_disabled=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# @app.get("/quote")
# async def get_quotes():
#     url = "https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom"
    
#     headers = {
#         "X-Api-key": API_KEY
#     }
    
#     async with httpx.AsyncClient() as client:
#         response = await client.get(url, headers=headers)
#         data = response.json()
    
#     return data

@app.get("/notes")
def get_notes():
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """SELECT * FROM notes"""
    cursor.execute(query)
    result = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return result

@app.get("/tags")
def get_tags():
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """SELECT name FROM tag"""
    cursor.execute(query)
    result = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return result

class Note(BaseModel):
    id: int | None = None
    title: str
    content: str
    tag: str | None = None


@app.put("/update")
def update_notes(item: Note):
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """UPDATE notes SET title = %s, content = %s WHERE id = %s"""
    cursor.execute(query, (item.title, item.content, item.id))
    conn.commit()
    
    cursor.close()
    conn.close()


@app.post("/insert")
def insert_note(item: Note):
    conn = get_connection()
    cursor = conn.cursor()
    
    query = """INSERT INTO notes VALUES (0, %s, %s, %s)"""
    cursor.execute(query, (item.title, item.content, item.tag))
    conn.commit()
    
    cursor.close()
    conn.close()






if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=8000, reload=True)