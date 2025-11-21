
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
- Saree-focused product catalog with state-based browsing
- 8+ state collection pages (UP Lucknow, Kerala, Tamil Nadu, etc.)
- Dynamic routing for state-based saree collections
- Product detail pages with image gallery
- Shopping cart functionality
- Admin dashboard and statistics
- Premium animations with Framer Motion
- Responsive, modern UI with Chikankari aesthetic
- Testimonials, newsletter, and more
- Mobile-optimized responsive design

## Saree-Focused UI Implementation

The platform now features a premium, animation-rich saree-centric interface:

### Main Landing Page (`/sarees`)
- Hero section with parallax effects and floating animations
- State grid showcasing 8+ Indian states
- Featured saree collections
- Artisan storytelling section
- Premium animations throughout

### State Collection Pages (`/sarees/[state]`)
Fully functional routes for:
- `/sarees/up` - Uttar Pradesh (Lucknow Chikankari)
- `/sarees/kl` - Kerala (Kasavu Saree)
- `/sarees/tn` - Tamil Nadu (Kanchipuram Silk)
- `/sarees/ka` - Karnataka (Mysore Silk)
- `/sarees/wb` - West Bengal (Tant Saree)
- `/sarees/od` - Odisha (Sambalpuri Saree)
- `/sarees/mh` - Maharashtra (Paithani Saree)
- `/sarees/ap` - Andhra Pradesh (Venkatagiri Saree)

Each state page includes:
- State information and heritage details
- Product grid with responsive layout
- Sort and filter options
- Breadcrumb navigation
- Smooth animations
- Mobile optimization

### Technical Highlights
- **Framework**: Next.js 14, React 18
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion (GPU-accelerated, 60fps)
- **Performance**: Next.js Image optimization
- **Design System**: Chikankari color palette (Cream, Brown, Gold, Sage)
- **Typography**: Playfair Display, Inter, Cormorant Garamond

## Roadmap / TODO

### Completed ✅
- [x] Authentication system (JWT, registration, login)
- [x] Product catalog API and UI
- [x] Shopping cart functionality (backend ready)
- [x] Admin dashboard
- [x] Frontend structure and home page
- [x] Saree-focused landing page with animations
- [x] State-based product browsing (8 states)
- [x] Premium animations and transitions
- [x] Responsive mobile-first design
- [x] Artisan storytelling components

### In Progress / Planned
- [ ] Shopping cart and checkout UI
- [ ] Payment integration (Stripe/Razorpay)
- [ ] User profile and order history
- [ ] Individual product detail pages
- [ ] Advanced filtering (price, rating, type)
- [ ] Backend API integration for dynamic products
- [ ] Add 20+ additional states
- [ ] Chikankari product category (Phase 2)
- [ ] Wishlist functionality
- [ ] Product reviews and ratings

---
For questions or contributions, please open an issue or pull request.