"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface PermissionModule {
  id: string;
  name: string;
  path: string;
  description: string;
  category: "Core Operations" | "Programs & Impact" | "Communications & Field" | "Administration";
}

export const ALL_ADMIN_MODULES: PermissionModule[] = [
  { id: "overview", name: "Overview", path: "/admin", description: "Executive dashboard and key indicators.", category: "Core Operations" },
  { id: "donations", name: "Donations", path: "/admin/donations", description: "Grants, donations, and wire receipts.", category: "Core Operations" },
  { id: "programs", name: "Programs", path: "/admin/programs", description: "Core humanitarian initiatives.", category: "Programs & Impact" },
  { id: "impact", name: "Impact", path: "/admin/impact", description: "Community reach and progress.", category: "Programs & Impact" },
  { id: "news", name: "News & Stories", path: "/admin/news", description: "Articles and field stories.", category: "Communications & Field" },
  { id: "partners", name: "Partners", path: "/admin/partners", description: "Partner agencies and donors.", category: "Communications & Field" },
  { id: "microfinance", name: "Microfinance", path: "/admin/microfinance", description: "Credit portfolio and recovery.", category: "Programs & Impact" },
  { id: "branches", name: "Branches", path: "/admin/branches", description: "Branch offices directory.", category: "Communications & Field" },
  { id: "gallery", name: "Gallery", path: "/admin/gallery", description: "Photo and media library.", category: "Communications & Field" },
  { id: "team", name: "Team", path: "/admin/team", description: "Leadership and team members.", category: "Administration" },
  { id: "hero", name: "Banners", path: "/admin/hero", description: "Homepage slides and appeals.", category: "Communications & Field" },
  { id: "messages", name: "Inquiries", path: "/admin/messages", description: "Public messages and requests.", category: "Core Operations" },
  { id: "subscribers", name: "Supporters", path: "/admin/subscribers", description: "Newsletter subscribers list.", category: "Administration" },
  { id: "settings", name: "Settings", path: "/admin/settings", description: "Brand settings and site configuration.", category: "Administration" },
  { id: "users", name: "Users & Roles", path: "/admin/users", description: "User management, roles, and permissions.", category: "Administration" }
];

export interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean; // System roles cannot be deleted
  allowedPaths: string[]; // List of paths e.g. ["/admin", "/admin/programs", ...]
}

export interface AdminUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone?: string;
  roleId: string;
  roleName: string;
  password: string; // Plaintext for demonstration / local storage simulation
  status: "Active" | "Suspended";
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  currentUser: AdminUser | null;
  users: AdminUser[];
  roles: Role[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  hasPermission: (path: string) => boolean;
  getUserRole: (roleId: string) => Role | undefined;
  
  // User Management
  addUser: (userData: Omit<AdminUser, "id" | "createdAt">) => { success: boolean; message?: string; user?: AdminUser };
  bulkAddUsers: (usersArray: Array<{ fullName: string; username: string; email: string; roleName: string; password?: string; phone?: string }>) => { successCount: number; errors: string[] };
  updateUser: (id: string, userData: Partial<AdminUser>) => { success: boolean; message?: string };
  deleteUser: (id: string) => { success: boolean; message?: string };
  toggleUserStatus: (id: string) => void;
  
  // Password Control
  changePassword: (userId: string, currentPass: string, newPass: string) => { success: boolean; message?: string };
  adminResetPassword: (userId: string, newPass: string) => { success: boolean; message?: string };
  
  // Role Creation & RBAC Management
  addRole: (roleData: Omit<Role, "id" | "isSystem">) => { success: boolean; message?: string; role?: Role };
  updateRole: (id: string, roleData: Partial<Role>) => { success: boolean; message?: string };
  deleteRole: (id: string) => { success: boolean; message?: string };
}

