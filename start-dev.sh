#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==================================================="
echo "       VERCBD - Starting Development Servers"
echo "==================================================="
echo ""

# 1. Start Docker DB if available
if command -v docker &> /dev/null; then
    echo "[INFO] Ensuring PostgreSQL container is started..."
    docker compose up -d
fi

# 2. Trap for clean exit
cleanup() {
    echo ""
    echo "[INFO] Shutting down servers..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

# 3. Start Backend & Frontend concurrently
echo "[INFO] Starting Backend (http://localhost:3001) & Frontend (http://localhost:3000)..."
(cd backend && npm run start:dev) &
(cd frontend && npm run dev) &

wait
