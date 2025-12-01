from pydantic import BaseModel
from typing import List, Optional


class UserCreate(BaseModel):
    username: str


class UserResponse(BaseModel):
    id: str
    username: str
