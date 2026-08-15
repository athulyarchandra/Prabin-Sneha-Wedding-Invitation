import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin, Image, HeartHandshake, MessageSquare } from 'lucide-react';

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Cover', icon: Sparkles },
    { id: 'scratch-card-section', label: 'Date Reveal', icon: Calendar },
    { id: 'invitation-details', label: 'Invitation', icon: HeartHandshake },
    { id: 'venue-section', label: 'Venue & Map', icon: MapPin },
    { id: 'gallery-section', label: 'Moments', icon: Image },
    { id: 'rsvp-section', label: 'RSVP', icon: Sparkles },
    { id: 'guestbook-section', label: 'Blessings', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        if (item.id === 'hero' && window.scrollY < 300) {
          setActiveSection('hero');
          break;
        }
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_10px_25px_rgba(147,100,146,0.25)] border border-[#d4af37]/40 flex items-center gap-1 sm:gap-2 max-w-[90vw] overflow-x-auto"
      aria-label="Invitation story navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-[#936492] text-white shadow-xs'
                : 'text-[#7a5979] hover:text-[#3b1d3a] hover:bg-[#f4ecf3]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className={isActive ? 'inline' : 'hidden md:inline'}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
