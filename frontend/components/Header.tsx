import { WalletSelector } from "./WalletSelector";
import { Button } from "./ui/button";
import { Shield, Github, Zap, Settings, Globe, Activity } from "lucide-react";
import { NETWORK } from "../constants";

export function Header() {
  return (
    <header className="w-full header-gradient sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-white bounce-animation" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white text-gradient">PermissionExpiry</h1>
                <p className="text-xs text-gray-300">Advanced dApp Platform</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1 ml-8">
              <Button className="btn-gradient btn-accent hover-lift">
                <Activity className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button className="btn-gradient btn-secondary hover-lift">
                <Zap className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button className="btn-gradient btn-warning hover-lift">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </div>

          {/* Center - Network status */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="glass-effect px-4 py-2 rounded-full">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white font-semibold">
                  <Globe className="h-4 w-4 inline mr-1" />
                  {NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1)}
                </span>
              </div>
            </div>
            <span className="badge-success">⚡ Live & Ready</span>
          </div>

          {/* Right side - Wallet and GitHub */}
          <div className="flex items-center space-x-4">
            <Button
              className="btn-gradient btn-danger hover-lift hidden md:flex items-center space-x-2"
              asChild
            >
              <a
                href="https://github.com/aptos-labs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
            <WalletSelector />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden mt-4 flex items-center justify-center space-x-2">
          <div className="glass-effect px-3 py-1 rounded-full">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white">{NETWORK.charAt(0).toUpperCase() + NETWORK.slice(1)}</span>
            </div>
          </div>
          <span className="badge-success">⚡ Live</span>
        </div>
      </div>
    </header>
  );
}
