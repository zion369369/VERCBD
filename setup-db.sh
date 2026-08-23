#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==================================================="
echo "       VERCBD - PostgreSQL Database Setup"
echo "==================================================="
echo ""

# 1. Ensure backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "[INFO] Creating backend/.env from template..."
    cp "backend/.env.example" "backend/.env"
fi

# 2. Check if Docker is available
if command -v docker &> /dev/null; then
    echo "[INFO] Docker detected. Starting PostgreSQL container..."
    docker compose up -d
    echo "[INFO] Waiting 5 seconds for PostgreSQL to initialize..."
    sleep 5
else
    echo "[NOTE] Docker command not found."
    echo "Make sure PostgreSQL is running locally or a cloud database URL is configured in backend/.env."
    echo ""
fi

# 3. Install backend dependencies if missing
if [ ! -d "backend/node_modules" ]; then
    echo "[INFO] Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# 4. Generate Prisma Client and Push Schema
echo "[INFO] Generating Prisma Client..."
cd backend
npx prisma generate

echo ""
echo "[INFO] Pushing schema to PostgreSQL database..."
npx prisma db push --accept-data-loss

# 5. Seed initial data
echo ""
echo "[INFO] Seeding database with initial data..."
npx prisma db seed

cd ..

echo ""
echo "==================================================="
echo "  [SUCCESS] PostgreSQL Database is fully ready!"
echo "==================================================="
echo "- Database URL configured in: backend/.env"
echo "- Run './start-dev.sh' to start both Backend and Frontend."
echo "==================================================="
echo ""
