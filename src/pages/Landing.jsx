import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  const loadingTexts = [
    "Initializing gaming platform...",
    "Loading epic adventures...",
    "Connecting players worldwide...",
    "Preparing your dashboard...",
    "Almost there..."
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Text animation
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev >= loadingTexts.length - 1) {
          clearInterval(textInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    // Navigation timer
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  useEffect(() => {
    // Typewriter effect for current text
    let currentIndex = 0;
    const fullText = loadingTexts[textIndex];
    setCurrentText("");
    
    const typeInterval = setInterval(() => {
      setCurrentText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex === fullText.length) {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [textIndex]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
          }}
        />
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 animate-pulse"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Pulsing circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-purple-500/30 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-blue-500/30 rounded-full animate-ping-slower"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Animated Logo */}
        <div className="flex items-center space-x-4 mb-8 animate-bounce-slow">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-4xl shadow-2xl transform rotate-0 hover:rotate-180 transition-transform duration-1000">
              🎮
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
            Gamers Connect
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mb-6 relative">
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border-4 border-transparent border-b-pink-500 border-l-green-400 rounded-full animate-spin-slow-reverse"></div>
            
            {/* Central icon */}
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="text-2xl animate-pulse">⚡</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
            </div>
          </div>
        </div>

        {/* Animated Text */}
        <div className="h-8 mb-4">
          <p className="text-lg text-gray-300 font-mono min-h-8">
            {currentText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          {[
            { icon: "👥", text: "Multiplayer" },
            { icon: "🏆", text: "Tournaments" },
            { icon: "🎯", text: "Competitive" },
            { icon: "🌐", text: "Global" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${1.5 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-xs text-gray-400">{feature.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-20 text-gray-900" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 4s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;