const defaultRoles: Role[] = [
  {
    id: "role-superadmin",
    name: "Super Admin",
    description: "Unrestricted operational authority across all 15 NGO modules, financial controls, and security configurations.",
    isSystem: true,
    allowedPaths: ALL_ADMIN_MODULES.map(m => m.path)
  },
  {
    id: "role-director",
    name: "Program Director",
    description: "Oversees humanitarian programs, field impact, success stories, field branches, and documentary gallery.",
    isSystem: false,
    allowedPaths: ["/admin", "/admin/programs", "/admin/impact", "/admin/news", "/admin/gallery", "/admin/team", "/admin/branches", "/admin/messages"]
  },
  {
    id: "role-finance",
    name: "Finance & Accounts Officer",
    description: "Manages donor grants, donation reconciliation, microfinance portfolios, and NGO registry.",
    isSystem: false,
    allowedPaths: ["/admin", "/admin/donations", "/admin/microfinance", "/admin/settings"]
  },
  {
    id: "role-comms",
    name: "Communications & Advocacy Lead",
    description: "Directs humanitarian appeals, public news bulletins, documentary gallery, and supporter outreach.",
    isSystem: false,
    allowedPaths: ["/admin", "/admin/hero", "/admin/news", "/admin/gallery", "/admin/partners", "/admin/subscribers", "/admin/messages"]
  }
];

const defaultUsers: AdminUser[] = [
  {
    id: "user-superadmin",
    fullName: "Chief Executive (Superadmin)",
    username: "Superadmin.verc",
    email: "superadmin@vercbd.org",
    phone: "+880 1711-554433",
    roleId: "role-superadmin",
    roleName: "Super Admin",
    password: "superadmin123",
    status: "Active",
    createdAt: "1977-01-01T00:00:00Z",
    lastLogin: new Date().toISOString()
  },
  {
    id: "user-director",
    fullName: "Dr. Farzana Rahman",
    username: "director.wash",
    email: "farzana.wash@vercbd.org",
    phone: "+880 1712-112233",
    roleId: "role-director",
    roleName: "Program Director",
    password: "vercUser2026",
    status: "Active",
    createdAt: "2024-02-15T10:30:00Z",
    lastLogin: "2026-03-01T08:15:00Z"
  },
  {
    id: "user-finance",
    fullName: "Mohammad Tariqul Islam",
    username: "finance.head",
    email: "tariqul.finance@vercbd.org",
    phone: "+880 1819-445566",
    roleId: "role-finance",
    roleName: "Finance & Accounts Officer",
    password: "vercUser2026",
    status: "Active",
    createdAt: "2024-05-10T14:20:00Z",
    lastLogin: "2026-03-04T11:45:00Z"
  }
];

