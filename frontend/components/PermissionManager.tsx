import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { useToast } from "./ui/use-toast";
import { AlertCircle, Clock, Shield, UserCheck, UserX, CheckCircle } from "lucide-react";
import { 
  PERMISSION_EXPIRY_MODULE_ADDRESS, 
  PERMISSION_EXPIRY_MODULE_NAME,
  PERMISSION_STATUS,
  PERMISSION_TYPES 
} from "../constants";
import { isPermissionValid, getPermission, isAdmin, type Permission } from "../view-functions/getPermissionInfo";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: "devnet" as Network });
const aptos = new Aptos(config);

interface PermissionManagerProps {
  onTransactionSuccess?: () => void;
}

const PermissionManager: React.FC<PermissionManagerProps> = ({ onTransactionSuccess }) => {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  // Grant Permission Form
  const [granteeAddress, setGranteeAddress] = useState("");
  const [permissionType, setPermissionType] = useState("");
  const [expiryHours, setExpiryHours] = useState("24");
  const [metadata, setMetadata] = useState("");
  
  // Check Permission Form
  const [checkGranteeAddress, setCheckGranteeAddress] = useState("");
  const [checkPermissionType, setCheckPermissionType] = useState("");
  const [permissionInfo, setPermissionInfo] = useState<Permission | null>(null);
  const [isPermissionValidResult, setIsPermissionValidResult] = useState<boolean | null>(null);
  
  // Revoke Permission Form
  const [revokeGranteeAddress, setRevokeGranteeAddress] = useState("");
  const [revokePermissionType, setRevokePermissionType] = useState("");

  useEffect(() => {
    if (account?.address) {
      checkInitializationAndAdminStatus();
    }
  }, [account?.address]);

  const checkInitializationAndAdminStatus = async () => {
    if (!account?.address) return;
    
    try {
      // Check if user is admin by trying to get admin address
      const adminCheck = await isAdmin(account.address.toString(), account.address.toString());
      setIsUserAdmin(adminCheck);
      setIsInitialized(adminCheck);
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsUserAdmin(false);
      setIsInitialized(false);
    }
  };

  const handleInitialize = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::initialize`,
          functionArguments: [],
        },
      });

      await aptos.waitForTransaction({ transactionHash: transaction.hash });
      
      toast({
        title: "Success",
        description: "Permission Registry initialized successfully!",
      });
      
      setIsInitialized(true);
      setIsUserAdmin(true);
      onTransactionSuccess?.();
    } catch (error) {
      console.error("Error initializing:", error);
      toast({
        title: "Error",
        description: "Failed to initialize permission registry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrantPermission = async () => {
    if (!account || !granteeAddress || !permissionType || !expiryHours) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiryTimestamp = currentTimestamp + (parseInt(expiryHours) * 3600);

      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::grant_permission`,
          functionArguments: [
            granteeAddress,
            permissionType,
            expiryTimestamp.toString(),
            metadata || "No metadata provided",
          ],
        },
      });

      await aptos.waitForTransaction({ transactionHash: transaction.hash });
      
      toast({
        title: "Success",
        description: `Permission granted to ${granteeAddress}`,
      });
      
      // Reset form
      setGranteeAddress("");
      setPermissionType("");
      setExpiryHours("24");
      setMetadata("");
      
      onTransactionSuccess?.();
    } catch (error) {
      console.error("Error granting permission:", error);
      toast({
        title: "Error",
        description: "Failed to grant permission",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokePermission = async () => {
    if (!account || !revokeGranteeAddress || !revokePermissionType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const transaction = await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::revoke_permission`,
          functionArguments: [revokeGranteeAddress, revokePermissionType],
        },
      });

      await aptos.waitForTransaction({ transactionHash: transaction.hash });
      
      toast({
        title: "Success",
        description: `Permission revoked from ${revokeGranteeAddress}`,
      });
      
      // Reset form
      setRevokeGranteeAddress("");
      setRevokePermissionType("");
      
      onTransactionSuccess?.();
    } catch (error) {
      console.error("Error revoking permission:", error);
      toast({
        title: "Error",
        description: "Failed to revoke permission",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckPermission = async () => {
    if (!account || !checkGranteeAddress || !checkPermissionType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if permission is valid
      const isValid = await isPermissionValid(account.address.toString(), checkGranteeAddress, checkPermissionType);
      setIsPermissionValidResult(isValid);
      
      // Get detailed permission info
      const permission = await getPermission(account.address.toString(), checkGranteeAddress, checkPermissionType);
      setPermissionInfo(permission);
      
    } catch (error) {
      console.error("Error checking permission:", error);
      toast({
        title: "Error",
        description: "Failed to check permission",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case PERMISSION_STATUS.ACTIVE:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case PERMISSION_STATUS.EXPIRED:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case PERMISSION_STATUS.REVOKED:
        return <UserX className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case PERMISSION_STATUS.ACTIVE:
        return "Active";
      case PERMISSION_STATUS.EXPIRED:
        return "Expired";
      case PERMISSION_STATUS.REVOKED:
        return "Revoked";
      default:
        return "Unknown";
    }
  };

  if (!account) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permission Manager
          </CardTitle>
          <CardDescription>
            Please connect your wallet to manage permissions
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permission Manager
          </CardTitle>
          <CardDescription>
            Manage time-based permissions on Aptos Devnet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span className="text-sm">
                Admin Status: {isUserAdmin ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">
                Registry: {isInitialized ? "Initialized" : "Not Initialized"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initialize Registry */}
      {!isInitialized && (
        <Card>
          <CardHeader>
            <CardTitle>Initialize Permission Registry</CardTitle>
            <CardDescription>
              Initialize the permission registry to start managing permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleInitialize} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Initializing..." : "Initialize Registry"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Admin Functions */}
      {isUserAdmin && (
        <>
          {/* Grant Permission */}
          <Card>
            <CardHeader>
              <CardTitle>Grant Permission</CardTitle>
              <CardDescription>
                Grant a time-limited permission to an address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grantee">Grantee Address</Label>
                  <Input
                    id="grantee"
                    placeholder="0x..."
                    value={granteeAddress}
                    onChange={(e) => setGranteeAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permission-type">Permission Type</Label>
                  <Select
                    id="permission-type"
                    value={permissionType}
                    onChange={(e) => setPermissionType(e.target.value)}
                  >
                    <option value="">Select permission type</option>
                    {Object.values(PERMISSION_TYPES).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-hours">Expiry (Hours)</Label>
                  <Input
                    id="expiry-hours"
                    type="number"
                    placeholder="24"
                    value={expiryHours}
                    onChange={(e) => setExpiryHours(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metadata">Metadata (Optional)</Label>
                  <Input
                    id="metadata"
                    placeholder="Additional information"
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={handleGrantPermission} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Granting..." : "Grant Permission"}
              </Button>
            </CardContent>
          </Card>

          {/* Revoke Permission */}
          <Card>
            <CardHeader>
              <CardTitle>Revoke Permission</CardTitle>
              <CardDescription>
                Revoke an existing permission from an address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revoke-grantee">Grantee Address</Label>
                  <Input
                    id="revoke-grantee"
                    placeholder="0x..."
                    value={revokeGranteeAddress}
                    onChange={(e) => setRevokeGranteeAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revoke-permission-type">Permission Type</Label>
                  <Select
                    id="revoke-permission-type"
                    value={revokePermissionType}
                    onChange={(e) => setRevokePermissionType(e.target.value)}
                  >
                    <option value="">Select permission type</option>
                    {Object.values(PERMISSION_TYPES).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleRevokePermission} 
                disabled={isLoading}
                className="w-full"
                variant="destructive"
              >
                {isLoading ? "Revoking..." : "Revoke Permission"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      {/* Check Permission */}
      <Card>
        <CardHeader>
          <CardTitle>Check Permission</CardTitle>
          <CardDescription>
            Check the status and details of a permission
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check-grantee">Grantee Address</Label>
              <Input
                id="check-grantee"
                placeholder="0x..."
                value={checkGranteeAddress}
                onChange={(e) => setCheckGranteeAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-permission-type">Permission Type</Label>
              <Select
                id="check-permission-type"
                value={checkPermissionType}
                onChange={(e) => setCheckPermissionType(e.target.value)}
              >
                <option value="">Select permission type</option>
                {Object.values(PERMISSION_TYPES).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>
          </div>
          <Button 
            onClick={handleCheckPermission} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Checking..." : "Check Permission"}
          </Button>

          {/* Permission Results */}
          {isPermissionValidResult !== null && (
            <div className="mt-4 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {isPermissionValidResult ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <UserX className="h-5 w-5 text-red-500" />
                )}
                <span className="font-semibold">
                  Permission is {isPermissionValidResult ? "Valid" : "Invalid"}
                </span>
              </div>
              
              {permissionInfo && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(permissionInfo.status)}
                      <span>{getStatusText(permissionInfo.status)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Granted By:</span>
                    <span className="font-mono text-xs">{permissionInfo.granted_by}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Granted At:</span>
                    <span>{formatTimestamp(permissionInfo.granted_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expires At:</span>
                    <span>{formatTimestamp(permissionInfo.expiry_timestamp)}</span>
                  </div>
                  {permissionInfo.metadata && (
                    <div className="flex justify-between">
                      <span>Metadata:</span>
                      <span>{permissionInfo.metadata}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionManager;
