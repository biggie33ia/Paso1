from sqlalchemy import Column, Integer, String
#from app.database.db import Base
 
class User():
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)