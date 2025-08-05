export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "devnet";
export const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS ?? import.meta.env.VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS;
export const APTOS_API_KEY = import.meta.env.VITE_APTOS_API_KEY;

// Permission Expiry Module
export const PERMISSION_EXPIRY_MODULE_NAME = "permission_expiry";
export const PERMISSION_EXPIRY_MODULE_ADDRESS = MODULE_ADDRESS;

// Permission Status Constants
export const PERMISSION_STATUS = {
  ACTIVE: 1,
  EXPIRED: 2,
  REVOKED: 3,
} as const;

// Common Permission Types
export const PERMISSION_TYPES = [
  "READ_ACCESS",
  "WRITE_ACCESS", 
  "ADMIN_ACCESS",
  "SPECIAL_ACCESS",
] as const;
