from datetime import datetime, timedelta
from typing import Any, Optional, Union

from jose import jwt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# JWT token configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-generate-a-secure-one")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))


def create_access_token(
    subject: Union[str, Any], expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a new JWT token
    
    Args:
        subject: Subject of the token (usually user_id)
        expires_delta: Token expiration time
    
    Returns:
        Encoded JWT token as string
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt