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

2. Initialize the PostgreSQL database:

```bash
   createdb cafe_fausse
   psql -d cafe_fausse -f backend/schema.sql
   