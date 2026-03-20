"use client";
import { useState } from 'react';
import Link from 'next/link';

interface AvailabilitySlot {
  day: string;
  times: string[];
}

const socialLinks = [
  { icon: '𝕏', name: 'Twitter', color: 'from-sky-400 to-blue-400', url: 'https://twitter.com/labibhasan' },
  { icon: 'in', name: 'LinkedIn', color: 'from-blue-600 to-blue-700', url: 'https://linkedin.com/in/labibhasan' },
  { icon: '📷', name: 'Instagram', color: 'from-pink-500 to-purple-500', url: 'https://instagram.com/labibhasan' },
  { icon: '⌨️', name: 'GitHub', color: 'from-slate-700 to-slate-900', url: 'https://github.com/labibhasan' },
];

const availability: AvailabilitySlot[] = [
  { day: 'Monday', times: ['9AM - 12PM', '2PM - 6PM'] },
  { day: 'Tuesday', times: ['9AM - 6PM'] },
  { day: 'Wednesday', times: ['9AM - 12PM', '2PM - 6PM'] },
  { day: 'Thursday', times: ['9AM - 6PM'] },
  { day: 'Friday', times: ['9AM - 4PM'] },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f23] to-[#0a0a0f] text-white">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '3s'}} />
        <div className="absolute top-1/2 left-5 w-32 h-32 bg-gradient-to-r from-blue-500 to-emerald-500/30 rounded-full blur-xl animate-float-3d" />
      </div>

      <main className="relative">
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center px-6 py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-gray-300">Ready to start your</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Next Project?
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Let's discuss your ideas and bring them to life with cutting-edge technology.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
                  Start Project
                </button>
                <button className="px-8 py-4 rounded-2xl border-2 border-white/30 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all duration-300">
                  View Work →
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="perspective-1000">
                <div className="preserve-3d animate-float-3d">
                  <div className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-md mx-auto">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-emerald-400">Available Now</div>
                          <div className="text-sm text-gray-400">Next 2 slots free</div>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-white mb-2">📅 Quick Chat</div>
                        <div className="text-lg text-gray-400">15 min discovery call</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <section>
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Send Message
            </h2>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Project discussion"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-vertical"
                    placeholder="Tell me about your project requirements, timeline, and goals..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full group relative px-8 py-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold text-xl shadow-lg shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-400 transform hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Send Message</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 -skew-x-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur" />
                </button>
              </form>
            ) : (
              <div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-emerald-400 to-green-400 rounded-3xl flex items-center justify-center animate-bounce">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-emerald-400">Message Sent!</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                >
                  Send Another
                </button>
              </div>
            )}
          </section>

          {/* Info Panel */}
          <section className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:flex-col lg:justify-center space-y-12 lg:space-y-16">
            {/* Availability */}
            <div>
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Availability
              </h3>
              <div className="space-y-4">
                {availability.map((slot, idx) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-pink-500/5 hover:border-purple-400/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-white">{slot.day}</span>
                      <div className="flex gap-1">
                        {slot.times.map((time, tdx) => (
                          <span key={tdx} className="px-3 py-1 bg-white/10 text-xs rounded-full text-gray-300">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div>
              <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connect Directly
              </h3>
              <div className="space-y-4 mb-12">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-white">Email</div>
                      <div className="text-gray-400">hello@labibhasan.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-white">Phone</div>
                      <div className="text-gray-400">+1 (555) 123-4567</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-bold mb-6 text-white">Follow my work</h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      className={`group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:${social.color} hover:border-transparent hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-400 transform hover:scale-105 flex items-center gap-4`}
                      onMouseEnter={() => setHoveredSocial(social.name)}
                      onMouseLeave={() => setHoveredSocial('')}
                    >
                      <div className={`text-2xl transition-all ${hoveredSocial === social.name ? 'scale-110' : ''}`}>
                        {social.icon}
                      </div>
                      <span className={`font-semibold transition-all ${hoveredSocial === social.name ? 'opacity-100 translate-x-1' : 'opacity-0 -translate-x-2'}`}>
                        {social.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
