from datetime import timedelta
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status

from app.models.user import User
from app.core.security import get_password_hash, verify_password
from app.core.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from app.schemas.auth import UserCreate, Token
from app.database import get_db


class AuthService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def register_new_user(self, user_data: UserCreate) -> User:
        """
        Register a new user
        """
        # Check if user with this email already exists
        existing_user = self.db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with this email already exists"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            password_hash=hashed_password,
            phone_number=user_data.phone_number
        )
        
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        return db_user
    
    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate a user by email and password
        """
        user = self.db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user
    
    def create_user_token(self, user_id: int) -> Token:
        """
        Create access token for user
        """
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token = create_access_token(subject=user_id, expires_delta=expires_delta)
        return Token(access_token=token, token_type="bearer")