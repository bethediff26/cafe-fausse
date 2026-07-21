"""Flask API for the Café Fausse web application.

Implements the five-page React frontend contract and back-end reservation
system defined in docs/webapplication_projectdescription.txt.
"""

import os
import random
import re
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

from models import TOTAL_TABLES, Customer, Reservation, db

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def image_url(filename: str) -> str:
    return f"/static/images/{filename}"


HOME_CONTENT = {
    "name": "Café Fausse",
    "hero_image": image_url("home-cafe-fausse.webp"),
    "contact": {
        "address": "1234 Culinary Ave, Suite 100, Washington, DC 20002",
        "phone": "(202) 555-4567",
        "hours": {
            "monday_saturday": "5:00 PM – 11:00 PM",
            "sunday": "5:00 PM – 9:00 PM",
        },
    },
    "navigation": ["home", "menu", "reservations", "about", "gallery"],
}

MENU_CONTENT = {
    "categories": [
        {
            "name": "Starters",
            "items": [
                {
                    "name": "Bruschetta",
                    "description": "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
                    "price": 8.50,
                },
                {
                    "name": "Caesar Salad",
                    "description": "Crisp romaine with homemade Caesar dressing",
                    "price": 9.00,
                },
            ],
        },
        {
            "name": "Main Courses",
            "items": [
                {
                    "name": "Grilled Salmon",
                    "description": "Served with lemon butter sauce and seasonal vegetables",
                    "price": 22.00,
                },
                {
                    "name": "Ribeye Steak",
                    "description": "12 oz prime cut with garlic mashed potatoes",
                    "price": 28.00,
                    "image": image_url("gallery-ribeye-steak.webp"),
                },
                {
                    "name": "Vegetable Risotto",
                    "description": "Creamy Arborio rice with wild mushrooms",
                    "price": 18.00,
                },
            ],
        },
        {
            "name": "Desserts",
            "items": [
                {
                    "name": "Tiramisu",
                    "description": "Classic Italian dessert with mascarpone",
                    "price": 7.50,
                },
                {
                    "name": "Cheesecake",
                    "description": "Creamy cheesecake with berry compote",
                    "price": 7.00,
                },
            ],
        },
        {
            "name": "Beverages",
            "items": [
                {
                    "name": "Red Wine (Glass)",
                    "description": "A selection of Italian reds",
                    "price": 10.00,
                },
                {
                    "name": "White Wine (Glass)",
                    "description": "Crisp and refreshing",
                    "price": 9.00,
                },
                {
                    "name": "Craft Beer",
                    "description": "Local artisan brews",
                    "price": 6.00,
                },
                {
                    "name": "Espresso",
                    "description": "Strong and aromatic",
                    "price": 3.00,
                },
            ],
        },
    ]
}

ABOUT_CONTENT = {
    "description": (
        "Café Fausse is a fine-dining restaurant focused on intuitive hospitality, "
        "impressive visuals, and an unforgettable guest experience."
    ),
    "image": image_url("gallery-cafe-interior.webp"),
    "owners": [
        {
            "name": "Chef Antonio Rossi",
            "role": "Co-Founder & Executive Chef",
        },
        {
            "name": "Maria Lopez",
            "role": "Co-Founder & Restaurateur",
        },
    ],
}

RESERVATIONS_CONTENT = {
    "total_tables": TOTAL_TABLES,
    "form_fields": [
        {"name": "time_slot", "label": "Time Slot", "required": True},
        {"name": "num_guests", "label": "Number of Guests", "required": True},
        {"name": "customer_name", "label": "Customer Name", "required": True},
        {"name": "email", "label": "Email Address", "required": True},
        {"name": "phone_number", "label": "Phone Number", "required": False},
        {"name": "newsletter_signup", "label": "Newsletter Signup", "required": False},
    ],
}

GALLERY_CONTENT = {
    "images": [
        {
            "id": 1,
            "title": "Café Fausse Dining Room",
            "category": "interior",
            "url": image_url("gallery-cafe-interior.webp"),
        },
        {
            "id": 2,
            "title": "Ribeye Steak",
            "category": "dishes",
            "url": image_url("gallery-ribeye-steak.webp"),
        },
        {
            "id": 3,
            "title": "Special Event",
            "category": "events",
            "url": image_url("gallery-special-event.webp"),
        },
    ],
    "awards": [
        {"title": "Culinary Excellence Award", "year": 2022},
        {"title": "Restaurant of the Year", "year": 2023},
        {
            "title": "Best Fine Dining Experience",
            "year": 2023,
            "source": "Foodie Magazine",
        },
    ],
    "reviews": [
        {
            "quote": "Exceptional ambiance and unforgettable flavors.",
            "source": "Gourmet Review",
        },
        {
            "quote": "A must-visit restaurant for food enthusiasts.",
            "source": "The Daily Bite",
        },
    ],
}


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:PG%23Rul3s%23@localhost:5432/cafe_fausse",
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)

    register_routes(app)
    return app


