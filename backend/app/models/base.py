from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric, Enum, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from app.database import Base

# Enum definitions
class UserRole(str, enum.Enum):
    CUSTOMER = "customer"
    ADMIN = "admin"
    SELLER = "seller"

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class PaymentStatus(str, enum.Enum):
    UNPAID = "unpaid"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"

class PaymentTransactionStatus(str, enum.Enum):
    INITIATED = "initiated"
    SUCCESSFUL = "successful"
    FAILED = "failed"
    REFUNDED = "refunded"

class AddressType(str, enum.Enum):
    SHIPPING = "shipping"
    BILLING = "billing"