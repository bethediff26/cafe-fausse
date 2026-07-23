Café Fausse — Full-Stack Web Application

Café Fausse is an SRS-compliant, full-stack web application developed for an upscale fine-dining restaurant. The project features a dynamic React frontend, a Flask RESTful API backend, and a robust PostgreSQL relational database for persistent real-time reservation scheduling and newsletter signups.

🏛️ Architecture & Tech Stack

Frontend: React + Vite, Tailwind CSS for responsive styling, Lightbox modal components, and state-driven category filters.

Backend: Flask RESTful API (Python), enforcing regex input/email validation and real-time table capacity algorithms.

Database: PostgreSQL Relational Database, storing customer reservations, table allocations, and newsletter subscriber persistence.

AI Tooling & Pairing: Qwen 3.6 35B MoE via Ollama, Claude Code CLI bridge for rapid prototyping, static analysis, and SRS compliance auditing.

🚀 Features & Deliverables

Home & Specials Page: Hero banner, daily chef specials, and footer newsletter subscription with regex email checks.

Interactive Menu Page: Category filtering (Appetizers, Mains, Desserts, Drinks) with instant React state updates.

About Us Page: Restaurant heritage, chef team bios, location details, and operating hours.

Gallery & Reviews Page: Interactive Lightbox modal gallery and verified customer reviews.

Reservations System: Live booking flow with sub-second real-time capacity checks across a 30-table layout to eliminate time-slot collisions in PostgreSQL.

⚙️ Local Setup Instructions

Prerequisites

Python 3.10+

Node.js v18+ & npm

PostgreSQL server running locally

1. Database Setup

Create a PostgreSQL database named cafe_fausse:

createdb cafe_fausse


Initialize schema and tables:

psql -d cafe_fausse -f backend/schema.sql


2. Backend Setup (Flask API)

Navigate to the backend directory:

cd backend


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies:

pip install -r requirements.txt


Configure environment variables (e.g., database connection string):

export DATABASE_URL="postgresql://localhost/cafe_fausse"


Run the Flask server:

python app_cafe.py


The API server will start on http://127.0.0.1:5000.

3. Frontend Setup (React + Vite)

Navigate to the frontend directory:

cd ../frontend


Install dependencies:

npm install


Start the Vite development server:

npm run dev


Open your browser and navigate to http://localhost:5173.

🧪 Database Verification

To directly inspect persistent database records (without an admin UI):

-- Verify latest newsletter subscriber
SELECT * FROM subscribers ORDER BY created_at DESC LIMIT 1;

-- Verify latest reservation entry
SELECT * FROM reservations ORDER BY reservation_id DESC LIMIT 1;
