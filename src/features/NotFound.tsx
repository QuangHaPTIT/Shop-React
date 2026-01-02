import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound404() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(132, 204, 22, 0.2)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* 404 Number with parallax */}
        <div
          className="relative mb-8"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <h1
            className={`text-9xl sm:text-[180px] md:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-blue-500 leading-none select-none ${
              glitchActive ? 'animate-glitch' : ''
            }`}
            style={{
              textShadow: glitchActive
                ? '0 0 40px rgba(132, 204, 22, 0.8), 0 0 80px rgba(132, 204, 22, 0.4)'
                : 'none',
            }}
          >
            404
          </h1>
          
          {/* Glitch layers */}
          {glitchActive && (
            <>
              <h1
                className="absolute top-0 left-0 w-full text-9xl sm:text-[180px] md:text-[280px] font-black text-red-500/50 leading-none select-none pointer-events-none"
                style={{ transform: 'translate(-4px, -4px)' }}
              >
                404
              </h1>
              <h1
                className="absolute top-0 left-0 w-full text-9xl sm:text-[180px] md:text-[280px] font-black text-blue-500/50 leading-none select-none pointer-events-none"
                style={{ transform: 'translate(4px, 4px)' }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Animated robot/astronaut */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 relative" style={{ animation: 'bounce-slow 3s ease-in-out infinite' }}>
              {/* Helmet */}
              <div className="absolute inset-0 rounded-full shadow-2xl" style={{ background: 'linear-gradient(to bottom right, rgb(163, 230, 53), rgb(59, 130, 246))' }}>
                <div className="absolute inset-4 bg-slate-800/80 rounded-full backdrop-blur-sm">
                  {/* Visor */}
                  <div className="absolute inset-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse">
                    <div className="absolute inset-2 bg-slate-900/40 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Antenna */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-8" style={{ background: 'linear-gradient(to top, rgb(163, 230, 53), transparent)' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Floating stars around */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: `${Math.sin((i * Math.PI) / 4) * 60 + 50}%`,
                  left: `${Math.cos((i * Math.PI) / 4) * 60 + 50}%`,
                  animation: 'twinkle 2s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ animation: 'fade-in 0.8s ease-out forwards' }}>
            Oops! Page Not Found
          </h2>
         
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animation: 'fade-in 0.8s ease-out 0.4s forwards', opacity: 0 }}>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(132, 204, 22, 0.5), 0 4px 6px -2px rgba(132, 204, 22, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="group flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300"
            style={{ 
              background: 'linear-gradient(to right, rgb(132, 204, 22), rgb(59, 130, 246))',
              boxShadow: '0 10px 15px -3px rgba(132, 204, 22, 0.5), 0 4px 6px -2px rgba(132, 204, 22, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(132, 204, 22, 0.7), 0 4px 6px -2px rgba(132, 204, 22, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(132, 204, 22, 0.5), 0 4px 6px -2px rgba(132, 204, 22, 0.3)';
            }}
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Home Page
          </button>
        </div>

        {/* Error code */}
        <p className="mt-12 text-cyan-300/50 text-sm font-mono">
          ERROR_CODE: RESOURCE_NOT_FOUND_404
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.5);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}