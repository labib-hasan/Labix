"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  color: string;
  gradient: string;
  icon: string;
  features: string[];
  image: string;
  link: string;
  repo: string;
  year: string;
}

interface CategoryFilter {
  name: string;
  active: boolean;
}

const categories: CategoryFilter[] = [
  { name: 'All', active: true },
  { name: 'Web', active: false },
  { name: 'Mobile', active: false },
  { name: 'AI/ML', active: false },
  { name: 'E-Commerce', active: false },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'AI Analytics Platform',
    description: 'Enterprise dashboard with ML insights, real-time data, predictive analytics.',
    tags: ['Next.js', 'TensorFlow', 'D3.js', 'WebSocket'],
    category: 'AI/ML',
    color: 'from-violet-500 to-purple-600',
    gradient: 'from-violet-400/30 via-fuchsia-400/20 to-purple-400/30',
    icon: '📊',
    features: ['Real-time predictions', 'Interactive charts', 'Export tools'],
    image: '/a.png',
    link: 'https://analytics.labibhasan.com',
    repo: 'github.com/labibhasan/ai-analytics',
    year: '2024'
  },
  {
    id: '2',
    title: 'Global E-Commerce Hub',
    description: 'Scalable marketplace with AI recommendations, blockchain payments, multi-currency.',
    tags: ['Next.js', 'Stripe', 'GraphQL', 'Solidity'],
    category: 'E-Commerce',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-400/30 via-cyan-400/20 to-teal-400/30',
    icon: '🛍️',
    features: ['Smart contracts', 'AI recs', 'Multi-language'],
    image: '/a.png',
    link: 'https://marketplace.labibhasan.com',
    repo: 'github.com/labibhasan/ecommerce',
    year: '2024'
  },
  {
    id: '3',
    title: 'Design Collaboration Suite',
    description: 'Real-time collaborative design tool with version control and team workflows.',
    tags: ['React', 'Liveblocks', 'Fabric.js', 'WebRTC'],
    category: 'Web',
    color: 'from-emerald-500 to-teal-500',
    gradient: 'from-emerald-400/30 via-teal-400/20 to-green-400/30',
    icon: '🎨',
    features: ['Live sync', 'Version history', 'Team assets'],
    image: '/a.png',
    link: 'https://design.labibhasan.com',
    repo: 'github.com/labibhasan/design-suite',
    year: '2023'
  },
  {
    id: '4',
    title: 'Telemedicine Platform',
    description: 'HIPAA-compliant platform with video consults, EHR integration, AI diagnostics.',
    tags: ['Next.js', 'WebRTC', 'FHIR', 'AWS'],
    category: 'Web',
    color: 'from-rose-500 to-pink-500',
    gradient: 'from-rose-400/30 via-pink-400/20 to-red-400/30',
    icon: '🏥',
    features: ['Secure video', 'EHR API', 'AI assistant'],
    image: '/a.png',
    link: 'https://health.labibhasan.com',
    repo: 'github.com/labibhasan/telemedicine',
    year: '2023'
  },
  {
    id: '5',
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracker with AI coaching and social features.',
    tags: ['React Native', 'Expo', 'Firebase', 'TensorFlow Lite'],
    category: 'Mobile',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-400/30 via-red-400/20 to-yellow-400/30',
    icon: '🏃‍♂️',
    features: ['AI workouts', 'Social challenges', 'Progress tracking'],
    image: '/a.png',
    link: 'https://fitness.labibhasan.com',
    repo: 'github.com/labibhasan/fitness-app',
    year: '2023'
  },
];

export default function Projects() {
  const [filters, setFilters] = useState(categories);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeFilter = filters.find(f => f.active)?.name || 'All';
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [filters]);

  const toggleFilter = (name: string) => {
    setFilters(filters.map(f => ({
      ...f,
      active: f.name === name
    })));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Background & Progress */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" style={{transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'left'}} />
        {/* Orbs */}
        <div className="absolute -top-48 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute -bottom-48 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-50 animate-pulse-slow" style={{animationDelay: '2s'}} />
      </div>

      <main className="relative pt-8">
        {/* Header */}
        <section className="px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Projects Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Handcrafted digital experiences showcasing modern development and design excellence.
          </p>
        </section>

        {/* Filters */}
        <section className="px-6 mb-16">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => toggleFilter(filter.name)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform ${
                  filter.active
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-white/5 text-gray-400 border border-white/20 hover:bg-white/10 hover:text-white hover:scale-105'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-500 ${Object.keys(isVisible).length > 0 ? 'opacity-100' : 'opacity-0'}`}>
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 h-[500px] transition-all duration-700 hover:scale-105 hover:-translate-y-6 hover:shadow-2xl hover:shadow-purple-500/25"
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image/Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br group-hover:opacity-90 transition-opacity duration-500" style={{backgroundImage: `linear-gradient(${project.gradient})`}}>
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill 
                    className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`text-4xl p-3 rounded-2xl bg-white/10 backdrop-blur-sm ${project.color} group-hover:scale-110 transition-transform duration-500`}>
                      {project.icon}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0,2).map((feat, fidx) => (
                        <span key={fidx} className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white leading-tight line-clamp-2 group-hover:line-clamp-none">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tidx) => (
                      <span
                        key={tidx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-white/5 to-white/10 text-purple-300 border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3 pt-4 border-t border-white/10">
                    <Link
                      href={project.link}
                      target="_blank"
                      className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      Live Demo
                    </Link>
                    <Link
                      href={project.repo}
                      target="_blank"
                      className="px-4 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Code
                    </Link>
                  </div>

                  {/* Hover Overlay */}
                  {hoveredProject?.id === project.id && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <div className="w-full">
                        <h4 className="text-lg font-bold mb-2">{project.year} • {project.category}</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {project.features.map((feat, fidx) => (
                            <li key={fidx} className="flex items-center">
                              <svg className="w-4 h-4 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-32">
              <div className="text-6xl mb-8">🔍</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-300">No projects found</h3>
              <p className="text-xl text-gray-500 max-w-md mx-auto">Try adjusting your filters or check back soon for new work.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
