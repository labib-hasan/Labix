import Link from 'next/link';

export default function Footer() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'UI/UX Design',
    'Consulting',
  ];

  return (
    <footer className="relative px-6 py-12 border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Labib Hasan
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              {services.map((service, idx) => (
                <li key={idx} className="text-sm text-gray-400 hover:text-purple-400 transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Contact Info</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li> labibhasanariyan@gmail.com</li>
              <li>+8801877228505</li>
              <li>GEC, Chittagong, Bangladesh</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/10 text-sm text-gray-400">
          © 2026 Labib Hasan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
