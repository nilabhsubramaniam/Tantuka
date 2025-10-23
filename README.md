
# Tantuka E-Commerce Platform

Tantuka is a modern e-commerce platform focused on Chikankari clothing and accessories, featuring:
- FastAPI backend (Python, PostgreSQL, JWT Auth)
- Next.js frontend (React, Tailwind CSS, TypeScript)
- Admin dashboard, product catalog, shopping cart, and authentication
- Beautiful UI/UX with Chikankari craftsmanship showcase

## Project Structure

```
/Tantuka
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── database.py     # Database connection
│   │   └── main.py         # Main FastAPI app
│   ├── migrations/         # Alembic migrations
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── components/         # React components
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   └── package.json        # JS dependencies
├── docker-compose.yml      # Docker Compose for services
└── setup.sh               # Setup script
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 16+
- Docker and Docker Compose


### Setup

1. Run the setup script:
   ```bash
   ./setup.sh
   ```

2. Start the backend server:
   ```bash
   ./run_server.sh
   ```

3. Start the frontend development server:
   ```bash
   ./run_frontend.sh
   ```

4. Access the application:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000

## Database Management

The PostgreSQL database is accessible via:
- Host: localhost
- Port: 5432
- Username: tantuka_user
- Password: tantuka_password
- Database: tantuka_db

Use the SQLTools VS Code extension to connect to and manage the database.

## API Documentation

Once the backend server is running, access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## .gitignore

A comprehensive `.gitignore` is included to avoid committing:
- Node.js and Python dependencies
- Build artifacts and static assets
- Environment variables and secrets
- Editor/OS-specific files

## Features

- User authentication (JWT, registration, login)
- Product catalog and category browsing
- Product detail pages with image gallery
- Shopping cart functionality
- Admin dashboard and statistics
- Responsive, modern UI with Chikankari focus
- Testimonials, newsletter, and more

## Roadmap / TODO

- [x] Authentication system (JWT, registration, login)
- [x] Product catalog API and UI
- [x] Shopping cart functionality
- [x] Admin dashboard
- [x] Frontend structure and home page
- [x] Product listing and detail pages
- [ ] Shopping cart and checkout UI
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User profile and order history
- [ ] API integration for all frontend features

---
For questions or contributions, please open an issue or pull request.