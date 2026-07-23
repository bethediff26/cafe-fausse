# cafe-fausse

This repository supports the Web Application & Interface Design capstone presentation for the MS AI Engineering / Software Design program at Quantic School of Business & Technology.

## Table of Contents

- What is [Café Fausse](#café-fausse)?
- [Requirements](#requirements)
  - [Back End Requirements](#back-end-requirements)
  - [Front End Requirements](#front-end-requirements)
  - [Database Requirements](#database-requirements)
- [Local Installation](#local-installation)
- [Running the Back End](#running-the-back-end)
- [Running the Front End](#running-the-front-end)
- [Verifying the Database Effect](#verifying-the-database-effect)
- [More Information about Architecture & AI Engineering](#more-information-about-architecture--ai-engineering)

## Café Fausse

Café Fausse is an upscale fine-dining restaurant web application designed to demonstrate a robust, full-stack architecture compliant with all Software Requirement Specification (SRS) standards.

The platform features an interactive home and specials banner, a dynamically filtered digital menu, background information and chef bios, an interactive photo gallery with modal Lightbox popups, real-time table reservation management, and direct PostgreSQL database persistence for newsletter subscriptions and bookings.

## Requirements

The Café Fausse application is modularly divided into a back end API, a database layer, and a front end client.

#### Back End Requirements

The application's back end was created using [Flask](https://flask.palletsprojects.com/) and Python 3.10+. It enforces regex-based input and email validation as well as custom real-time 30-table capacity allocation algorithms to prevent reservation time-slot collisions.

#### Front End Requirements

The front end was built using [React](https://react.dev/) and [Vite](https://vitejs.dev/) with [Tailwind CSS](https://tailwindcss.com/) for responsive UI component rendering. It requires [Node 18+](https://nodejs.org/) or newer.

#### Database Requirements

The relational data layer requires a local or remote [PostgreSQL](https://www.postgresql.org/) database server instance storing persistent tables for subscribers, reservations, and customer records.

## Local Installation

1. Clone the repository:

   
```bash
   git clone git@github.com:bethediff26/cafe-fausse.git
   cd cafe-fausse
   
```

2. Initialize the PostgreSQL database:

   
```bash
   createdb cafe_fausse
   psql -d cafe_fausse -f backend/schema.sql
   
```

## Running the Back End

1. Navigate to the `backend` directory:

   
```bash
   cd backend
   
```

2. Set up a Python virtual environment:

   
```bash
   python3 -m venv venv
   
```

3. Activate the environment:

   * **Windows:**

     
```cmd
     venv\Scripts\activate
     
```

   * **macOS/Linux:**

     
```bash
     source venv/bin/activate
     
```

4. Install the backend dependencies:

   
```bash
   pip install -r requirements.txt
   
```

5. Configure your database connection string environment variable:

   
```bash
   export DATABASE_URL="postgresql://localhost/cafe_fausse"
   
```

6. Run the Flask server:

   
```bash
   python app_cafe.py
   
```

7. Verify the server is running by accessing the base REST API health check or endpoints:

   * `http://127.0.0.1:5000/api/health`
   * `http://127.0.0.1:5000/api/menu`
   * `http://127.0.0.1:5000/api/reservations/check`

## Running the Front End

1. Open a new terminal window and navigate to the `frontend` directory:

   
```bash
   cd frontend
   
```

2. Install npm dependencies:

   
```bash
   npm install
   
```

3. Start the Vite development server:

   
```bash
   npm run dev
   
```

4. Your browser will automatically or manually open the application at:

   * `http://localhost:5173`

## Verifying the Database Effect

> ⚠️ **Requirement Note:** Per evaluation guidelines, database effects must be verified directly via SQL query rather than an administrative GUI application.

To verify persistent state changes after submitting a newsletter signup or making a reservation:

1. Connect to PostgreSQL via terminal:

   
```bash
   psql -d cafe_fausse
   
```

2. Check the latest persisted newsletter subscriber record:

   
```sql
   SELECT * FROM subscribers ORDER BY created_at DESC LIMIT 1;
   
```

3. Check the latest customer reservation booking:

   
```sql
   SELECT * FROM reservations ORDER BY reservation_id DESC LIMIT 1;
   
```

## More Information about Architecture & AI Engineering

### System Architecture

The application implements a RESTful service pattern where client interactions drive real-time database transactions. Frontend state updates occur synchronously with server validation responses.

### AI Engineering & Tooling

This project was developed with local AI pair programming utilizing **Qwen 3.6 35B MoE** hosted via **Ollama** and bridged through **Claude Code CLI**. For details on prompt chunking strategies, static NFR auditing, and SRS compliance execution, consult the included `ai-tooling.md` report in the root directory.
