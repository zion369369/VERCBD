# Village Education Resource Center (VERC)
## Enterprise Admin Portal & CMS — Section-Wise Operator's Manual

> **Official Operating Guide**: This manual documents how every public page and section of the VERCBD website is managed, updated, and controlled through the Admin Portal (`/admin`).

---

## Confirmation of 100% Frontend Controllability

| Frontend Page | Admin CMS Section | Controllable Content & Operations |
| :--- | :--- | :--- |
| **Home Page (`/`)** | `/admin/hero`, `/admin/impact`, `/admin/settings` | Hero banner slides, headline typography, CTA links, 4 live impact counters, logo, brand theme color palette. |
| **About Us: Legal Status (`/about/legal`)** | `/admin/about` (Tab 1) | Create, edit, and delete government registration certificates (NGOAB, MRA, Social Welfare), license numbers, active/expired validity, and verification PDF links. |
| **About Us: Annual Reports (`/about/annual-report`)** | `/admin/about` (Tab 2) | Publish yearly audited reports, fiscal year tags, executive summaries (via Word-style Rich Text Editor), PDF download links, and "Featured" top highlights. |
| **About Us: Awards & Honors (`/about/awards`)** | `/admin/about` (Tab 3) | Publish national and global citations, conferring bodies, years, and detailed honor narratives. |
| **About Us: Organogram (`/about/organogram`)** | `/admin/about` (Tab 4) | Build the hierarchical organizational tree: add titles, roles, departments, direct report counts, and parent node associations. |
| **About Us: Purpose (`/about`)** | `/admin/about` (Tab 5) | Edit official Vision and Mission statements and update the governance PDF link. |
| **Leadership & Staff (`/about/staff`)** | `/admin/team` | Add team members with tier classification (`Executive`, `Director`, `Senior`, `Staff`). Automatically categorizes members into Executive Leadership vs. Functional Directors. |
| **Public Careers Portal (`/careers`)** | `/admin/careers` | Post job circulars with Word-style Rich Text descriptions, track candidates, and **download original candidate PDF resumes**. |
| **Microfinance Overview (`/microfinance`)** | `/admin/microfinance` (Tab 1) | Manage loan products (Jagoron, Agrosor, Buniad, Sufolon), ceilings (BDT), interest rates, terms, and target demographics. |
| **Microfinance Process (`/microfinance/process`)** | `/admin/microfinance` (Tab 2) | Customize the 4 application steps (Group Formation, Assessment, Verification, Disbursement), durations, and dynamic requirements checklist. |
| **Social Programs (`/programs/*`)** | `/admin/programs` | Full CRUD for WASH, Health & Nutrition, Education, Climate Resilience, and Disaster Management. |
| **Media Gallery (`/resources/gallery`)** | `/admin/gallery` | Upload and categorize field photography and project videos. |
| **Branch Network (`/resources/branches`)** | `/admin/branches` | Manage 100+ branch locations across all 8 divisions of Bangladesh with phone contacts and coordinates. |
| **News & Stories (`/news`)** | `/admin/news` | Publish press releases and long-form community success narratives with the Rich Text Editor. |
| **Contact Us (`/contact`)** | `/admin/messages` | Public contact submissions appear in real time with unread badge counters on the admin sidebar. |
| **Site Settings & Branding** | `/admin/settings` | Live theme color picker, hotlines, emails, address, and social links. |

---

## Section-by-Section Operational Guide

### Section 1: Dashboard (`/admin`)
* **Live Dhaka Clock**: Runs in an isolated thread to maintain real-time Bangladesh Standard Time without triggering re-renders of the dashboard charts.
* **Quick Access Hub**: Click on any shortcut tile to jump directly to About Us, Microfinance, Careers, Programs, or Media.

### Section 2: About Us CMS (`/admin/about`)
1. **Legal Status (`/about/legal`)**:
   - Click **"Add Certificate"**.
   - Enter Title (e.g. *Microcredit Regulatory Authority (MRA)*), Authority, Registration No., Status (*Active & Verified*), and official verification link.
   - Click Save to publish.
2. **Annual Reports (`/about/annual-report`)**:
   - Click **"Upload Annual Report"**.
   - Input Year (e.g. *2024 - 2025*), Report Title, Executive Summary, PDF Download URL, and File Size.
   - Check **"Feature on Top"** to pin it as the primary hero report.
3. **Awards & Honors (`/about/awards`)**:
   - Click **"Add Award"**.
   - Enter Award Title, Conferring Organization (e.g. *WaterAid International*), Year, and the detailed citation narrative.
4. **Organogram Builder (`/about/organogram`)**:
   - Add nodes defining the governance hierarchy (General Body ➔ Executive Committee ➔ Executive Director ➔ Functional Directors).

### Section 3: Careers & Recruitment CMS (`/admin/careers`)
1. **Posting a Job Opening**:
   - Click **"Post New Job Opening"**.
   - Enter Job Title, Department, Location, Type (*Full-Time*, *Contract*, etc.), Application Deadline, and Salary.
   - Use the **Word-Style Rich Text Editor** to write the role description with headings, bold text, and bullet points.
   - Add dynamic requirements and responsibilities.
   - Status defaults to **Active** (visible on `/careers`).
2. **Reviewing Applications & Downloading PDF Resumes**:
   - Switch to the **"Candidate Applications"** tab.
   - View candidate name, email, phone number, and submission date.
   - Click **"Download PDF"** to immediately download the applicant's original PDF resume to your computer.
   - Click the eye icon to read their Cover Note and full profile.
   - Update candidate status (*Pending*, *Reviewed*, *Shortlisted*, *Rejected*).

### Section 4: Microfinance CMS (`/admin/microfinance`)
1. **Loan Products**:
   - Click **"Add Product"**.
   - Configure loan name, interest rate, maximum ceiling, duration, and target borrowers.
   - Use the Rich Text Editor to format product descriptions.
2. **Application Process & Eligibility**:
   - Switch to the **"Application Process & Eligibility"** tab.
   - Edit any of the 4 steps (Step title, processing duration, and requirements).
   - Edit the general eligibility criteria and mandatory documents list.

### Section 5: Social Programs (`/admin/programs`)
* Click **"Add Program"** to launch new initiatives.
* Enter Program Title, Category (*WASH*, *Health*, *Education*, etc.), and use the Rich Text Editor to outline program goals and community milestones.

### Section 6: Impact Metrics (`/admin/impact`)
* Edit the marquee statistics (*32M+ Lives Impacted*, *64 Districts Reached*, *100K+ Water Points Installed*, *350K+ Microfinance Borrowers*).
* Whenever a visitor scrolls into view on the homepage or impact page, the animated counter replays rapidly.

### Section 7: Exporting this Guide as PDF
* Navigate to **`/admin/manual`** in the Admin Portal.
* Click the top-right button: **"Export as PDF / Print Handbook"**.
* In the browser print dialog:
  - Destination: **Save as PDF**
  - Margins: **Default** or **Minimum**
  - Background graphics: **Checked**
* Click **Save** to produce an executive, paginated PDF ready to hand to your board, committee, or evaluator!
