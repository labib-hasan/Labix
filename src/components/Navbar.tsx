"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
     <nav
  className={`fixed top-0 left-0 right-0 z-50 
  backdrop-blur-xl bg-[#0a0a0f]/90 
  border-b border-white/10 
  transition-all duration-500
  h-22 flex items-center justify-between 
  ${isScrolled ? 'shadow-2xl shadow-purple-500/10' : 'shadow-xl shadow-black/30'}
`}
>
       <div className="w-full px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between w-full">
           <div className="flex items-center perspective-1000 justify-between">
                         <Image
                           src="/l.png"
                           alt="Logo"
                           width={140}
                           height={140}
                           className="h-42 mt-[-28px] mb-[-38px] ml-[-20px] w-auto object-contain animate-horizontal-spin"
                           priority
                         />
                       </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm lg:text-base font-semibold rounded-xl transition-all duration-500 group hover:scale-105 hover:-translate-y-1 ${
                    pathname === item.href
                      ? 'text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 shadow-xl shadow-purple-500/30 ring-1 ring-purple-400/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg hover:shadow-purple-400/20 hover:ring-1 hover:ring-white/20'
                  }`}
                >
                  {item.name}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 blur-sm group-hover:opacity-30 group-hover:blur-none rounded-xl transition-all duration-500 scale-[1.05] origin-center" />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <Link 
              href="/contact"
              className="hidden md:flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-sm lg:text-base shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.05] hover:-translate-y-px transition-all duration-500 ring-2 ring-purple-400/50 hover:ring-pink-500/60 animate-pulse-slow"
            >
              Hire Me →
            </Link>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-400 ring-1 ring-white/20 hover:ring-purple-400/50 flex items-center justify-center w-12 h-12"
              aria-label="Toggle menu"
            >
              <svg className={`w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 backdrop-blur-2xl bg-black/80" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-0 right-0 top-16 z-50 backdrop-blur-3xl bg-gradient-to-b from-[#0a0a0f]/98 to-[#0a0a0f]/95 border-b border-white/20 shadow-2xl shadow-black/50 slide-in-from-top duration-700">
            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 lg:py-20 space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-left py-4 px-6 text-xl sm:text-2xl lg:text-3xl font-black transition-all duration-700 hover:scale-105 hover:-translate-x-2 hover:shadow-2xl hover:shadow-purple-500/40 relative group flex items-center ${
                    pathname === item.href ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 scale-105 shadow-2xl shadow-blue-500/30' : 'text-gray-200 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <span className="flex-1">{item.name}</span>
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ml-4 opacity-0 group-hover:opacity-100" />
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl -inset-2 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 scale-110" />
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-6 px-12 mx-auto rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-xl sm:text-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-700 ring-4 ring-purple-400/60 hover:ring-pink-500/70 max-w-md animate-bounce-slow origin-center"
              >
                Let's Work Together 🚀
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

