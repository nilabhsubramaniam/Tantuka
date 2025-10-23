from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric, Enum, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import OrderStatus, PaymentStatus, PaymentTransactionStatus

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    order_number = Column(String(50), unique=True, nullable=False)
    status = Column(String, default=OrderStatus.PENDING)
    total_amount = Column(Numeric(10, 2))
    payment_status = Column(String, default=PaymentStatus.UNPAID)
    shipping_address_id = Column(Integer, ForeignKey("addresses.id"))
    billing_address_id = Column(Integer, ForeignKey("addresses.id"))
    payment_method = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="orders")
    shipping_address = relationship("Address", foreign_keys=[shipping_address_id])
    billing_address = relationship("Address", foreign_keys=[billing_address_id])
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    variant_id = Column(Integer, ForeignKey("product_variants.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    discount = Column(Numeric(5, 2), default=0)
    subtotal = Column(Numeric(10, 2), nullable=False)

    # Relationships
    order = relationship("Order", back_populates="items")
    variant = relationship("ProductVariant", back_populates="order_items")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    payment_reference = Column(String(100))
    amount = Column(Numeric(10, 2))
    status = Column(String, nullable=False)
    transaction_date = Column(DateTime(timezone=True), server_default=func.now())
    payment_metadata = Column(JSON)

    # Relationships
    order = relationship("Order", back_populates="payments")