const STORAGE_USERS = "vercbd_auth_users_v2";
const STORAGE_ROLES = "vercbd_auth_roles_v2";
const STORAGE_CURRENT_USER = "vercbd_auth_active_user_v3";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<AdminUser[]>(defaultUsers);
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(STORAGE_USERS);
      const storedRoles = localStorage.getItem(STORAGE_ROLES);
      const storedActive = localStorage.getItem(STORAGE_CURRENT_USER);

      if (storedRoles) {
        const parsedRoles = JSON.parse(storedRoles);
        if (Array.isArray(parsedRoles) && parsedRoles.length > 0) {
          setRoles(parsedRoles);
        }
      }

      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          // Guarantee Superadmin.verc exists with default password if missing
          const hasSuper = parsedUsers.some((u: AdminUser) => u.username.toLowerCase() === "superadmin.verc");
          if (!hasSuper) {
            parsedUsers.unshift(defaultUsers[0]);
          }
          setUsers(parsedUsers);
        }
      }

      if (storedActive) {
        const parsedActive = JSON.parse(storedActive);
        if (parsedActive && parsedActive.id) {
          setCurrentUser(parsedActive);
        }
      }
    } catch (e) {
      console.warn("Could not load auth data from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync users to LocalStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      } catch (e) {
        console.warn("Failed saving users to localStorage:", e);
      }
    }
  }, [users, isLoading]);

  // Sync roles to LocalStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_ROLES, JSON.stringify(roles));
      } catch (e) {
        console.warn("Failed saving roles to localStorage:", e);
      }
    }
  }, [roles, isLoading]);

  // Sync active user to LocalStorage
  useEffect(() => {
    if (!isLoading) {
      try {
        if (currentUser) {
          localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(currentUser));
        } else {
          localStorage.removeItem(STORAGE_CURRENT_USER);
        }
      } catch (e) {
        console.warn("Failed saving current user to localStorage:", e);
      }
    }
  }, [currentUser, isLoading]);

  // Authenticate user
  const login = (usernameOrEmail: string, pass: string): { success: boolean; message?: string } => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    const user = users.find(
      u => u.username.toLowerCase() === cleanUser || u.email.toLowerCase() === cleanUser
    );

    if (!user) {
      return { success: false, message: "Invalid username or email address." };
    }

    if (user.password !== cleanPass) {
      return { success: false, message: "Incorrect password. Please verify and try again." };
    }

    if (user.status === "Suspended") {
      return { success: false, message: "This account has been suspended by the NGO Administration." };
    }

    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    setCurrentUser(updatedUser);

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const getUserRole = (roleId: string): Role | undefined => {
    return roles.find(r => r.id === roleId);
  };

  // RBAC Permission Check
  const hasPermission = (path: string): boolean => {
    if (!currentUser) return false;
    
    // Superadmin has immutable master permission
    if (currentUser.roleId === "role-superadmin" || currentUser.username.toLowerCase() === "superadmin.verc") {
      return true;
    }

    const role = getUserRole(currentUser.roleId);
    if (!role) return false;

    // Direct path match or parent path match
    return role.allowedPaths.some(allowed => {
      if (allowed === path) return true;
      if (path.startsWith(allowed) && allowed !== "/admin") return true;
      return false;
    });
  };

  // Add User Manually
  const addUser = (userData: Omit<AdminUser, "id" | "createdAt">): { success: boolean; message?: string; user?: AdminUser } => {
    const cleanUsername = userData.username.trim();
    const cleanEmail = userData.email.trim().toLowerCase();

    if (!cleanUsername || !cleanEmail || !userData.password) {
      return { success: false, message: "Username, email, and password are required." };
    }

    const existingUsername = users.find(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (existingUsername) {
      return { success: false, message: `Username "${cleanUsername}" is already taken.` };
    }

    const existingEmail = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existingEmail) {
      return { success: false, message: `Email "${cleanEmail}" is already registered.` };
    }

    const role = roles.find(r => r.id === userData.roleId) || roles[0];

    const newUser: AdminUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: userData.fullName.trim() || cleanUsername,
      username: cleanUsername,
      email: cleanEmail,
      phone: userData.phone?.trim() || "",
      roleId: role.id,
      roleName: role.name,
      password: userData.password.trim(),
      status: userData.status || "Active",
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [newUser, ...prev]);
    return { success: true, user: newUser };
  };

  // Bulk Add Users from Excel / CSV Import
  const bulkAddUsers = (
    usersArray: Array<{ fullName: string; username: string; email: string; roleName: string; password?: string; phone?: string }>
  ): { successCount: number; errors: string[] } => {
    let successCount = 0;
    const errors: string[] = [];
    const newUsers: AdminUser[] = [];

    const existingUsernames = new Set(users.map(u => u.username.toLowerCase()));
    const existingEmails = new Set(users.map(u => u.email.toLowerCase()));

    usersArray.forEach((row, idx) => {
      const lineNum = idx + 1;
      const cleanUsername = (row.username || "").trim();
      const cleanEmail = (row.email || "").trim().toLowerCase();
      const cleanName = (row.fullName || cleanUsername).trim();
      const cleanPhone = (row.phone || "").trim();
      const password = (row.password || "verc2026!").trim();

      if (!cleanUsername) {
        errors.push(`Row ${lineNum}: Missing username.`);
        return;
      }

      if (!cleanEmail || !cleanEmail.includes("@")) {
        errors.push(`Row ${lineNum}: Invalid email (${row.email}).`);
        return;
      }

      if (existingUsernames.has(cleanUsername.toLowerCase())) {
        errors.push(`Row ${lineNum}: Username "${cleanUsername}" is already taken.`);
        return;
      }

      if (existingEmails.has(cleanEmail)) {
        errors.push(`Row ${lineNum}: Email "${cleanEmail}" already exists.`);
        return;
      }

      // Match Role or default to first non-superadmin role
      const matchedRole = roles.find(
        r => r.name.toLowerCase() === (row.roleName || "").trim().toLowerCase()
      ) || roles.find(r => !r.isSystem) || roles[0];

      existingUsernames.add(cleanUsername.toLowerCase());
      existingEmails.add(cleanEmail);

      newUsers.push({
        id: `user-bulk-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        fullName: cleanName,
        username: cleanUsername,
        email: cleanEmail,
        phone: cleanPhone,
        roleId: matchedRole.id,
        roleName: matchedRole.name,
        password,
        status: "Active",
        createdAt: new Date().toISOString()
      });

      successCount++;
    });

    if (newUsers.length > 0) {
      setUsers(prev => [...newUsers, ...prev]);
    }

    return { successCount, errors };
  };

  // Update User
  const updateUser = (id: string, userData: Partial<AdminUser>): { success: boolean; message?: string } => {
    const target = users.find(u => u.id === id);
    if (!target) return { success: false, message: "User not found." };

    if (target.username.toLowerCase() === "superadmin.verc" && userData.username && userData.username.toLowerCase() !== "superadmin.verc") {
      return { success: false, message: "Primary Superadmin username cannot be altered." };
    }

    if (userData.roleId && userData.roleId !== target.roleId) {
      const role = roles.find(r => r.id === userData.roleId);
      if (role) {
        userData.roleName = role.name;
      }
    }

    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...userData } : u)));

    // Update currentUser in state if it's the one modified
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...userData } : null);
    }

    return { success: true };
  };

  // Delete User (Superadmin is protected)
  const deleteUser = (id: string): { success: boolean; message?: string } => {
    const target = users.find(u => u.id === id);
    if (!target) return { success: false, message: "User not found." };

    if (target.username.toLowerCase() === "superadmin.verc" || target.roleId === "role-superadmin") {
      return { success: false, message: "Cannot delete the default Superadmin account." };
    }

    if (currentUser?.id === id) {
      return { success: false, message: "You cannot delete your own active logged-in account." };
    }

    setUsers(prev => prev.filter(u => u.id !== id));
    return { success: true };
  };

  const toggleUserStatus = (id: string) => {
    const target = users.find(u => u.id === id);
    if (!target || target.username.toLowerCase() === "superadmin.verc") return;

    const nextStatus = target.status === "Active" ? "Suspended" : "Active";
    updateUser(id, { status: nextStatus });
  };

  // Password Control: User changes own password
  const changePassword = (userId: string, currentPass: string, newPass: string): { success: boolean; message?: string } => {
    const user = users.find(u => u.id === userId);
    if (!user) return { success: false, message: "User not found." };

    if (user.password !== currentPass.trim()) {
      return { success: false, message: "Current password does not match." };
    }

    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: "New password must be at least 6 characters long." };
    }

    const updatedPass = newPass.trim();
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, password: updatedPass } : u));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, password: updatedPass } : null);
    }

    return { success: true };
  };

  // Admin resets password for any user
  const adminResetPassword = (userId: string, newPass: string): { success: boolean; message?: string } => {
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: "New password must be at least 6 characters long." };
    }

    const updatedPass = newPass.trim();
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, password: updatedPass } : u));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, password: updatedPass } : null);
    }

    return { success: true };
  };

  // Role Creation
  const addRole = (roleData: Omit<Role, "id" | "isSystem">): { success: boolean; message?: string; role?: Role } => {
    const cleanName = roleData.name.trim();
    if (!cleanName) return { success: false, message: "Role name is required." };

    const existing = roles.find(r => r.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) {
      return { success: false, message: `A role with name "${cleanName}" already exists.` };
    }

    const newRole: Role = {
      id: `role-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      description: roleData.description.trim(),
      isSystem: false,
      allowedPaths: roleData.allowedPaths.length > 0 ? roleData.allowedPaths : ["/admin"]
    };

    setRoles(prev => [...prev, newRole]);
    return { success: true, role: newRole };
  };

  // Update Role
  const updateRole = (id: string, roleData: Partial<Role>): { success: boolean; message?: string } => {
    const target = roles.find(r => r.id === id);
    if (!target) return { success: false, message: "Role not found." };

    if (target.isSystem && roleData.name && roleData.name !== target.name) {
      return { success: false, message: "Cannot rename built-in system roles." };
    }

    const updated = { ...target, ...roleData };
    setRoles(prev => prev.map(r => r.id === id ? updated : r));

    // Update user roleName across all users who hold this role
    if (roleData.name && roleData.name !== target.name) {
      setUsers(prev => prev.map(u => u.roleId === id ? { ...u, roleName: roleData.name! } : u));
    }

    return { success: true };
  };

  // Delete Role
  const deleteRole = (id: string): { success: boolean; message?: string } => {
    const target = roles.find(r => r.id === id);
    if (!target) return { success: false, message: "Role not found." };

    if (target.isSystem) {
      return { success: false, message: "System roles cannot be deleted." };
    }

    const usersAssigned = users.filter(u => u.roleId === id);
    if (usersAssigned.length > 0) {
      return { success: false, message: `Cannot delete role: ${usersAssigned.length} staff member(s) are currently assigned to this role.` };
    }

    setRoles(prev => prev.filter(r => r.id !== id));
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        roles,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
        hasPermission,
        getUserRole,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
