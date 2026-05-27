import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, Command, ArrowRight } from 'lucide-react';
import { DEVELOPER_BIO } from '../data';

interface HeaderProps {
  onCalculateClick: () => void;
}

export default function Header({ onCalculateClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Track scroll position for header stickiness/background blur and active sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['hero', 'skills', 'projects', 'calculator', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time ticking UTC clock for absolute visual precision in margins (non-clutter human label)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to a clean localized time string (e.g., 2:34:11 AM PST)
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Selected Work' },
    { id: 'calculator', label: 'Quote Builder' },
    { id: 'experience', label: 'Milestones' },
    { id: 'contact', label: 'Inquire' },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/80 border-b border-neutral-800/60 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Author Brand */}
        <button 
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-3 group text-left cursor-pointer"
          id="header-brand-btn"
        >
          <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700/80 flex items-center justify-center transition-all duration-300 group-hover:border-neutral-500 overflow-hidden relative">
            <img 
              src="/assets/images/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-300"
            />
            {/* Subtle glow effect */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500/80 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </div>
          <div>
            <span className="block font-display text-sm font-semibold text-neutral-100 tracking-tight leading-none">
              {DEVELOPER_BIO.name}
            </span>
            <span className="font-mono text-[10px] text-neutral-400 group-hover:text-neutral-300 transition-colors leading-none mt-1 inline-block">
              {DEVELOPER_BIO.availability}
            </span>
          </div>
        </button>

        {/* Central Nav Menu */}
        <nav className="hidden md:flex items-center bg-neutral-950/80 border border-neutral-800/80 px-1.5 py-1.5 rounded-full relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 font-sans text-xs tracking-wide relative rounded-full font-medium transition-colors cursor-pointer text-neutral-400 hover:text-neutral-200"
              id={`nav-btn-${item.id}`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-neutral-800 rounded-full border border-neutral-700/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${
                activeSection === item.id ? 'text-amber-400 font-semibold' : ''
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Right-Side Time and Live Call To Action */}
        <div className="flex items-center gap-5">
          {/* Subtle Dynamic Time Metric */}
          <div className="hidden lg:flex flex-col items-end border-r border-neutral-800 pr-5">
            <span className="font-sans text-[10px] text-neutral-500 tracking-wider">LOCAL TIME</span>
            <div className="flex items-center gap-1.5 mt-0.5" title="Panabo City (GMT+8)">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="font-mono text-xs text-neutral-300 tracking-wide">{currentTime || '--:--:--'}</span>
            </div>
          </div>

          {/* Quick interactive quote trigger */}
          <button
            onClick={onCalculateClick}
            className="group px-4 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 font-sans text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
            id="header-cta-btn"
          >
            <span>Quote Builder</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
