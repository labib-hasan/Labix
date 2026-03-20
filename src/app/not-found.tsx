"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a0a2e] flex items-center justify-center px-6 py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_40%_40%,rgba(255,119,198,0.3),transparent)] opacity-20 animate-pulse-slow" />
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-md w-full text-center space-y-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl shadow-purple-500/10">
        {/* 404 Illustration */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-xl animate-pulse opacity-75" />
          <div className="relative w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <div className="text-4xl font-bold text-white drop-shadow-lg">404</div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 p-6 bg-white/5 rounded-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">∞</div>
            <div className="text-sm text-gray-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-500">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">🚀</div>
            <div className="text-sm text-gray-500">Innovation</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-400 transform hover:scale-105 text-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Back to Home
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </span>
          </Link>
          <Link
            href="/projects"
            className="block w-full text-center py-4 px-8 rounded-2xl border-2 border-white/30 backdrop-blur-sm text-white font-semibold hover:bg-white/10 hover:border-purple-400 transition-all duration-300"
          >
            Explore Projects
          </Link>
        </div>

        {/* Auto-redirect */}
        <div className="pt-8 border-t border-white/20 text-sm text-gray-500">
          Redirecting to home in <span className="font-mono text-purple-400 font-bold text-lg">{countdown}</span>s
        </div>
      </div>
    </div>
  );
}
