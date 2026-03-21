"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Define types
interface MousePosition {
  x: number;
  y: number;
}

interface VisibilityState {
  about?: boolean;
  projects?: boolean;
  skills?: boolean;
  contact?: boolean;
  services?: boolean;
  process?: boolean;
  [key: string]: boolean | undefined;
}

interface Service {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  features: string[];
  price: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface Stat {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  gradient: string;
  icon: string;
  features: string[];
  image?: string;
  category: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface SocialLink {
  icon: string;
  name: string;
  color: string;
  url: string;
}

// Deterministic "random" values based on seed
const getPseudoRandom = (seed: number, min: number, max: number) => {
  const x = Math.sin(seed) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
};

// Particle component with deterministic values
const Particle = ({ index }: { index: number }) => {
  const width = getPseudoRandom(index * 1, 1, 5);
  const height = getPseudoRandom(index * 2, 1, 5);
  const left = getPseudoRandom(index * 3, 0, 100);
  const top = getPseudoRandom(index * 4, 0, 100);
  const duration = getPseudoRandom(index * 5, 10, 30);
  const delay = getPseudoRandom(index * 6, 0, 5);

  return (
    <div
      className="absolute rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20"
      style={{
        width: width + 'px',
        height: height + 'px',
        left: left + '%',
        top: top + '%',
        animation: `float-particle ${duration}s linear infinite`,
        animationDelay: delay + 's',
      }}
    />
  );
};

// Skill item with deterministic percentage
const SkillItem = ({ skill, index, isVisible }: { skill: string; index: number; isVisible: boolean }) => {
  const percentage = Math.floor(getPseudoRandom(index * 100, 80, 99));
  
  return (
    <div className="group relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{skill}</span>
        <span className="text-xs text-gray-500">{percentage}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transform origin-left transition-transform duration-1000"
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [activeService, setActiveService] = useState<number>(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const stats: Stat[] = [
    { value: "50+", label: "Projects Completed", icon: "🚀", color: "from-purple-400 to-pink-400" },
    { value: "30+", label: "Happy Clients", icon: "👥", color: "from-blue-400 to-cyan-400" },
    { value: "98%", label: "Client Satisfaction", icon: "⭐", color: "from-yellow-400 to-orange-400" },
    { value: "24/7", label: "Support", icon: "⚡", color: "from-green-400 to-emerald-400" },
  ];

  const services: Service[] = [
    {
      title: "Custom Web Development",
      description: "Tailored web solutions built with modern technologies to meet your specific business needs.",
      icon: "💻",
      gradient: "from-purple-500 to-pink-500",
      features: ["React/Next.js", "Node.js/Python", "PostgreSQL/MongoDB", "REST/GraphQL APIs"],
      price: "Starting at $5k"
    },
    {
      title: "E-Commerce Solutions",
      description: "Scalable online stores with secure payments, inventory management, and seamless user experience.",
      icon: "🛍️",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Payment Integration", "Inventory Management", "Shopping Cart", "Order Tracking"],
      price: "Starting at $8k"
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform mobile applications that deliver native-like performance and beautiful UI.",
      icon: "📱",
      gradient: "from-green-500 to-emerald-500",
      features: ["React Native", "iOS/Android", "App Store Deployment", "Push Notifications"],
      price: "Starting at $10k"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance engagement and drive conversions.",
      icon: "🎨",
      gradient: "from-orange-500 to-red-500",
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
      price: "Starting at $3k"
    },
    {
      title: "SEO & Digital Marketing",
      description: "Data-driven strategies to improve visibility, drive traffic, and boost conversions.",
      icon: "📈",
      gradient: "from-purple-500 to-indigo-500",
      features: ["SEO Optimization", "Content Strategy", "Analytics Setup", "Conversion Tracking"],
      price: "Starting at $2k/mo"
    },
    {
      title: "Maintenance & Support",
      description: "Ongoing technical support, security updates, and performance optimization.",
      icon: "🔧",
      gradient: "from-gray-500 to-slate-500",
      features: ["24/7 Monitoring", "Security Patches", "Performance Tuning", "Backup Solutions"],
      price: "Starting at $500/mo"
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: 1,
      title: "Discovery",
      description: "We dive deep into your business goals, target audience, and project requirements.",
      icon: "🔍"
    },
    {
      step: 2,
      title: "Planning",
      description: "Creating a detailed roadmap with timelines, milestones, and technology stack selection.",
      icon: "📋"
    },
    {
      step: 3,
      title: "Design",
      description: "Crafting beautiful, intuitive interfaces with focus on user experience.",
      icon: "🎨"
    },
    {
      step: 4,
      title: "Development",
      description: "Building your solution with clean code, best practices, and regular updates.",
      icon: "⚙️"
    },
    {
      step: 5,
      title: "Testing",
      description: "Rigorous quality assurance across all devices and browsers.",
      icon: "🧪"
    },
    {
      step: 6,
      title: "Launch",
      description: "Smooth deployment with ongoing support and optimization.",
      icon: "🚀"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Labib Hasan",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer with 5+ years of experience building scalable web applications.",
      image: "/team/labib.jpg",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      bio: "Passionate designer creating beautiful and intuitive user experiences.",
      image: "/team/sarah.jpg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Backend Architect",
      bio: "Expert in building robust, scalable server-side solutions and databases.",
      image: "/team/michael.jpg",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      bio: "Ensuring smooth project delivery and clear communication throughout.",
      image: "/team/emily.jpg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    }
  ];

  const projects: Project[] = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Enterprise-grade analytics dashboard with machine learning insights for data-driven decisions.",
      tags: ["Next.js 14", "TensorFlow.js", "D3.js", "WebSocket"],
      color: "from-violet-500 to-purple-600",
      gradient: "from-violet-400/30 via-fuchsia-400/20 to-purple-400/30",
      icon: "📊",
      features: ["Real-time ML", "Custom Dashboards", "Data Export"],
      category: "Enterprise"
    },
    {
      title: "Global E-Commerce Ecosystem",
      description: "Scalable marketplace platform serving 100k+ users with AI recommendations and multi-currency.",
      tags: ["Next.js", "Stripe", "GraphQL", "AWS"],
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-400/30 via-cyan-400/20 to-teal-400/30",
      icon: "🛍️",
      features: ["Smart Payments", "AI Recommendations", "Multi-language"],
      category: "E-Commerce"
    },
    {
      title: "Healthcare Telemedicine Hub",
      description: "HIPAA-compliant telemedicine platform with video consultations and EHR integration.",
      tags: ["Next.js", "WebRTC", "FHIR", "AWS"],
      color: "from-rose-500 to-pink-500",
      gradient: "from-rose-400/30 via-pink-400/20 to-red-400/30",
      icon: "🏥",
      features: ["Secure Video", "EHR Integration", "AI Diagnostics"],
      category: "Healthcare"
    },
    {
      title: "FinTech Dashboard",
      description: "Comprehensive financial management platform with real-time analytics and reporting.",
      tags: ["React", "Node.js", "PostgreSQL", "Redis"],
      color: "from-emerald-500 to-teal-500",
      gradient: "from-emerald-400/30 via-teal-400/20 to-green-400/30",
      icon: "💰",
      features: ["Real-time Analytics", "Transaction Tracking", "Reporting"],
      category: "FinTech"
    }
  ];

  const skills: SkillGroup[] = [
    { category: "Frontend", items: ["React/Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Python", "GraphQL", "PostgreSQL", "MongoDB"] },
    { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform"] },
    { category: "Mobile", items: ["React Native", "Flutter", "PWA", "Expo", "iOS/Android"] },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechFlow",
      content: "Labib transformed our vision into a stunning web application. His attention to detail and technical expertise are unmatched.",
      rating: 5,
      company: "TechFlow"
    },
    {
      name: "Michael Chen",
      role: "Product Lead, InnovateLabs",
      content: "Working with Labib was a game-changer. He delivered beyond expectations with cutting-edge solutions.",
      rating: 5,
      company: "InnovateLabs"
    },
    {
      name: "Emma Williams",
      role: "Founder, CreativeStudio",
      content: "The most talented developer I've worked with. His designs are not just beautiful but incredibly functional.",
      rating: 5,
      company: "CreativeStudio"
    },
    {
      name: "David Kumar",
      role: "CTO, HealthSync",
      content: "Exceptional technical skills and great communication. He delivered our healthcare platform ahead of schedule.",
      rating: 5,
      company: "HealthSync"
    }
  ];

  const socialLinks: SocialLink[] = [
    { icon: "𝕏", name: "Twitter", color: "from-sky-400 to-blue-500", url: "#" },
    { icon: "in", name: "LinkedIn", color: "from-blue-600 to-blue-700", url: "#" },
    { icon: "📷", name: "Instagram", color: "from-pink-500 to-purple-500", url: "#" },
    { icon: "⌨️", name: "GitHub", color: "from-slate-700 to-slate-900", url: "#" },
  ];

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          transform: mounted ? `translate(${mousePosition.x * 100}px, ${mousePosition.y * 100}px)` : 'none',
          transition: 'transform 0.1s ease',
        }}
      >
        <div className="w-full h-full rounded-full bg-white scale-0 group-hover:scale-100 transition-transform"></div>
      </div>

      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
        
        {/* Particle Network */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="small-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              </pattern>
              <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
                <rect width="160" height="160" fill="url(#small-grid)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Glowing Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          style={{ width: mounted ? `${scrollProgress}%` : '0%' }}
        />
      </div>

      
      <main className="relative pt-20">
        {/* Premium Hero Section */}
        <section className="relative px-6 max-w-7xl mx-auto min-h-[90vh] flex items-center mb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-300">Available for new projects</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gray-300">Build Your</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Digital Empire
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                We craft exceptional web experiences that drive growth. From startups to enterprises, 
                we build scalable, performant solutions that users love.
              </p>

              <div className="flex gap-4">
                <a
                  href="#services"
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  <span className="relative z-10">Our Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  Get Quote
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-8 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xs font-bold border-2 border-[#0a0a0f]">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">Trusted by 30+ companies</span>
              </div>
            </div>

            {/* Right Content - 3D Card */}
            <div className="relative perspective-1000">
              <div className="relative transform preserve-3d animate-float-3d">
                <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 z-10"></div>
                  <Image
                    src="/a.png"
                    alt="Labib Hasan"
                    width={600}
                    height={900}
                    className="w-full h-auto object-contain z-0"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative px-6 max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`text-4xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section 
          id="services" 
          ref={setSectionRef(0)} 
          className="relative px-6 max-w-7xl mx-auto mb-40"
        >
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive web development solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Icon */}
                <div className={`text-5xl mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm font-semibold text-purple-400">{service.price}</span>
                  <button className="text-sm text-gray-300 hover:text-white transition-colors group">
                    Learn More 
                    <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section 
          id="process" 
          ref={setSectionRef(1)} 
          className="relative px-6 max-w-7xl mx-auto mb-40"
        >
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible.process ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Our Process
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A systematic approach to delivering exceptional results
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 hidden lg:block"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative group text-center transition-all duration-1000 transform ${
                    isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold z-10">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-300">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section 
          id="projects" 
          ref={setSectionRef(2)} 
          className="relative px-6 max-w-7xl mx-auto mb-40"
        >
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real-world solutions that drive business growth
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Enterprise', 'E-Commerce', 'Healthcare', 'FinTech'].map((category, idx) => (
              <button
                key={idx}
                className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 ${
                  isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                {/* Category Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300">
                  {project.category}
                </div>

                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`text-4xl w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.features.map((feature, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button className="flex-1 text-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                    View Case Study
                  </button>
                  <button className="px-4 py-2 rounded-xl border border-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/10 transition-all">
                    Live Demo →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section 
          id="team" 
          ref={setSectionRef(3)} 
          className="relative px-6 max-w-7xl mx-auto mb-40"
        >
          
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          ref={setSectionRef(4)} 
          className="relative px-6 max-w-7xl mx-auto mb-40"
        >
          <div className={`p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-1000 transform ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    {skillGroup.category}
                  </h3>
                  {skillGroup.items.map((skill, i) => (
                    <SkillItem 
                      key={i} 
                      skill={skill} 
                      index={idx * 10 + i} 
                      isVisible={!!isVisible.skills} 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        

        {/* CTA Section */}
        <section className="relative px-6 max-w-5xl mx-auto mb-40">
          <div className="relative p-12 md:p-20 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-white/10 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="absolute inset-0 w-full h-full">
                <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#cta-grid)"/>
              </svg>
            </div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to Start Your Project?
                </span>
              </h2>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Let's discuss how we can help bring your vision to life with cutting-edge technology..
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
  href="https://wa.me/+8801877228505"
  target="_blank"
  rel="noopener noreferrer"
> 
  <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25">
    <span className="relative z-10">Get Free Consultation</span>
    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
</a>
               {/*  <button className="px-8 py-4 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all duration-300">
                  View Portfolio
                </button> */}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-purple-400">📧</span>
                  labibhasanariyan@gmail.com
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-purple-400">📱</span>
                  +8801877228505
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-purple-400">📍</span>
                  GEC, Chittagong, Bangladesh.
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </main>

      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-3d {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-20px) rotateX(5deg) rotateY(5deg);
          }
          75% {
            transform: translateY(20px) rotateX(-5deg) rotateY(-5deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        .animate-float-3d {
          animation: float-3d 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}