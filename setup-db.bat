@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo        VERCBD - PostgreSQL Database Setup
echo ===================================================
echo.

cd /d "%~dp0"

REM 1. Ensure backend .env exists
if not exist "backend\.env" (
    echo [INFO] Creating backend\.env from template...
    copy "backend\.env.example" "backend\.env" >nul
)

REM 2. Check if Docker is available
where docker >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Docker detected. Starting PostgreSQL container...
    docker compose up -d
    if %ERRORLEVEL% equ 0 (
        echo [INFO] PostgreSQL container is running. Waiting 5 seconds for initialization...
        timeout /t 5 /nobreak >nul
    ) else (
        echo [WARN] Docker compose failed to start. Continuing with database migration...
    )
) else (
    echo [NOTE] Docker not found on PATH.
    echo Make sure PostgreSQL is running locally or a cloud database URL is configured in backend\.env.
    echo.
)

REM 3. Install backend dependencies if missing
if not exist "backend\node_modules" (
    echo [INFO] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM 4. Generate Prisma Client and Push Schema
echo [INFO] Generating Prisma Client...
cd backend
call npx prisma generate
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Prisma generate failed.
    cd ..
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [INFO] Pushing schema to PostgreSQL database...
call npx prisma db push --accept-data-loss
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Could not connect to PostgreSQL or push schema.
    echo Please check your DATABASE_URL in backend\.env or ensure PostgreSQL is running.
    cd ..
    pause
    exit /b %ERRORLEVEL%
)

REM 5. Seed initial data
echo.
echo [INFO] Seeding database with initial data...
call npx prisma db seed
if %ERRORLEVEL% neq 0 (
    echo [WARN] Seeding had warnings/issues.
)

cd ..

echo.
echo ===================================================
echo   [SUCCESS] PostgreSQL Database is fully ready!
echo ===================================================
echo - Database URL configured in: backend\.env
echo - Run 'start-dev.bat' to start both Backend and Frontend.
echo ===================================================
echo.
pause
