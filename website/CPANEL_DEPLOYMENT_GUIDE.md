# VERCBD - Complete cPanel Deployment & Environment Setup Guide

This guide walks you through deploying the VERCBD website to your cPanel hosting account step-by-step.

---

## What is inside this `website` folder?

- **Pre-Built `.next/` Production Directory**: Your production build is already generated and verified with 0 errors. You do not need to run a heavy build on cPanel.
- **`server.js`**: Production Node.js / Phusion Passenger server entry point configured for cPanel CloudLinux.
- **`app/`, `components/`, `context/`, `lib/`, `public/`**: All production source code, assets, icons, logos, and CMS modules.
- **`package.json`**: Contains dependencies for the production runtime.
- **`.env`**: Ready-to-configure environment variables for production.
- **`.htaccess`**: Apache reverse-proxy rules for SSL and routing.

---

## Step 1: Upload the Website to cPanel

1. **Option A (Fastest - Recommended)**:
   - In your local project root `d:\VERCBD`, find the file:
     📁 **`website.zip`**
   - Open your browser to **cPanel File Manager** (just like your screenshot at `/home/vercbd`).
   - Click the **"Upload"** icon on the top toolbar.
   - Drag and drop **`website.zip`** into the upload window.
   - Once upload reaches 100%, close the upload tab and click **"Reload"** in File Manager.
   - Right-click **`website.zip`** and select **"Extract"**.
   - Set destination directory as: `/home/vercbd/website` (or `/home/vercbd/public_html` if configuring passenger in public_html).

2. **Option B (Uploading uncompressed folder via FTP/FileZilla)**:
   - Connect via SFTP/FTP using your cPanel credentials.
   - Upload the entire **`d:\VERCBD\website`** folder to `/home/vercbd/website`.

---

## Step 2: Configure Node.js Application in cPanel

1. Log in to your cPanel Dashboard (`https://www.vercbd.org:2083`).
2. In the search box at the top, type: **`Node.js`** and click **"Setup Node.js App"** (under the **Software** section).
3. Click the blue **"Create Application"** button.
4. Fill in the application settings:
   - **Node.js version**: Select **`20.x`** (or **`18.x`**).
   - **Application mode**: Select **`Production`**.
   - **Application root**: Type **`website`** (matches `/home/vercbd/website`).
   - **Application URL**: Select your primary domain (**`vercbd.org`** or `www.vercbd.org`, or a subdomain like `new.vercbd.org`).
   - **Application startup file**: Type **`server.js`**.
5. Click **"Create"** at the top right.

---

## Step 3: Set Environment Variables (ENV Setup)

On the same **Setup Node.js App** page, scroll down to the **"Environment variables"** section:

1. Click **"Add Variable"**:
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - Click *Done*.

2. Click **"Add Variable"**:
   - **Name**: `PORT`
   - **Value**: `3000`
   - Click *Done*.

3. Click **"Add Variable"** *(Optional, for AI Chatbot)*:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: *(Your Google Gemini API Key)*
   - Click *Done*.

4. Click **"Add Variable"** *(Optional)*:
   - **Name**: `GEMINI_MODEL`
   - **Value**: `gemini-1.5-flash`
   - Click *Done*.

*(Alternatively, you can edit the `.env` file directly inside `/home/vercbd/website/.env` in cPanel File Manager).*

---

## Step 4: Install Production Dependencies

On the **Setup Node.js App** page:

1. You will see a button labeled **"Run NPM Install"**. Click it!
   - cPanel will automatically install the production dependencies into `/home/vercbd/website/node_modules`.
   - Wait 1-2 minutes until you see the green success message.

*(If your cPanel has the **Terminal** feature enabled under Advanced, you can also open Terminal and run:*
```bash
cd /home/vercbd/website
npm install --omit=dev
```
*)*

---

## Step 5: Start & Verify the Website

1. At the top of the **Setup Node.js App** page, click the **"Restart"** button (or **"Start Application"**).
2. Click the link next to **"Open"** or navigate in your browser to:
   👉 **`https://www.vercbd.org`** (or your configured URL)
3. Access your Admin Panel at:
   👉 **`https://www.vercbd.org/admin`**
4. Access your Careers Portal at:
   👉 **`https://www.vercbd.org/careers`**

---

## Troubleshooting & Tips

- **If you see "Application is not running" or 503 error**:
  - Make sure you clicked **"Run NPM Install"**.
  - Check the log file located at `/home/vercbd/website/stderr.log` in cPanel File Manager to see any specific error messages.
- **Port Conflict**:
  - CloudLinux Phusion Passenger assigns a dynamic internal port automatically through the socket; you don't need to manually configure port forwarding.
- **Permissions**:
  - Ensure `/home/vercbd/website` permissions are set to `0755` and files are `0644`.
