from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

connect = mysql.connector.connect(user="root", password="root",
                                    host="127.0.0.1", database="noteit")

cursor = connect.cursor()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methos=["*"],
    allow_headers=["*"]
)


@app.get("/notes")
def get_notes():
    query = """SELECT * FROM notas LIMIT 20"""
    
    cursor.execute(query)
    
    return cursor.fetchall()