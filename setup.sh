#!/bin/bash

echo "Setting up Tantuka E-Commerce Project..."

# Create Python virtual environment
echo "Creating Python virtual environment..."
python -m venv /home/nilabh/Projects/Tantuka/backend/venv

# Activate virtual environment
echo "Activating virtual environment..."
source /home/nilabh/Projects/Tantuka/backend/venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r /home/nilabh/Projects/Tantuka/backend/requirements.txt

# Start Docker Compose services
echo "Starting Docker services (PostgreSQL, Redis, etc)..."
cd /home/nilabh/Projects/Tantuka
docker-compose up -d

echo "Setting up database with initial migration..."
cd /home/nilabh/Projects/Tantuka/backend
# Uncomment after installing alembic
# alembic revision --autogenerate -m "Initial migration"
# alembic upgrade head

echo "Setup complete! You can now start the FastAPI server with:"
echo "cd /home/nilabh/Projects/Tantuka/backend && source venv/bin/activate && uvicorn app.main:app --reload"