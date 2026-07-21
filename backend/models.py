"""SQLAlchemy models for the Café Fausse reservation system.

Schema derived from docs/webapplication_projectdescription.txt (Customers and
Reservations tables, 30-table capacity).
"""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import CheckConstraint, UniqueConstraint

db = SQLAlchemy()

TOTAL_TABLES = 30


class Customer(db.Model):
    """Stores customer contact details and newsletter preference."""

    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    phone_number = db.Column(db.String(20), nullable=True)
    newsletter_signup = db.Column(db.Boolean, nullable=False, default=False)

    reservations = db.relationship(
        "Reservation",
        back_populates="customer",
        lazy="dynamic",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Customer id={self.id} email={self.email!r}>"


class Reservation(db.Model):
    """Stores table bookings linked to a customer."""

    __tablename__ = "reservations"
    __table_args__ = (
        UniqueConstraint(
            "time_slot",
            "table_number",
            name="uq_reservation_time_slot_table",
        ),
        CheckConstraint(
            f"table_number >= 1 AND table_number <= {TOTAL_TABLES}",
            name="ck_reservation_table_number",
        ),
        CheckConstraint("num_guests >= 1", name="ck_reservation_num_guests"),
    )

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False,
        index=True,
    )
    time_slot = db.Column(db.DateTime, nullable=False, index=True)
    table_number = db.Column(db.Integer, nullable=False)
    num_guests = db.Column(db.Integer, nullable=False)

    customer = db.relationship("Customer", back_populates="reservations")

    def __repr__(self) -> str:
        return (
            f"<Reservation id={self.id} customer_id={self.customer_id} "
            f"time_slot={self.time_slot!r} table={self.table_number}>"
        )