def register_routes(app: Flask) -> None:
    @app.get("/api/health")
    def health_check():
        return jsonify({"status": "ok"})

    @app.get("/api/home")
    def get_home():
        return jsonify(HOME_CONTENT)

    @app.get("/api/menu")
    def get_menu():
        return jsonify(MENU_CONTENT)

    @app.get("/api/about")
    def get_about():
        return jsonify(ABOUT_CONTENT)

    @app.get("/api/reservations")
    def get_reservations_page():
        return jsonify(RESERVATIONS_CONTENT)

    @app.get("/api/gallery")
    def get_gallery():
        return jsonify(GALLERY_CONTENT)

    @app.get("/api/reservations/availability")
    def check_availability():
        time_slot, error = parse_time_slot(request.args.get("time_slot"))
        if error:
            return jsonify({"error": error}), 400

        available_tables = get_available_tables(time_slot)
        return jsonify(
            {
                "time_slot": time_slot.isoformat(),
                "available": len(available_tables) > 0,
                "available_tables": len(available_tables),
                "total_tables": TOTAL_TABLES,
            }
        )

    @app.post("/api/reservations")
    def create_reservation():
        payload = request.get_json(silent=True) or {}

        time_slot, error = parse_time_slot(payload.get("time_slot"))
        if error:
            return jsonify({"error": error}), 400

        customer_name = (payload.get("customer_name") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        phone_number = (payload.get("phone_number") or "").strip() or None
        newsletter_signup = payload.get("newsletter_signup", False)

        print(f"DEBUG: payload newsletter_signup = {newsletter_signup}")

        try:
            num_guests = int(payload.get("num_guests"))
        except (TypeError, ValueError):
            return jsonify({"error": "Number of guests must be a valid integer."}), 400

        if not customer_name:
            return jsonify({"error": "Customer name is required."}), 400

        if not is_valid_email(email):
            return jsonify({"error": "A valid email address is required."}), 400

        if num_guests < 1:
            return jsonify({"error": "Number of guests must be at least 1."}), 400

        available_tables = get_available_tables(time_slot)
        if not available_tables:
            return jsonify(
                {
                    "error": (
                        "All seats are taken for that time slot. "
                        "Please pick another time."
                    )
                }
            ), 409

        customer = Customer.query.filter_by(email=email).first()
        if customer:
            customer.name = customer_name
            if phone_number:
                customer.phone_number = phone_number
            customer.newsletter_signup = bool(newsletter_signup)
            print(f"DEBUG: existing customer {customer.id} newsletter_signup set to {customer.newsletter_signup}")
        else:
            customer = Customer(
                name=customer_name,
                email=email,
                phone_number=phone_number,
                newsletter_signup=bool(newsletter_signup),
            )
            db.session.add(customer)
            db.session.flush()
            print(f"DEBUG: new customer {customer.id} newsletter_signup set to {customer.newsletter_signup}")

        reservation, assign_error = assign_random_table(
            customer_id=customer.id,
            time_slot=time_slot,
            num_guests=num_guests,
            available_tables=available_tables,
        )
        if assign_error:
            return jsonify({"error": assign_error}), 409

        db.session.commit()

        return jsonify(
            {
                "message": "Your reservation was successful.",
                "reservation": {
                    "id": reservation.id,
                    "time_slot": reservation.time_slot.isoformat(),
                    "table_number": reservation.table_number,
                    "num_guests": reservation.num_guests,
                    "customer_name": customer.name,
                    "email": customer.email,
                },
            }
        ), 201

    @app.post("/api/newsletter")
    def subscribe_newsletter():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()

        if not is_valid_email(email):
            return jsonify({"error": "A valid email address is required."}), 400

        customer = Customer.query.filter_by(email=email).first()
        if customer:
            customer.newsletter_signup = True
        else:
            customer = Customer(
                email=email,
                newsletter_signup=True,
            )
            db.session.add(customer)

        db.session.commit()

        return jsonify({"message": "Successfully subscribed to the newsletter."}), 201


def is_valid_email(email: str) -> bool:
    return bool(email and EMAIL_PATTERN.match(email))


def parse_time_slot(value) -> tuple[datetime | None, str | None]:
    if not value:
        return None, "Time slot is required."

    if isinstance(value, datetime):
        return value, None

    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")), None
    except ValueError:
        return None, "Time slot must be a valid ISO 8601 date-time string."


def get_available_tables(time_slot: datetime) -> list[int]:
    booked_tables = {
        reservation.table_number
        for reservation in Reservation.query.filter_by(time_slot=time_slot).all()
    }
    return [table for table in range(1, TOTAL_TABLES + 1) if table not in booked_tables]


def assign_random_table(
    customer_id: int,
    time_slot: datetime,
    num_guests: int,
    available_tables: list[int],
) -> tuple[Reservation | None, str | None]:
    tables_to_try = available_tables[:]
    random.shuffle(tables_to_try)

    for table_number in tables_to_try:
        reservation = Reservation(
            customer_id=customer_id,
            time_slot=time_slot,
            table_number=table_number,
            num_guests=num_guests,
        )
        db.session.add(reservation)

        try:
            with db.session.begin_nested():
                db.session.flush()
            return reservation, None
        except IntegrityError:
            db.session.expunge(reservation)
            continue

    return None, (
        "All seats are taken for that time slot. Please pick another time."
    )


app = create_app()


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(
        host=os.environ.get("FLASK_HOST", "0.0.0.0"),
        port=int(os.environ.get("FLASK_PORT", "5000")),
        debug=os.environ.get("FLASK_DEBUG", "true").lower() == "true",
    )
