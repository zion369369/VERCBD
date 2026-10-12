"use client";

import React, { useRef } from "react";
import { 
  Printer, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Briefcase, 
  FileText, 
  Sparkles, 
  Users, 
  Layers, 
  Settings, 
  KeyRound, 
  Heart, 
  MessageSquare, 
  ExternalLink,
  Info,
  Compass,
  ArrowRight
} from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AdminManualPage() {
  const { siteSettings, primaryColor, theme } = useContent();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar - Hidden on Print */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181824] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
            <BookOpen size={16} />
            <span>Official Administrator Documentation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Admin Operations Manual & Guide
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            Section-by-section master reference for managing and updating every frontend page of VERCBD.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            style={{ backgroundColor: primaryColor }}
            className="px-6 py-3 rounded-2xl text-white text-xs font-black flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <Printer size={16} />
            <span>Export as PDF / Print Handbook</span>
          </button>
        </div>
      </div>

      {/* PRINT STYLING & DOCUMENT CONTAINER */}
      <div className="bg-white dark:bg-[#181824] p-8 sm:p-14 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xs print:shadow-none print:border-none print:p-0 text-gray-900 dark:text-gray-100 font-sans manual-printable">
        
        {/* Document Cover / Header */}
        <div className="border-b-2 border-gray-900 dark:border-white pb-8 mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={siteSettings.logoUrl || "/assets/logo.png"}
                alt="VERC Logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                  Village Education Resource Center (VERC)
                </h2>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Enterprise Content Management System • Operator Handbook
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-gray-400 font-bold hidden sm:block">
              <div>Version 3.4 (Production)</div>
              <div>Last Updated: September 2026</div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <span>
              <strong>100% Frontend Controllable:</strong> Every text block, certification, annual report, program, microfinance scheme, job opening, media asset, and impact metric on the public website is wired directly to this Admin Portal.
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
            Table of Contents (Section-Wise)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs font-bold text-gray-700 dark:text-gray-300">
            <div>1. Dashboard & Live Analytics Overview</div>
            <div>6. Leadership & Senior Staff Management</div>
            <div>2. About Us CMS (Legal, Reports, Awards, Organogram)</div>
            <div>7. Media Gallery & Video Collections</div>
            <div>3. Careers & Recruitment Hub (PDF Resume Downloads)</div>
            <div>8. News Articles & Success Story Narratives</div>
            <div>4. Microfinance CMS (Loan Products & 4-Step Process)</div>
            <div>9. Community Inquiries & Grant Management</div>
            <div>5. Social Programs & Real-Time Impact Counters</div>
            <div>10. Live Theme Styling & User Role Permissions</div>
          </div>
        </div>

        {/* SECTION 1 */}
        <div className="space-y-6 mb-14 page-break-after">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 1</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard & Live Operations Hub (`/admin`)
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            The central cockpit of the VERC management portal provides an instantaneous snapshot of organizational metrics and pending actions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Live Dhaka Time & Clock Isolation</strong>
              <p className="text-gray-500 leading-relaxed">
                The top-right live clock runs inside a dedicated memoized thread. It maintains real-time Bangladesh Standard Time without triggering expensive whole-page re-renders, guaranteeing smooth 60fps performance.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Key Performance Indicators (KPIs)</strong>
              <p className="text-gray-500 leading-relaxed">
                Real-time tracking of Active Programs, Total Beneficiaries Served (32M+), Branch Offices (100+), and Unread Public Inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-6 mb-14 page-break-after">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 2</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            About Us CMS Hub (`/admin/about`)
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            Controls all sub-pages under the "About Us" dropdown on the public website. Divided into 5 specialized tabs:
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">1. Legal Status & Certifications (`/about/legal`)</strong>
              <p className="text-gray-500 leading-relaxed mb-2">
                Click <strong>"Add Certificate"</strong> to register new government licenses. Enter the License Title (e.g. NGO Affairs Bureau, Microcredit Regulatory Authority), Regulatory Authority, Registration Number, Validity Status (Active / Expired), and Document Verification URL.
              </p>
              <div className="text-[11px] text-brand-primary font-bold">Public Impact: Directly powers the interactive verification table and official registry links on `/about/legal`.</div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">2. Annual Reports & Financial Statements (`/about/annual-report`)</strong>
              <p className="text-gray-500 leading-relaxed mb-2">
                Publish audited reports by clicking <strong>"Upload Annual Report"</strong>. Enter the Fiscal Year (e.g. 2024-2025), Document Title, Executive Summary using the Rich Text Word Editor, PDF Download URL, File Size, and toggle "Feature on Top" for primary highlight cards.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">3. Institutional Awards & Honors (`/about/awards`)</strong>
              <p className="text-gray-500 leading-relaxed mb-2">
                Add national and international honors (e.g. Global Sanitation Pioneer, National Environment Award). Input Award Title, Conferring Body, Year, and the detailed citation narrative using the Rich Text Editor.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">4. Governance Organogram Node Builder (`/about/organogram`)</strong>
              <p className="text-gray-500 leading-relaxed mb-2">
                Dynamically build VERC's organizational hierarchy tree. Add roles (General Body, Executive Committee, Executive Director, Department Directors) and assign "Reports To" parent nodes.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">5. Vision, Mission & Official PDF Link (`/about`)</strong>
              <p className="text-gray-500 leading-relaxed mb-2">
                Directly edit VERC's institutional Vision and Mission statements using the Word-style editor. Update the link to the official downloadable governance PDF.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-6 mb-14 page-break-after">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 3</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Careers & Recruitment CMS (`/admin/careers`)
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            Complete end-to-end recruitment management system connecting the public job portal with administrative HR operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 space-y-2">
              <strong className="font-bold text-gray-900 dark:text-white block text-sm">Managing Job Circulars</strong>
              <ul className="space-y-1.5 text-gray-500">
                <li>• Click <strong>"Post New Job Opening"</strong> to create a circular.</li>
                <li>• <strong>Adding Custom Departments:</strong> Click <strong>"+ Add New Department"</strong> right above the Department dropdown (or select <em>"+ Add Custom Department..."</em>) to type any new department on the fly, or use the <strong>"Manage Departments"</strong> button in the header.</li>
                <li>• Enter Role Title, Location, and Job Type.</li>
                <li>• Set Application Deadline and Salary Range.</li>
                <li>• Use the <strong>Rich Text WYSIWYG Word Editor</strong> for Role Description.</li>
                <li>• Add dynamic bullet points for Responsibilities and Requirements.</li>
                <li>• Toggle between <strong>Active</strong> (visible on `/careers`) and <strong>Closed</strong>.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
              <strong className="font-bold text-gray-900 dark:text-white block text-sm">Reviewing CVs & Downloading Resumes</strong>
              <ul className="space-y-1.5 text-gray-600 dark:text-gray-400">
                <li>• Switch to the <strong>"Candidate Applications"</strong> tab.</li>
                <li>• View candidate Name, Position, Email, Phone, and Date.</li>
                <li>• Click <strong>"Download PDF"</strong> to instantly save the applicant's original PDF resume to your computer.</li>
                <li>• Click the view icon to read the candidate's Cover Letter and profile.</li>
                <li>• Update status: <strong>Pending ➔ Reviewed ➔ Shortlisted ➔ Rejected</strong>.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-6 mb-14 page-break-after">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 4</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Microfinance & Inclusive Finance CMS (`/admin/microfinance`)
          </h2>
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            Manage microcredit loan products, interest terms, and the 4-step borrower onboarding journey.
          </p>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">Loan Products Catalog (`/microfinance`, `/microfinance/products`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Add and configure loan offerings (Jagoron for small trades, Agrosor for micro-enterprises, Buniad for extreme poor, Sufolon for agriculture). Specify maximum loan ceilings (e.g. BDT 15,00,000), interest rates (%), grace periods, target beneficiaries, and product photos.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="text-sm font-bold text-gray-900 dark:text-white block mb-1">4-Step Application Journey Editor (`/microfinance/process`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Customize Step 1 (Group Formation), Step 2 (Eligibility Assessment), Step 3 (Documentation), and Step 4 (Loan Disbursement). Edit durations (e.g. 7-14 Days, 24-48 Hours, Same Day) and dynamic requirement bullet points.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 5 & 6 */}
        <div className="space-y-6 mb-14 page-break-after">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 5 & 6</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Social Programs, Metrics & Leadership
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Programs (`/admin/programs`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Create and edit initiatives across WASH, Health & Nutrition, Life Skills Education, Climate Resilience, and Disaster Management. Use the Rich Text Editor for detailed project narratives.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Impact Counters (`/admin/impact`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Update verified impact counters (e.g. 32M+ Lives Impacted, 64 Districts, 100K+ Water Points). Replays automatically with high-speed counting whenever visitors view the section.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Leadership Tiers (`/admin/team`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Assign team members to <strong>Executive</strong> (Executive Director, Deputy ED) or <strong>Director</strong> (HR, Finance, Microfinance) tiers. Automatically organizes them cleanly on `/about/staff`.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Branch Network (`/admin/branches`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Manage branch offices across Dhaka, Chattogram, Rajshahi, Khulna, Sylhet, Rangpur, Mymensingh, and Barishal divisions with phone numbers and map coordinates.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7 & 8 */}
        <div className="space-y-6 mb-14">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider">
            <span>Section 7, 8 & 9</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Media, Stories, Inquiries & Global Settings
          </h2>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Media Gallery & News Stories (`/admin/gallery`, `/admin/news`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Upload field photography, press releases, and community success stories. Format story content with rich bold headings, quotes, and links.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Public Inquiries (`/admin/messages`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Incoming messages submitted via the public Contact Us form arrive here with unread counters on the admin sidebar. Mark as Reviewed or Archived.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
              <strong className="font-bold text-gray-900 dark:text-white block mb-1">Branding & Dynamic Theme (`/admin/settings`)</strong>
              <p className="text-gray-500 leading-relaxed">
                Use the interactive <strong>Theme Color Picker</strong> to update the organization's primary accent color (VERC Classic Blue, Forest Green, Vibrant Teal, Deep Navy). The chosen color updates instantaneously across all buttons, badges, and headers site-wide.
              </p>
            </div>
          </div>
        </div>

        {/* Sign-Off Footer */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center text-xs text-gray-400 space-y-2">
          <p className="font-bold text-gray-900 dark:text-white">
            Village Education Resource Center (VERC) • Information Technology & Management Division
          </p>
          <p>
            VERC Complex, Anandapur, Savar, Dhaka-1340, Bangladesh • Hotline: +880 1711-543210 • Email: info@vercbd.org
          </p>
        </div>
      </div>

      {/* PRINT MEDIA STYLES */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          aside, header, nav, .no-print {
            display: none !important;
          }
          .manual-printable {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .page-break-after {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
}
