import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { NETWORK, PERMISSION_EXPIRY_MODULE_ADDRESS } from "../constants";

const config = new AptosConfig({ network: NETWORK as Network });
const aptos = new Aptos(config);

export interface Permission {
  grantee: string;
  permission_type: string;
  expiry_timestamp: number;
  granted_by: string;
  granted_at: number;
  status: number;
  metadata: string;
}

/**
 * Checks if a permission is valid (active and not expired)
 */
export const isPermissionValid = async (
  adminAddress: string,
  granteeAddress: string,
  permissionType: string
): Promise<boolean> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::permission_expiry::view_is_permission_valid`,
        functionArguments: [adminAddress, granteeAddress, permissionType],
      },
    });
    return result[0] as boolean;
  } catch (error) {
    console.error("Error checking permission validity:", error);
    return false;
  }
};

/**
 * Gets permission details
 */
export const getPermission = async (
  adminAddress: string,
  granteeAddress: string,
  permissionType: string
): Promise<Permission | null> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::permission_expiry::view_permission`,
        functionArguments: [adminAddress, granteeAddress, permissionType],
      },
    });

    if (result && result[0]) {
      const permission = result[0] as any;
      return {
        grantee: permission.grantee,
        permission_type: permission.permission_type,
        expiry_timestamp: Number(permission.expiry_timestamp),
        granted_by: permission.granted_by,
        granted_at: Number(permission.granted_at),
        status: Number(permission.status),
        metadata: permission.metadata,
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting permission:", error);
    return null;
  }
};

/**
 * Checks if an address is admin
 */
export const isAdmin = async (
  accountAddress: string,
  adminAddress: string
): Promise<boolean> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::permission_expiry::is_admin`,
        functionArguments: [accountAddress, adminAddress],
      },
    });
    return result[0] as boolean;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
