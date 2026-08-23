# PostgreSQL Setup Guide for VERCBD

This project uses **NestJS** with **Prisma ORM** connected to a **PostgreSQL** database.

---

## 🚀 Quick Setup (1-Click)

### On Windows
Simply double-click:
1. `setup-db.bat` - Automatically starts the PostgreSQL container, generates Prisma client, applies schema migrations, and seeds initial data.
2. `start-dev.bat` - Launches both Backend (NestJS) and Frontend (Next.js).

### On Linux / macOS
Make the scripts executable and run:
```bash
chmod +x setup-db.sh start-dev.sh stop-db.sh
./setup-db.sh
./start-dev.sh
```

---

## ⚙️ Database Configuration

Database credentials and connection URLs are configured in `backend/.env`:

```env
DATABASE_URL="postgresql://verc_user:verc_password@localhost:5432/vercbd?schema=public"
PORT=3001
```

### PostgreSQL Options:

#### Option A: Docker (Default)
If you have Docker installed, `docker-compose.yml` provides a ready-to-run PostgreSQL 16 instance:
```bash
# Start DB manually
docker compose up -d

# Stop DB manually
docker compose down
```

#### Option B: Cloud PostgreSQL (Neon / Supabase / Render)
If you prefer not running PostgreSQL locally:
1. Create a free PostgreSQL database at [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), or [Render](https://render.com).
2. Paste the connection string into `backend/.env`:
   ```env
   DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
   ```
3. Run `setup-db.bat` (Windows) or `./setup-db.sh` (Linux).

---

## 🛠 Useful Commands

From the `backend` folder:
- `npx prisma generate` — Generate Prisma Client
- `npx prisma db push` — Push schema changes directly to PostgreSQL
- `npx prisma db seed` — Populate database with sample programs & success stories
- `npx prisma studio` — Open visual GUI in browser to inspect & edit data

---

## 🌐 Endpoints
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)
- **API Swagger Docs**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
