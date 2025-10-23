#!/usr/bin/env python
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def create_admin_user():
    """Create an admin user if it doesn't exist"""
    db = SessionLocal()
    try:
        # Check if admin user already exists
        admin = db.query(User).filter(User.email == "admin@tantuka.com").first()
        if admin:
            print(f"Admin user already exists with ID: {admin.id}")
            return
        
        # Create admin user
        admin_user = User(
            first_name="Admin",
            last_name="User",
            email="admin@tantuka.com",
            password_hash=get_password_hash("Admin@123"),
            phone_number="1234567890",
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print(f"Admin user created with ID: {admin_user.id}")
        
        # Create a regular test user
        test_user = User(
            first_name="Test",
            last_name="User",
            email="test@example.com",
            password_hash=get_password_hash("Test@123"),
            phone_number="9876543210",
            role="customer",
            is_active=True
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        print(f"Test user created with ID: {test_user.id}")
        
    finally:
        db.close()

if __name__ == "__main__":
    print("Creating initial users...")
    create_admin_user()
    print("Done!")