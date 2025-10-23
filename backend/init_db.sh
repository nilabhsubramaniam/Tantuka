#!/bin/bash

# Initialize Alembic
echo "Initializing Alembic..."
cd /home/nilabh/Projects/Tantuka/backend
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
echo "Applying migrations..."
alembic upgrade head

echo "Database migration complete!"