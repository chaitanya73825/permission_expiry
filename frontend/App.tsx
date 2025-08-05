import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { Header } from "@/components/Header";
import AdvancedPermissionManager from "@/components/AdvancedPermissionManager";
import { TopBanner } from "@/components/TopBanner";
import FeaturesOverview from "@/components/FeaturesOverview";
import { WalletSelector } from "@/components/WalletSelector";

function App() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen">
      {/* Animated Header */}
      <Header />
      
      {/* Hero Banner with Animation */}
      <div className="fade-in-up">
        <TopBanner />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Features Overview - Always Show */}
        <div className="mb-8 slide-in-right">
          <h2 className="text-4xl font-bold text-center mb-8 text-gradient">
            🚀 Permission Expiry Features
          </h2>
          <FeaturesOverview />
        </div>

        {!connected ? (
          /* Welcome Section for Non-Connected Users */
          <div className="text-center py-16 fade-in-up">
            <div className="modern-card max-w-2xl mx-auto p-8 hover-lift">
              <h1 className="text-5xl font-bold mb-6 text-gradient bounce-animation">
                Welcome to Permission Expiry dApp
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Experience the most advanced permission management system on Aptos blockchain. 
                Connect your wallet to start managing time-based permissions with stunning UI and smooth animations.
              </p>
              <div className="mb-8">
                <WalletSelector />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="modern-card p-6 hover-lift">
                  <div className="text-3xl mb-4">🔐</div>
                  <h3 className="font-bold text-lg mb-2">Secure Permissions</h3>
                  <p className="text-gray-400">Blockchain-secured permission management</p>
                </div>
                <div className="modern-card p-6 hover-lift">
                  <div className="text-3xl mb-4">⏰</div>
                  <h3 className="font-bold text-lg mb-2">Time-Based Expiry</h3>
                  <p className="text-gray-400">Automatic permission expiration</p>
                </div>
                <div className="modern-card p-6 hover-lift">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="font-bold text-lg mb-2">Beautiful UI</h3>
                  <p className="text-gray-400">Modern gradient design with animations</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Connected User Dashboard */
          <div className="fade-in-up">
            <AdvancedPermissionManager />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8">
        <div className="modern-card mx-4">
          <div className="text-center p-6">
            <p className="text-gray-400">
              Built with ❤️ on Aptos Blockchain • Modern UI with Vibrant Gradients & Animations
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <span className="badge-success">Devnet Ready</span>
              <span className="badge-warning">Smart Contracts</span>
              <span className="badge-danger">React + TypeScript</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
