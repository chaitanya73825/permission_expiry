import { Shield, Zap, Github } from "lucide-react";

export function TopBanner() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-green-400 via-blue-500 to-purple-600 opacity-50 animate-pulse"></div>
      
      {/* Content */}
      <div className="relative z-10 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-white to-gray-200 rounded-full flex items-center justify-center bounce-animation">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Permission
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              Expiry dApp
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of blockchain permission management with our 
            <span className="font-bold text-yellow-300"> stunning gradient interface</span> and 
            <span className="font-bold text-pink-300"> smooth animations</span>. 
            Built on Aptos for ultimate security and performance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="glass-effect px-6 py-3 rounded-full hover-lift">
              <div className="flex items-center space-x-2 text-white">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span className="font-semibold">Lightning Fast</span>
              </div>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full hover-lift">
              <div className="flex items-center space-x-2 text-white">
                <Shield className="h-5 w-5 text-green-300" />
                <span className="font-semibold">Ultra Secure</span>
              </div>
            </div>
            <div className="glass-effect px-6 py-3 rounded-full hover-lift">
              <div className="flex items-center space-x-2 text-white">
                <Github className="h-5 w-5 text-blue-300" />
                <span className="font-semibold">Open Source</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-lg">
              🚀 Ready for <span className="font-bold text-green-300">Aptos Devnet</span> • 
              ⚡ Powered by <span className="font-bold text-blue-300">Smart Contracts</span> • 
              🎨 Built with <span className="font-bold text-pink-300">Modern UI/UX</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-green-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-ping"></div>
    </div>
  );
}
