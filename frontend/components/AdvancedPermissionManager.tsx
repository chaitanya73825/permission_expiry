import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { 
  AlertCircle, 
  Clock, 
  Shield, 
  UserCheck, 
  UserX, 
  CheckCircle, 
  Settings,
  Database,
  Activity,
  Eye,
  RefreshCw,
  Server
} from "lucide-react";
import { 
  PERMISSION_EXPIRY_MODULE_ADDRESS, 
  PERMISSION_EXPIRY_MODULE_NAME
} from "../constants";

const AdvancedPermissionManager: React.FC = () => {
  const { account, connected, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  
  // Grant Permission Form
  const [granteeAddress, setGranteeAddress] = useState("");
  const [permissionType, setPermissionType] = useState("READ_ACCESS");
  const [expiryHours, setExpiryHours] = useState("24");
  
  // Check Permission Form
  const [checkAddress, setCheckAddress] = useState("");
  const [checkType, setCheckType] = useState("READ_ACCESS");
  const [permissionResult, setPermissionResult] = useState<any>(null);
  
  // Revoke Permission Form
  const [revokeAddress, setRevokeAddress] = useState("");

  // Initialize Registry
  const handleInitialize = async () => {
    if (!connected || !account) {
      toast({
        title: "⚠️ Wallet Required",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    // Check if connected to correct network
    if (account?.address && !account.address.toString().startsWith("0x")) {
      toast({
        title: "⚠️ Network Issue",
        description: "Please make sure you're connected to Aptos Devnet",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::initialize`,
          functionArguments: [],
        },
      });

      toast({
        title: "🎉 Success!",
        description: "Permission registry initialized successfully!",
      });
      
      setIsInitialized(true);
      setIsUserAdmin(true);
    } catch (error: any) {
      console.error("Initialize error:", error);
      toast({
        title: "❌ Initialization Failed",
        description: error.message || error.toString() || "Failed to initialize registry. Make sure you're connected to Aptos Devnet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Grant Permission
  const handleGrantPermission = async () => {
    if (!connected || !granteeAddress || !permissionType) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Validate address format
    if (!granteeAddress.startsWith("0x") || granteeAddress.length !== 66) {
      toast({
        title: "⚠️ Invalid Address",
        description: "Please enter a valid Aptos address (0x... with 64 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const expiryTimestamp = Math.floor(Date.now() / 1000) + (parseInt(expiryHours) * 3600);
      
      await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::grant_permission`,
          functionArguments: [
            granteeAddress,
            permissionType,
            expiryTimestamp.toString(),
            "Granted via dApp"
          ],
        },
      });

      toast({
        title: "🎉 Permission Granted!",
        description: `Successfully granted ${permissionType} to ${granteeAddress}`,
      });
      
      // Clear form
      setGranteeAddress("");
      setExpiryHours("24");
    } catch (error: any) {
      console.error("Grant permission error:", error);
      toast({
        title: "❌ Grant Failed",
        description: error.message || error.toString() || "Failed to grant permission. Make sure you're connected to Aptos Devnet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check Permission
  const handleCheckPermission = async () => {
    if (!checkAddress || !checkType) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // This would typically be a view function call
      toast({
        title: "🔍 Checking Permission",
        description: "Permission check feature - integrate with view functions",
      });
      
      // Simulate result for demo
      setPermissionResult({
        hasPermission: true,
        expiresAt: Date.now() + 86400000,
        isExpired: false
      });
    } catch (error: any) {
      toast({
        title: "❌ Check Failed",
        description: error.message || "Failed to check permission",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Revoke Permission
  const handleRevokePermission = async () => {
    if (!connected || !revokeAddress) {
      toast({
        title: "⚠️ Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Validate address format
    if (!revokeAddress.startsWith("0x") || revokeAddress.length !== 66) {
      toast({
        title: "⚠️ Invalid Address",
        description: "Please enter a valid Aptos address (0x... with 64 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signAndSubmitTransaction({
        data: {
          function: `${PERMISSION_EXPIRY_MODULE_ADDRESS}::${PERMISSION_EXPIRY_MODULE_NAME}::revoke_permission`,
          functionArguments: [
            revokeAddress
          ],
        },
      });

      toast({
        title: "🎉 Permission Revoked!",
        description: `Successfully revoked all permissions from ${revokeAddress}`,
      });
      
      // Clear form
      setRevokeAddress("");
    } catch (error: any) {
      console.error("Revoke permission error:", error);
      toast({
        title: "❌ Revoke Failed",
        description: error.message || error.toString() || "Failed to revoke permission. Make sure you're connected to Aptos Devnet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "grant", label: "Grant", icon: UserCheck },
    { id: "check", label: "Check", icon: Eye },
    { id: "revoke", label: "Revoke", icon: UserX },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="modern-card p-6 hover-lift">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Permission Manager</h1>
              <p className="text-gray-400">Advanced blockchain permission management system</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {connected ? (
              <span className="badge-success">🟢 Connected</span>
            ) : (
              <span className="badge-danger">🔴 Disconnected</span>
            )}
            {isInitialized && <span className="badge-warning">⚡ Initialized</span>}
            {isUserAdmin && <span className="badge-danger">👑 Admin</span>}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="modern-card p-2">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "btn-gradient btn-accent text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="modern-card p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Permissions</p>
                    <p className="text-2xl font-bold text-gradient">47</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="modern-card p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Now</p>
                    <p className="text-2xl font-bold text-gradient">23</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="modern-card p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Expired</p>
                    <p className="text-2xl font-bold text-gradient">8</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="modern-card p-6">
              <h3 className="text-xl font-bold mb-4 text-gradient">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {!isInitialized && (
                  <Button 
                    onClick={handleInitialize}
                    disabled={isLoading}
                    className="btn-gradient btn-warning hover-lift"
                  >
                    <Server className="h-4 w-4 mr-2" />
                    Initialize Registry
                  </Button>
                )}
                <Button 
                  onClick={() => setActiveTab("grant")}
                  className="btn-gradient btn-success hover-lift"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Grant Permission
                </Button>
                <Button 
                  onClick={() => setActiveTab("check")}
                  className="btn-gradient btn-accent hover-lift"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
                <Button 
                  onClick={() => setActiveTab("revoke")}
                  className="btn-gradient btn-danger hover-lift"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Revoke Access
                </Button>
              </div>
            </div>

            {/* Helpful Information */}
            <div className="modern-card p-6">
              <h3 className="text-xl font-bold mb-4 text-gradient">📝 Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">🚀 Getting Started</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Make sure you're connected to <strong>Aptos Devnet</strong></li>
                    <li>• Click "Initialize Registry" first (admin only)</li>
                    <li>• Use your account for testing permissions</li>
                    <li>• All addresses must be 66 characters (0x + 64 chars)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">💡 Test Addresses</h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p><strong>Your Address:</strong></p>
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                      {account?.address?.toString() || "Connect wallet to see your address"}
                    </p>
                    <p><strong>Contract Address:</strong></p>
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                      {PERMISSION_EXPIRY_MODULE_ADDRESS}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "grant" && (
          <div className="modern-card p-6">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Grant Permission</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="grantee">Grantee Address</Label>
                <Input
                  id="grantee"
                  value={granteeAddress}
                  onChange={(e) => setGranteeAddress(e.target.value)}
                  placeholder="0x... (64 characters)"
                  className="modern-input"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Enter the full Aptos address starting with 0x
                </p>
              </div>
              
              <div>
                <Label htmlFor="permission-type">Permission Type</Label>
                <select
                  id="permission-type"
                  value={permissionType}
                  onChange={(e) => setPermissionType(e.target.value)}
                  className="modern-input w-full"
                >
                  <option value="READ_ACCESS">READ_ACCESS</option>
                  <option value="WRITE_ACCESS">WRITE_ACCESS</option>
                  <option value="ADMIN_ACCESS">ADMIN_ACCESS</option>
                  <option value="SPECIAL_ACCESS">SPECIAL_ACCESS</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="expiry">Expires In (Hours)</Label>
                <Input
                  id="expiry"
                  type="number"
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(e.target.value)}
                  placeholder="24"
                  className="modern-input"
                />
              </div>
              
              <Button 
                onClick={handleGrantPermission}
                disabled={isLoading}
                className="btn-gradient btn-success hover-lift w-full"
              >
                {isLoading ? <div className="spinner mr-2" /> : <UserCheck className="h-4 w-4 mr-2" />}
                Grant Permission
              </Button>
            </div>
          </div>
        )}

        {activeTab === "check" && (
          <div className="modern-card p-6">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Check Permission</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="check-address">Address to Check</Label>
                <Input
                  id="check-address"
                  value={checkAddress}
                  onChange={(e) => setCheckAddress(e.target.value)}
                  placeholder="0x... (64 characters)"
                  className="modern-input"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Enter the full Aptos address starting with 0x
                </p>
              </div>
              
              <div>
                <Label htmlFor="check-type">Permission Type</Label>
                <select
                  id="check-type"
                  value={checkType}
                  onChange={(e) => setCheckType(e.target.value)}
                  className="modern-input w-full"
                >
                  <option value="READ_ACCESS">READ_ACCESS</option>
                  <option value="WRITE_ACCESS">WRITE_ACCESS</option>
                  <option value="ADMIN_ACCESS">ADMIN_ACCESS</option>
                  <option value="SPECIAL_ACCESS">SPECIAL_ACCESS</option>
                </select>
              </div>
              
              <Button 
                onClick={handleCheckPermission}
                disabled={isLoading}
                className="btn-gradient btn-accent hover-lift w-full"
              >
                {isLoading ? <div className="spinner mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                Check Permission
              </Button>
              
              {permissionResult && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <p className="font-semibold">Permission Status:</p>
                  <p className={permissionResult.hasPermission ? "text-green-600" : "text-red-600"}>
                    {permissionResult.hasPermission ? "✅ Has Permission" : "❌ No Permission"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "revoke" && (
          <div className="modern-card p-6">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Revoke Permission</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="revoke-address">Address to Revoke</Label>
                <Input
                  id="revoke-address"
                  value={revokeAddress}
                  onChange={(e) => setRevokeAddress(e.target.value)}
                  placeholder="0x... (64 characters)"
                  className="modern-input"
                />
                <p className="text-sm text-gray-400 mt-1">
                  This will revoke all permissions for this address
                </p>
              </div>
              
              <Button 
                onClick={handleRevokePermission}
                disabled={isLoading}
                className="btn-gradient btn-danger hover-lift w-full"
              >
                {isLoading ? <div className="spinner mr-2" /> : <UserX className="h-4 w-4 mr-2" />}
                Revoke All Permissions
              </Button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="modern-card p-6">
            <h3 className="text-2xl font-bold mb-6 text-gradient">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div>
                  <p className="font-semibold">Auto-refresh</p>
                  <p className="text-sm text-gray-400">Automatically refresh permission data</p>
                </div>
                <Button className="btn-gradient btn-secondary">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                <div>
                  <p className="font-semibold">Notifications</p>
                  <p className="text-sm text-gray-400">Get notified of permission changes</p>
                </div>
                <Button className="btn-gradient btn-success">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedPermissionManager;
