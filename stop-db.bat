@echo off
echo Stopping PostgreSQL container...
cd /d "%~dp0"
docker compose down
echo PostgreSQL container stopped.
pause
