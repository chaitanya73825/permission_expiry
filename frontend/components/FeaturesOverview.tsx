import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Shield, Clock, Users, Lock, CheckCircle, AlertTriangle } from "lucide-react";

const FeaturesOverview: React.FC = () => {
  return (
    <div className="feature-grid">
      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Shield className="h-5 w-5 text-white" />
            </div>
            Secure Permissions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Admin-controlled permission granting with blockchain security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
              <span>Only admins can grant permissions</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
              <span>Immutable blockchain records</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              <span>Transparent audit trail</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full">
              <Clock className="h-5 w-5 text-white" />
            </div>
            Time-Based Expiry
          </CardTitle>
          <CardDescription className="text-gray-400">
            Automatic permission expiration for enhanced security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full"></div>
              <span>Set custom expiry times</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></div>
              <span>Automatic invalidation</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"></div>
              <span>No manual cleanup needed</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
              <Users className="h-5 w-5 text-white" />
            </div>
            Multi-User Support
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage permissions for multiple addresses efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"></div>
              <span>Grant to any Aptos address</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full"></div>
              <span>Multiple permission types</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"></div>
              <span>Individual management</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full">
              <Lock className="h-5 w-5 text-white" />
            </div>
            Permission Types
          </CardTitle>
          <CardDescription className="text-gray-400">
            Predefined permission categories for different access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <span className="text-sm font-medium text-gray-300">READ_ACCESS</span>
              <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-300">WRITE_ACCESS</span>
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-300">ADMIN_ACCESS</span>
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <span className="text-sm font-medium text-gray-300">SPECIAL_ACCESS</span>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            Real-time Validation
          </CardTitle>
          <CardDescription className="text-gray-400">
            Check permission status instantly on-chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span>Instant validity checks</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <span>Detailed permission info</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
              <span>Status indicators</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card hover-lift fade-in-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            Event Logging
          </CardTitle>
          <CardDescription className="text-gray-400">
            Complete audit trail of all permission changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-300 font-medium">Grant events</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-300 font-medium">Revoke events</span>
            </div>
            <div className="flex items-center space-x-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-300 font-medium">Expiry tracking</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesOverview;
