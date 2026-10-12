# Automated GitHub to cPanel Live Website Deployment Setup

This setup connects your **`main`** branch on GitHub directly to your live website on cPanel.

Whenever you push any code change to GitHub:
```bash
git add .
git commit -m "update website"
git push origin main
```
GitHub Actions will automatically:
1. Spin up a cloud runner and install dependencies.
2. Build the optimized Next.js production bundle.
3. Upload the build and code directly to your cPanel `/home/vercbd/website/` folder.
4. Touch `tmp/restart.txt` so Phusion Passenger automatically reloads the live website.

---

## One-Time Setup (Takes ~2 Minutes)

### Step 1: Create a Dedicated FTP Account in cPanel (Recommended)
1. Log in to your **cPanel Dashboard** (`https://www.vercbd.org:2083`).
2. In the search bar at the top, type **`FTP`** and click **FTP Accounts** (under the **Files** section).
3. Fill in the new account details:
   - **Log in**: `deploy` (it will become `deploy@vercbd.org`)
   - **Password**: Choose or generate a strong password (copy it, you will need it in Step 2).
   - **Directory**: Set this to:
     ```text
     website
     ```
     *(If cPanel auto-fills `public_html/website`, erase `public_html/` and make sure it points to `website` or `/home/vercbd/website`).*
   - **Quota**: Select **Unlimited**.
4. Click **Create FTP Account**.

> **Note**: Alternatively, you can use your primary cPanel login username and password with server `vercbd.org` and directory `website/`.

---

### Step 2: Add GitHub Repository Secrets
1. Open your browser and go to your GitHub repository secrets page:
   👉 **`https://github.com/zion369369/VERCBD/settings/secrets/actions`**
2. Click the green button: **"New repository secret"**.
3. Add the following 3 secrets:

| Secret Name | Value | Example |
| :--- | :--- | :--- |
| **`CPANEL_FTP_SERVER`** | Your FTP server hostname or server IP | `ftp.vercbd.org` or `vercbd.org` |
| **`CPANEL_FTP_USERNAME`** | The FTP username | `deploy@vercbd.org` *(or your cPanel username)* |
| **`CPANEL_FTP_PASSWORD`** | The password you set in Step 1 | `YourSecurePassword123` |

*(Optional)* If you set the FTP directory in Step 1 directly to `/home/vercbd/website`, add a 4th secret:
- **Name**: `CPANEL_TARGET_DIR`
- **Value**: `/` *(or leave blank to use the default `website/`)*

---

### Step 3: Push Your Code to Trigger the First Automated Deploy

From your terminal in `D:\VERCBD`:
```bash
git add .
git commit -m "feat: setup automated cPanel deployment workflow and banner updates"
git push origin main
```

---

### Step 4: Watch Your Live Deployment
1. Go to your GitHub repository: 👉 **`https://github.com/zion369369/VERCBD/actions`**
2. You will see the **"Automated cPanel Deployment"** workflow running.
3. Click on it to see real-time logs:
   - ✔ Checkout Code
   - ✔ Setup Node.js 20.x
   - ✔ Install Frontend Dependencies
   - ✔ Build Next.js Production Bundle
   - ✔ Assemble Production Deployment Package
   - ✔ Deploy to cPanel via FTPS / FTP
4. Once it turns **Green (Success)**, open **`https://www.vercbd.org`** — your changes are live!

---

## How Passenger Auto-Restarts
CloudLinux Phusion Passenger continuously monitors the file `tmp/restart.txt` inside your application root. 
Our GitHub Actions workflow automatically touches this file on every deployment:
```bash
mkdir -p deploy-package/tmp
touch deploy-package/tmp/restart.txt
```
Passenger immediately detects the new timestamp and gracefully reloads the Node.js application. You **never** need to log into cPanel and click "Restart" manually anymore.
