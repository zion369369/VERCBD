@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo        VERCBD - Starting Development Servers
echo ===================================================
echo.

cd /d "%~dp0"

REM 1. Start Docker DB if docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Ensuring PostgreSQL container is started...
    docker compose up -d
)

REM 2. Start Backend
echo [INFO] Starting Backend (NestJS on http://localhost:3001)...
start "VERC Backend (NestJS)" cmd /k "cd /d %~dp0backend && npm run start:dev"

REM 3. Start Frontend
echo [INFO] Starting Frontend (Next.js on http://localhost:3000)...
start "VERC Frontend (Next.js)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ===================================================
echo   Servers are launching in separate windows!
echo ===================================================
echo - Frontend:  http://localhost:3000
echo - Backend:   http://localhost:3001
echo - Swagger:   http://localhost:3001/api/docs
echo ===================================================
echo.
