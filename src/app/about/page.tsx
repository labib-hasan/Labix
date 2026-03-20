"use client";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Reuse interfaces from home page
interface Stat {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface SkillGroup {
  category: string;
  items: string[];
  percentage?: number;
}

interface TimelineItem {
  year: string;
  company: string;
  role: string;
  description: string;
}

const stats: Stat[] = [
  { value: "5+", label: "Years Experience", icon: "⭐", color: "from-yellow-400 to-orange-400" },
  { value: "50+", label: "Projects", icon: "🚀", color: "from-purple-400 to-pink-400" },
  { value: "30+", label: "Clients", icon: "👥", color: "from-blue-400 to-cyan-400" },
  { value: "15+", label: "Technologies", icon: "⚡", color: "from-green-400 to-emerald-400" },
];

const timeline: TimelineItem[] = [
  {
    year: "2024 - Present",
    company: "Freelance",
    role: "Senior Fullstack Developer",
    description: "Building premium portfolio websites and enterprise applications for global clients."
  },
  {
    year: "2022 - 2024",
    company: "TechCorp",
    role: "Lead Frontend Developer",
    description: "Led development team on multiple high-traffic web applications."
  },
  {
    year: "2020 - 2022",
    company: "StartupHub",
    role: "Fullstack Developer",
    description: "Developed scalable SaaS products from concept to production."
  },
  {
    year: "2019 - 2020",
    company: "WebAgency",
    role: "Junior Developer",
    description: "Gained expertise in modern JavaScript frameworks and responsive design."
  },
];

const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"]
  },
  {
    category: "DevOps",
    items: ["Docker", "AWS", "Vercel", "GitHub Actions", "Monitoring"]
  },
];

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id && entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    // Observe sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden lg:block transition-transform duration-100" />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid-about" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-about)" />
        </svg>
        {/* Particles */}
        {Array.from({length: 30}).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-float-particle"
            style={{
              width: `${1 + i%5}px`,
              height: `${1 + i%5}px`,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              animationDuration: `${15 + i%10}s`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300" style={{width: `${scrollProgress}%`}} />
      </div>

      <main className="relative">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Labib Hasan
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate fullstack developer crafting innovative digital experiences with cutting-edge technologies.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className={`px-6 max-w-7xl mx-auto py-32 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 hover:-translate-y-4 hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:opacity-10 transition-opacity" />
              <div className={`text-4xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400 relative z-10">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Bio & Timeline */}
        <section id="timeline" className={`px-6 max-w-7xl mx-auto py-32 ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  My Journey
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                From curiosity-driven coding to building enterprise solutions for global clients. 
                My passion for clean code, performance, and beautiful interfaces drives every project.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/projects" className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center">
                  View Projects
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-purple-400 text-white font-semibold hover:bg-white/5 backdrop-blur-sm transition-all duration-300">
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={idx} className="group relative flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-x-4 hover:scale-[1.02] transition-all duration-500">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl text-white">
                      {item.year.slice(0,4)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg mb-1">{item.role}</h3>
                      <p className="text-purple-400 mb-2">{item.company}</p>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="absolute left-12 top-6 w-px h-full bg-gradient-to-b from-purple-400/30 to-pink-400/30" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Overview */}
        <section id="skills" className={`px-6 py-32 max-w-6xl mx-auto ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="text-center group">
                <h3 className="text-2xl font-bold mb-8 text-white">{skillGroup.category}</h3>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, sidx) => (
                    <div key={sidx} className="group relative overflow-hidden rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400/50 transition-all duration-400 hover:scale-105">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{skill}</span>
                        <span className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono">
                          {(85 + (sidx * 3) + (idx * 2))}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full origin-left transition-all duration-1000 ease-out"
                          style={{ transform: `scaleX(${isVisible.skills ? (0.85 + (sidx * 0.03) + (idx * 0.02)) : 0})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
