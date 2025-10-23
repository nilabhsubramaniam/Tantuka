from sqlalchemy import Column, Integer, String, Boolean, Date, Numeric
from sqlalchemy.orm import relationship

from app.database import Base

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True)
    discount_percent = Column(Numeric(5, 2))
    max_uses = Column(Integer)
    used_count = Column(Integer, default=0)
    valid_from = Column(Date)
    valid_to = Column(Date)
    is_active = Column(Boolean, default=True)