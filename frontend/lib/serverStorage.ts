import path from "path";
import fs from "fs";

/**
 * Resolves the directory where persistent CMS JSON data is stored.
 * Works seamlessly in both local development and production (cPanel Passenger).
 */
export function getDataDir(): string {
  // Primary location: data/ directory in application root
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (err) {
      console.warn("[serverStorage] Could not create data directory at process.cwd():", err);
    }
  }
  return dataDir;
}

export function getContentFilePath(): string {
  return path.join(getDataDir(), "content.json");
}

export function getUsersFilePath(): string {
  return path.join(getDataDir(), "users.json");
}

export function getRolesFilePath(): string {
  return path.join(getDataDir(), "roles.json");
}

export function getUploadsDir(): string {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });
    } catch (err) {
      console.warn("[serverStorage] Could not create uploads directory:", err);
    }
  }
  return uploadsDir;
}

/**
 * Reads the authoritative content stored on the server.
 * Returns null if no custom content has been saved yet.
 */
export function readServerContent(): { data: any; lastUpdated: number } | null {
  try {
    const filePath = getContentFilePath();
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    const lastUpdated = parsed._lastUpdated || fs.statSync(filePath).mtimeMs;
    // Remove metadata key if present when returning data
    const { _lastUpdated, ...cleanData } = parsed;
    return { data: cleanData, lastUpdated };
  } catch (err) {
    console.error("[serverStorage] Error reading content.json:", err);
    return null;
  }
}

/**
 * Atomically writes content to the server content.json file.
 */
export function writeServerContent(data: any): { success: boolean; lastUpdated: number } {
  try {
    const dataDir = getDataDir();
    const filePath = getContentFilePath();
    const tempPath = path.join(dataDir, `content.${Date.now()}.tmp`);

    const now = Date.now();
    const payload = {
      ...data,
      _lastUpdated: now
    };

    const jsonString = JSON.stringify(payload, null, 2);
    fs.writeFileSync(tempPath, jsonString, "utf-8");

    // Atomic rename replaces the file safely even under concurrency
    try {
      fs.renameSync(tempPath, filePath);
    } catch (renameErr) {
      // Fallback for Windows file lock quirks
      fs.writeFileSync(filePath, jsonString, "utf-8");
      if (fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch (_) {}
      }
    }

    return { success: true, lastUpdated: now };
  } catch (err) {
    console.error("[serverStorage] Error writing content.json:", err);
    throw err;
  }
}

/**
 * Reads users and roles from the server.
 */
export function readServerAuth(): { users: any[] | null; roles: any[] | null } {
  try {
    let users = null;
    let roles = null;

    const usersFile = getUsersFilePath();
    if (fs.existsSync(usersFile)) {
      users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
    }

    const rolesFile = getRolesFilePath();
    if (fs.existsSync(rolesFile)) {
      roles = JSON.parse(fs.readFileSync(rolesFile, "utf-8"));
    }

    return { users, roles };
  } catch (err) {
    console.error("[serverStorage] Error reading auth data:", err);
    return { users: null, roles: null };
  }
}

/**
 * Writes users and roles to server files.
 */
export function writeServerAuth(users?: any[], roles?: any[]): { success: boolean } {
  try {
    getDataDir(); // Ensure folder exists

    if (users && Array.isArray(users)) {
      fs.writeFileSync(getUsersFilePath(), JSON.stringify(users, null, 2), "utf-8");
    }

    if (roles && Array.isArray(roles)) {
      fs.writeFileSync(getRolesFilePath(), JSON.stringify(roles, null, 2), "utf-8");
    }

    return { success: true };
  } catch (err) {
    console.error("[serverStorage] Error writing auth data:", err);
    throw err;
  }
}

