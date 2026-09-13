"use client";

import React, { useState, useRef } from "react";
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  KeyRound, 
  FileSpreadsheet, 
  UploadCloud, 
  Download, 
  Search, 
  Filter, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  Lock, 
  ShieldAlert, 
  Sparkles, 
  RefreshCw,
  Layers,
  FileCheck,
  ChevronRight
} from "lucide-react";
import * as XLSX from "xlsx";
import { useAuth, ALL_ADMIN_MODULES, AdminUser, Role } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function UserManagementPage() {
  const { 
    currentUser, 
    users, 
    roles, 
    addUser, 
    bulkAddUsers, 
    updateUser, 
    deleteUser, 
    toggleUserStatus, 
    changePassword, 
    adminResetPassword,
    addRole,
    updateRole,
    deleteRole
  } = useAuth();

  const { theme, primaryColor } = useContent();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<"directory" | "manual" | "excel" | "roles">("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Notifications
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const showError = (msg: string) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(""), 4500);
  };

  // Modals state
  const [changePassModalOpen, setChangePassModalOpen] = useState(false);
  const [myCurrentPass, setMyCurrentPass] = useState("");
  const [myNewPass, setMyNewPass] = useState("");
  const [myConfirmPass, setMyConfirmPass] = useState("");

  const [resetUserPassModalOpen, setResetUserPassModalOpen] = useState(false);
  const [selectedUserForReset, setSelectedUserForReset] = useState<AdminUser | null>(null);
  const [adminAssignedPass, setAdminAssignedPass] = useState("");

  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roleFormName, setRoleFormName] = useState("");
  const [roleFormDesc, setRoleFormDesc] = useState("");
  const [roleFormPaths, setRoleFormPaths] = useState<string[]>([]);

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    roleId: roles[0]?.id || "role-superadmin",
    password: "",
    confirmPassword: "",
    status: "Active" as "Active" | "Suspended"
  });

  // Excel Bulk State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [parsedRows, setParsedRows] = useState<Array<{
    fullName: string;
    username: string;
    email: string;
    roleName: string;
    password?: string;
    phone?: string;
    isValid: boolean;
    reason?: string;
  }>>([]);
  const [importStats, setImportStats] = useState<{ total: number; valid: number; invalid: number } | null>(null);

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      u.fullName.toLowerCase().includes(q) || 
      u.username.toLowerCase().includes(q) || 
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q));

    const matchesRole = roleFilter === "all" || u.roleId === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handlers
  const handleMyPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (myNewPass !== myConfirmPass) {
      showError("New passwords do not match.");
      return;
    }
    const res = changePassword(currentUser.id, myCurrentPass, myNewPass);
    if (res.success) {
      showSuccess("Your password was updated successfully!");
      setChangePassModalOpen(false);
      setMyCurrentPass("");
      setMyNewPass("");
      setMyConfirmPass("");
    } else {
      showError(res.message || "Failed to update password.");
    }
  };

  const handleAdminResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset) return;
    const res = adminResetPassword(selectedUserForReset.id, adminAssignedPass);
    if (res.success) {
      showSuccess(`Password for "${selectedUserForReset.username}" reset successfully!`);
      setResetUserPassModalOpen(false);
      setSelectedUserForReset(null);
      setAdminAssignedPass("");
    } else {
      showError(res.message || "Failed to reset user password.");
    }
  };

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualForm.password !== manualForm.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }
    const selectedRole = roles.find(r => r.id === manualForm.roleId) || roles[0];
    const res = addUser({
      fullName: manualForm.fullName,
      username: manualForm.username,
      email: manualForm.email,
      phone: manualForm.phone,
      roleId: selectedRole.id,
      roleName: selectedRole.name,
      password: manualForm.password,
      status: manualForm.status
    });

    if (res.success) {
      showSuccess(`Staff user "${manualForm.username}" successfully created!`);
      setManualForm({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        roleId: roles[0]?.id || "role-superadmin",
        password: "",
        confirmPassword: "",
        status: "Active"
      });
      setActiveTab("directory");
    } else {
      showError(res.message || "Failed to create user.");
    }
  };

  // Excel / CSV File Parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const rawJson: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

        if (!rawJson || rawJson.length === 0) {
          showError("Uploaded spreadsheet contains no data rows.");
          return;
        }

        const existingUsernames = new Set(users.map(u => u.username.toLowerCase()));
        const existingEmails = new Set(users.map(u => u.email.toLowerCase()));

        let validCount = 0;
        let invalidCount = 0;

        const evaluated = rawJson.map((row) => {
          const fullName = String(row["Full Name"] || row["fullName"] || row["Name"] || "").trim();
          const username = String(row["Username"] || row["username"] || "").trim();
          const email = String(row["Email"] || row["email"] || "").trim().toLowerCase();
          const roleName = String(row["Role"] || row["roleName"] || row["Role Name"] || "Program Director").trim();
          const phone = String(row["Phone"] || row["phone"] || "").trim();
          const password = String(row["Password"] || row["password"] || "vercUser2026").trim();

          let isValid = true;
          let reason = "";

          if (!username) {
            isValid = false;
            reason = "Missing username";
          } else if (!email || !email.includes("@")) {
            isValid = false;
            reason = "Invalid email";
          } else if (existingUsernames.has(username.toLowerCase())) {
            isValid = false;
            reason = "Username already exists";
          } else if (existingEmails.has(email)) {
            isValid = false;
            reason = "Email already exists";
          }

          if (isValid) {
            validCount++;
            existingUsernames.add(username.toLowerCase());
            existingEmails.add(email);
          } else {
            invalidCount++;
          }

          return { fullName, username, email, roleName, phone, password, isValid, reason };
        });

        setParsedRows(evaluated);
        setImportStats({ total: evaluated.length, valid: validCount, invalid: invalidCount });
        showSuccess(`Spreadsheet parsed: ${validCount} valid row(s) detected.`);
      } catch (err) {
        console.error("Error reading file:", err);
        showError("Could not parse file. Please upload a valid .xlsx, .xls, or .csv file.");
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleConfirmBulkImport = () => {
    const validRows = parsedRows.filter(r => r.isValid);
    if (validRows.length === 0) {
      showError("No valid rows to import.");
      return;
    }

    const res = bulkAddUsers(validRows);
    showSuccess(`Successfully imported ${res.successCount} staff account(s)!`);
    setParsedRows([]);
    setImportStats(null);
    setUploadedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setActiveTab("directory");
  };

  // Download Excel / CSV Sample Template
  const handleDownloadTemplate = (format: "xlsx" | "csv") => {
    const sampleData = [
      {
        "Full Name": "Kazi Nazrul Islam",
        "Username": "nazrul.wash",
        "Email": "nazrul.wash@vercbd.org",
        "Role": "Program Director",
        "Phone": "+880 1711-223344",
        "Password": "vercUser2026"
      },
      {
        "Full Name": "Rokeya Begum",
        "Username": "rokeya.edu",
        "Email": "rokeya.edu@vercbd.org",
        "Role": "Communications & Advocacy Lead",
        "Phone": "+880 1819-334455",
        "Password": "vercUser2026"
      },
      {
        "Full Name": "Shafiqul Alam",
        "Username": "shafiq.accounts",
        "Email": "shafiq.accounts@vercbd.org",
        "Role": "Finance & Accounts Officer",
        "Phone": "+880 1912-778899",
        "Password": "vercUser2026"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "VERC Staff Import");

    if (format === "xlsx") {
      XLSX.writeFile(wb, "VERC_Staff_Import_Template.xlsx");
    } else {
      XLSX.writeFile(wb, "VERC_Staff_Import_Template.csv");
    }
  };

  // Role Designer Handlers
  const handleOpenRoleModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setRoleFormName(role.name);
      setRoleFormDesc(role.description);
      setRoleFormPaths([...role.allowedPaths]);
    } else {
      setEditingRole(null);
      setRoleFormName("");
      setRoleFormDesc("");
      setRoleFormPaths(["/admin"]);
    }
    setRoleModalOpen(true);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleFormName.trim()) {
      showError("Role name is required.");
      return;
    }
    if (roleFormPaths.length === 0) {
      showError("Please grant at least one admin module permission.");
      return;
    }

    if (editingRole) {
      const res = updateRole(editingRole.id, {
        name: roleFormName.trim(),
        description: roleFormDesc.trim(),
        allowedPaths: roleFormPaths
      });
      if (res.success) {
        showSuccess(`Role "${roleFormName}" updated successfully!`);
        setRoleModalOpen(false);
      } else {
        showError(res.message || "Failed to update role.");
      }
    } else {
      const res = addRole({
        name: roleFormName.trim(),
        description: roleFormDesc.trim(),
        allowedPaths: roleFormPaths
      });
      if (res.success) {
        showSuccess(`New Role "${roleFormName}" created with custom RBAC permissions!`);
        setRoleModalOpen(false);
      } else {
        showError(res.message || "Failed to create role.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Toast Notifications */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}
      {errorToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-rose-600 text-white font-bold text-xs shadow-2xl flex items-center gap-3 animate-slide-up">
          <AlertCircle size={18} />
          <span>{errorToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
              <ShieldCheck size={24} style={{ color: primaryColor }} />
              <span>User Management & Roles</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setChangePassModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
            >
              <KeyRound size={14} style={{ color: primaryColor }} />
              <span>Change My Password</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserPlus size={14} />
              <span>Add Staff User</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-gray-100 dark:border-white/5 overflow-x-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("directory")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "directory"
                ? "text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
            style={activeTab === "directory" ? { backgroundColor: primaryColor } : {}}
          >
            <Users size={14} />
            <span>Staff Directory ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "manual"
                ? "text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
            style={activeTab === "manual" ? { backgroundColor: primaryColor } : {}}
          >
            <UserPlus size={14} />
            <span>Manual User Creation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("excel")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "excel"
                ? "text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
            style={activeTab === "excel" ? { backgroundColor: primaryColor } : {}}
          >
            <FileSpreadsheet size={14} />
            <span>Excel / CSV Bulk Import</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "roles"
                ? "text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
            style={activeTab === "roles" ? { backgroundColor: primaryColor } : {}}
          >
            <Layers size={14} />
            <span>Role Creation & RBAC Matrix ({roles.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: USERS DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-xs"
          }`}>
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, username, email..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none font-medium text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none font-semibold text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Assigned Roles</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 outline-none font-semibold text-gray-700 dark:text-gray-300"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className={`rounded-3xl border overflow-hidden ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-gray-100 dark:border-white/5 text-xs font-bold text-gray-400 bg-gray-50/50 dark:bg-white/5">
                  <tr>
                    <th className="py-3.5 px-6">Authorized Staff Member</th>
                    <th className="py-3.5 px-4">Username & Email</th>
                    <th className="py-3.5 px-4">Role & RBAC Profile</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Last Activity</th>
                    <th className="py-3.5 px-6 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 font-semibold">
                        No staff members matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const isSuper = user.username.toLowerCase() === "superadmin.verc";
                      return (
                        <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs text-white flex-shrink-0 shadow-xs"
                                style={{ backgroundColor: isSuper ? primaryColor : "#4B5563" }}
                              >
                                {user.fullName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-extrabold text-gray-900 dark:text-white flex items-center gap-1.5">
                                  <span>{user.fullName}</span>
                                  {isSuper && (
                                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 uppercase">
                                      Root
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-400 font-mono">
                                  {user.phone || "No phone listed"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-mono font-bold text-gray-800 dark:text-gray-200 text-xs">
                              @{user.username}
                            </div>
                            <div className="text-xs text-gray-400 truncate max-w-[180px]">
                              {user.email}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span 
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold"
                              style={{ 
                                backgroundColor: isSuper ? `${primaryColor}20` : "rgba(107, 114, 128, 0.15)",
                                color: isSuper ? primaryColor : "inherit"
                              }}
                            >
                              <ShieldCheck size={12} />
                              <span>{user.roleName}</span>
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <button
                              type="button"
                              disabled={isSuper}
                              onClick={() => toggleUserStatus(user.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                                user.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                              } ${isSuper ? "cursor-default" : "cursor-pointer hover:opacity-80"}`}
                              title={isSuper ? "Superadmin cannot be suspended" : "Click to toggle status"}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                              <span>{user.status}</span>
                            </button>
                          </td>

                          <td className="py-4 px-4 text-xs text-gray-400">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Reset Password Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUserForReset(user);
                                  setAdminAssignedPass("");
                                  setResetUserPassModalOpen(true);
                                }}
                                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                title="Reset User Password"
                              >
                                <KeyRound size={15} />
                              </button>

                              {/* Edit User Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingUser(user);
                                  setEditUserModalOpen(true);
                                }}
                                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                title="Edit User Details"
                              >
                                <Edit2 size={15} />
                              </button>

                              {/* Delete User Button */}
                              <button
                                type="button"
                                disabled={isSuper}
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
                                    const res = deleteUser(user.id);
                                    if (res.success) {
                                      showSuccess(`User "${user.username}" deleted.`);
                                    } else {
                                      showError(res.message || "Cannot delete user.");
                                    }
                                  }
                                }}
                                className={`p-2 rounded-xl transition-colors ${
                                  isSuper 
                                    ? "text-gray-300 dark:text-gray-700 cursor-not-allowed" 
                                    : "text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                }`}
                                title={isSuper ? "Superadmin cannot be deleted" : "Delete User"}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL USER ADDITION */}
      {activeTab === "manual" && (
        <div className={`p-6 sm:p-8 rounded-3xl border max-w-2xl mx-auto ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="mb-6 pb-4 border-b border-gray-100 dark:border-white/5">
            <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <UserPlus size={18} style={{ color: primaryColor }} />
              <span>Create New Staff Account</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Add individual NGO officers with role-specific menu permissions and initial credentials.
            </p>
          </div>

          <form onSubmit={handleManualAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  placeholder="e.g. Dr. Mahfuzur Rahman"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Username <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.username}
                  onChange={(e) => setManualForm({ ...manualForm, username: e.target.value })}
                  placeholder="e.g. mahfuz.director"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono font-bold outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Official Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  placeholder="e.g. mahfuz@vercbd.org"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={manualForm.phone}
                  onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                  placeholder="+880 1711-XXXXXX"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Assigned NGO Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={manualForm.roleId}
                  onChange={(e) => setManualForm({ ...manualForm, roleId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold outline-none text-gray-900 dark:text-white"
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.allowedPaths.length} modules)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Initial Account Status
                </label>
                <select
                  value={manualForm.status}
                  onChange={(e) => setManualForm({ ...manualForm, status: e.target.value as "Active" | "Suspended" })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold outline-none text-gray-900 dark:text-white"
                >
                  <option value="Active">Active (Immediate Login Enabled)</option>
                  <option value="Suspended">Suspended (Access Temporarily Blocked)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Initial Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={manualForm.password}
                  onChange={(e) => setManualForm({ ...manualForm, password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={manualForm.confirmPassword}
                  onChange={(e) => setManualForm({ ...manualForm, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => setActiveTab("directory")}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: primaryColor }}
                className="px-6 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Check size={14} />
                <span>Save Staff Account</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: EXCEL / CSV BULK IMPORT */}
      {activeTab === "excel" && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Instructions & Template Downloads */}
          <div className={`p-6 rounded-3xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div>
              <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet size={18} style={{ color: primaryColor }} />
                <span>Spreadsheet Template Specification</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload .xlsx, .xls, or .csv with columns: <span className="font-mono font-bold text-gray-700 dark:text-gray-300">Full Name, Username, Email, Role, Phone, Password</span>.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleDownloadTemplate("xlsx")}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer shadow-xs"
              >
                <Download size={14} />
                <span>Download .XLSX Template</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadTemplate("csv")}
                className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shadow-xs"
              >
                <Download size={14} />
                <span>Download .CSV Template</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Dropzone */}
          <div className={`p-8 rounded-3xl border-2 border-dashed text-center transition-all ${
            theme === "dark" ? "border-white/10 hover:border-white/20 bg-[#1A1926]/50" : "border-gray-200 hover:border-gray-300 bg-white"
          }`}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="hidden"
              id="bulk-file-input"
            />
            <label htmlFor="bulk-file-input" className="cursor-pointer flex flex-col items-center justify-center space-y-3">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                <UploadCloud size={28} />
              </div>
              <div className="font-extrabold text-sm text-gray-900 dark:text-white">
                {uploadedFileName ? uploadedFileName : "Click to select or drag spreadsheet here"}
              </div>
              <p className="text-xs text-gray-400 font-medium max-w-sm">
                Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv). Data is validated in-browser before committing.
              </p>
            </label>
          </div>

          {/* Parsed Rows Preview */}
          {parsedRows.length > 0 && importStats && (
            <div className={`p-6 rounded-3xl border space-y-4 ${
              theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-100 dark:border-white/5">
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                    Spreadsheet Import Preview ({parsedRows.length} Rows)
                  </h4>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} /> {importStats.valid} Ready to Import
                    </span>
                    {importStats.invalid > 0 && (
                      <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                        <AlertCircle size={13} /> {importStats.invalid} Invalid / Duplicate
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={importStats.valid === 0}
                  onClick={handleConfirmBulkImport}
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-2"
                >
                  <Check size={15} />
                  <span>Import {importStats.valid} Valid Staff Members</span>
                </button>
              </div>

              <div className="overflow-x-auto max-h-80 custom-scrollbar border border-gray-100 dark:border-white/5 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-white/5 text-xs font-semibold text-gray-400 uppercase sticky top-0">
                    <tr>
                      <th className="p-3">Status</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Username</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Validation Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {parsedRows.map((row, i) => (
                      <tr key={i} className={row.isValid ? "" : "bg-rose-50/50 dark:bg-rose-950/20"}>
                        <td className="p-3">
                          {row.isValid ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                              <CheckCircle2 size={13} /> Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-500">
                              <X size={13} /> Rejected
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">{row.fullName}</td>
                        <td className="p-3 font-mono text-gray-600 dark:text-gray-300">@{row.username}</td>
                        <td className="p-3 text-gray-500">{row.email}</td>
                        <td className="p-3 font-bold text-gray-700 dark:text-gray-300">{row.roleName}</td>
                        <td className="p-3 text-xs font-medium text-rose-600 dark:text-rose-400">{row.reason || "OK"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ROLE CREATION & RBAC MATRIX */}
      {activeTab === "roles" && (
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Layers size={18} style={{ color: primaryColor }} />
                <span>Role-Based Access Control (RBAC) Definitions</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Define functional roles and designate exactly which admin modules and submenus each role is authorized to view and execute.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenRoleModal()}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Create Custom Role</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => {
              const assignedCount = users.filter(u => u.roleId === role.id).length;
              return (
                <div 
                  key={role.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                    theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                          {role.name}
                        </span>
                        {role.isSystem && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 uppercase tracking-wider">
                            System Role
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {assignedCount} staff member(s)
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Modules Pills */}
                  <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-white/5">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Authorized Modules ({role.allowedPaths.length} / {ALL_ADMIN_MODULES.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                      {role.allowedPaths.map((p) => {
                        const mod = ALL_ADMIN_MODULES.find(m => m.path === p);
                        return (
                          <span 
                            key={p} 
                            className="px-2 py-0.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                          >
                            {mod?.name || p}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action footer */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => handleOpenRoleModal(role)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>Edit Permissions</span>
                    </button>

                    {!role.isSystem && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete role "${role.name}"?`)) {
                            const res = deleteRole(role.id);
                            if (res.success) {
                              showSuccess(`Role "${role.name}" removed.`);
                            } else {
                              showError(res.message || "Failed to delete role.");
                            }
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL: CHANGE MY PASSWORD */}
      {changePassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <KeyRound size={16} style={{ color: primaryColor }} />
                <span>Update Administrative Password</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setChangePassModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleMyPasswordChange} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={myCurrentPass}
                  onChange={(e) => setMyCurrentPass(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  New Password (Min 6 Characters)
                </label>
                <input
                  type="password"
                  required
                  value={myNewPass}
                  onChange={(e) => setMyNewPass(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={myConfirmPass}
                  onChange={(e) => setMyConfirmPass(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setChangePassModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADMIN RESET USER PASSWORD */}
      {resetUserPassModalOpen && selectedUserForReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <KeyRound size={16} style={{ color: primaryColor }} />
                  <span>Reset Password for @{selectedUserForReset.username}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Assigned user: {selectedUserForReset.fullName}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setResetUserPassModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAdminResetPassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Assign New Password
                </label>
                <input
                  type="text"
                  required
                  value={adminAssignedPass}
                  onChange={(e) => setAdminAssignedPass(e.target.value)}
                  placeholder="e.g. vercReset2026!"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-mono outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setResetUserPassModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER DETAILS */}
      {editUserModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <Edit2 size={16} style={{ color: primaryColor }} />
                <span>Edit Staff Member Profile</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setEditUserModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editingUser.phone || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none"
                />
              </div>

              {editingUser.username.toLowerCase() !== "superadmin.verc" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={editingUser.roleId}
                    onChange={(e) => {
                      const sel = roles.find(r => r.id === e.target.value);
                      setEditingUser({
                        ...editingUser,
                        roleId: e.target.value,
                        roleName: sel?.name || editingUser.roleName
                      });
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold outline-none"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setEditUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const res = updateUser(editingUser.id, editingUser);
                    if (res.success) {
                      showSuccess(`User "${editingUser.username}" updated!`);
                      setEditUserModalOpen(false);
                    } else {
                      showError(res.message || "Failed to update user.");
                    }
                  }}
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ROLE DESIGNER & RBAC MATRIX */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-5 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <div>
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <ShieldCheck size={18} style={{ color: primaryColor }} />
                  <span>{editingRole ? `Edit Role: ${editingRole.name}` : "Create New Custom NGO Role"}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Configure role information and select authorized admin modules and submenus.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setRoleModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRole} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Role Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={editingRole?.isSystem}
                    value={roleFormName}
                    onChange={(e) => setRoleFormName(e.target.value)}
                    placeholder="e.g. WaSH Program Coordinator"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Description & Responsibility
                  </label>
                  <input
                    type="text"
                    value={roleFormDesc}
                    onChange={(e) => setRoleFormDesc(e.target.value)}
                    placeholder="Operational scope of this role"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-none"
                  />
                </div>
              </div>

              {/* Modules Checkbox Matrix */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Role Menu / Submenu Permission Matrix
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRoleFormPaths(ALL_ADMIN_MODULES.map(m => m.path))}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">•</span>
                    <button
                      type="button"
                      onClick={() => setRoleFormPaths(["/admin"])}
                      className="text-xs font-semibold text-gray-500 hover:underline cursor-pointer"
                    >
                      Deselect All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto custom-scrollbar p-1">
                  {ALL_ADMIN_MODULES.map((mod) => {
                    const isChecked = roleFormPaths.includes(mod.path);
                    return (
                      <label
                        key={mod.id}
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-white/5 font-semibold"
                            : "border-gray-200 dark:border-white/10 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setRoleFormPaths(prev => prev.filter(p => p !== mod.path));
                            } else {
                              setRoleFormPaths(prev => [...prev, mod.path]);
                            }
                          }}
                          className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 dark:text-white flex items-center justify-between">
                            <span>{mod.name}</span>
                            <span className="text-xs font-mono text-gray-400">{mod.path}</span>
                          </div>
                          <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                            {mod.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2 rounded-xl text-white text-xs font-extrabold shadow-md hover:opacity-95 cursor-pointer flex items-center gap-2"
                >
                  <Check size={14} />
                  <span>Save Role Definition</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
