/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Sparkles, 
  Code, 
  Layers, 
  Cpu, 
  Shield, 
  ArrowRight, 
  Quote, 
  CheckCircle2, 
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';

// Custom modular components
import Header from './components/Header';
import ProjectShowcase from './components/ProjectShowcase';
import InteractiveCostCalculator from './components/InteractiveCostCalculator';
import ContactForm from './components/ContactForm';
import ExperienceTimeline from './components/ExperienceTimeline';

// Global data configuration
import { DEVELOPER_BIO, SKILL_ITEMS, TESTIMONIALS } from './data';

export default function App() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | 'frontend' | 'backend' | 'architecture' | 'devops'>('all');
  const [proposalText, setProposalText] = useState('');
  const [proposalPrice, setProposalPrice] = useState(0);

  // Filter skills list based on categories
  const filteredSkills = SKILL_ITEMS.filter(skill => 
    selectedSkillCategory === 'all' || skill.category === selectedSkillCategory
  );

  const handleApplyProposal = (summaryText: string, priceTotal: number) => {
    setProposalText(summaryText);
    setProposalPrice(priceTotal);
    
    // Smooth scroll down to the secure commission / contact section instantly
    const contactBlock = document.getElementById('contact');
    if (contactBlock) {
      contactBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearProposal = () => {
    setProposalText('');
    setProposalPrice(0);
  };

  const handleScrollToCalculator = () => {
    const calcBlock = document.getElementById('calculator');
    if (calcBlock) {
      calcBlock.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-amber-400 selection:text-neutral-950 relative">
      
      {/* Absolute Aesthetic Background Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 grid-bg-overlay opacity-[0.24]" />
        <div className="absolute top-0 left-0 right-0 h-[600px] ambient-spot-1" />
        <div className="absolute top-[40%] right-0 left-0 h-[800px] ambient-spot-3" />
        <div className="absolute bottom-0 right-0 left-0 h-[700px] ambient-spot-2" />
      </div>

      {/* Floating Header Navigation */}
      <Header onCalculateClick={handleScrollToCalculator} />

      {/* Main Structural Editorial Scroll */}
      <main className="pt-24 pb-16 space-y-24 md:space-y-36 relative z-10">

        {/* 1. HERO SECTION */}
        <section id="hero" className="relative max-w-7xl mx-auto px-6 pt-8 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Pitch - Left Layout (7 columns) */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
              {/* Client Availability Flash Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-805 px-3 py-1.5 rounded-full"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="font-mono text-[11px] text-neutral-300 font-medium tracking-wide">
                  {DEVELOPER_BIO.availability} (Rate: {DEVELOPER_BIO.rate})
                </span>
              </motion.div>

              {/* Display Headline */}
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-50 tracking-tight leading-tighter"
                >
                  Kevin O. Caidic
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-display text-lg md:text-2xl text-amber-400 font-semibold leading-tight"
                >
                  {DEVELOPER_BIO.title}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-sans text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed"
                >
                  {DEVELOPER_BIO.tagline}
                </motion.p>
              </div>

              {/* Call to action group */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById('projects');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group px-5 py-3 bg-neutral-100 hover:bg-white text-neutral-950 font-sans text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow"
                  id="hero-projects-cta"
                >
                  <span>Selected Work</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={handleScrollToCalculator}
                  className="px-5 py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 font-sans text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer"
                  id="hero-calculator-cta"
                >
                  Build Custom Proposal
                </button>
              </motion.div>

              {/* Fine Metadata Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-5 pt-4 text-neutral-500 font-mono text-[11px]"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-amber-500" />
                  <span>{DEVELOPER_BIO.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={12} className="text-amber-500" />
                  <span>Available Worldwide</span>
                </div>
              </motion.div>
            </div>

             {/* Profile Avatar / Framed Mockup - Right (5 columns) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl relative z-10 group overflow-hidden shadow-2xl p-3 glass-card deluxe-sheen"
              >
                {/* Visual grid accent card decoration */}
                <div className="absolute inset-0 border border-neutral-700/25 rounded-2xl pointer-events-none m-1 z-20 group-hover:border-amber-500/30 transition-colors" />
                <div className="absolute top-2.5 left-2.5 font-mono text-[9px] bg-neutral-950/90 px-2 py-0.5 rounded border border-neutral-800 text-neutral-400 z-20 leading-none">
                  PORTRAIT_FEED_ACTIVE
                </div>
                
                {/* Real-world professional generated artwork image */}
                <img 
                  src={DEVELOPER_BIO.profileImage} 
                  alt={DEVELOPER_BIO.name} 
                  className="w-full h-full object-cover rounded-xl filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-700 brightness-[0.88] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />

                {/* Status indicator button overlay */}
                <div className="absolute bottom-5 right-5 bg-neutral-950/95 border border-neutral-800 px-3 py-1.5 rounded-lg flex items-center gap-2 z-20 shadow-lg backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-neutral-300 font-bold tracking-wider">SECURE_VERIFIED_CORE</span>
                </div>
              </motion.div>

              {/* Top ambient blurred shape */}
              <div className="absolute -top-12 -left-12 w-44 h-44 bg-amber-500/10 rounded-full blur-[80px]" />
            </div>

          </div>

          {/* Quantitative Performance Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24 border-t border-neutral-900/60 pt-8"
          >
            {DEVELOPER_BIO.metrics.map((metric, index) => (
              <div key={index} className="glass-card glass-card-hover p-5 rounded-xl space-y-1 relative group overflow-hidden transition-all duration-300">
                {/* Thin top status highlight indicator */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500" />
                <span className="block font-display text-2xl md:text-3xl font-extrabold text-amber-400 tracking-tight leading-none">
                  {metric.value}
                </span>
                <span className="block font-sans text-xs text-neutral-400 font-medium">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 2. SKILL MATRIX / TECH STACK SECTION */}
        <section id="skills" className="max-w-7xl mx-auto px-6 relative z-10 scroll-mt-24">
          <div className="space-y-8">
            {/* Section Heading with Swiss-style Left Border Accent */}
            <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500">
              <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
                <Code size={11} className="text-amber-500 animate-pulse" />
                <span>SPECIFICATE_02 // SYSTEM_STACK</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
                Technology Ecosystem
              </h2>
              <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
                A highly-calibrated custom stack engineered for maximum throughput, pristine interactive rendering, and zero-stutter web experiences.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2.5 pb-2 border-b border-neutral-900/60">
              {(['all', 'frontend', 'backend', 'architecture', 'devops'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-4 py-2 font-mono text-[10.5px] rounded-lg border tracking-wider transition-all uppercase cursor-pointer flex items-center gap-2 ${
                    selectedSkillCategory === cat
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold shadow-lg'
                      : 'bg-neutral-900/40 border-neutral-850 text-neutral-400 hover:text-neutral-200 hover:border-neutral-750'
                  }`}
                  id={`skill-filter-btn-${cat}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-350 ${
                    selectedSkillCategory === cat ? 'bg-amber-400 animate-pulse' : 'bg-neutral-700'
                  }`} />
                  <span>{cat === 'all' ? 'All Skills' : cat}</span>
                </button>
              ))}
            </div>

            {/* Animated Skills Grid Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="glass-card glass-card-hover p-5 rounded-xl space-y-4 relative overflow-hidden group transition-all duration-300 text-left"
                  >
                    {/* Glowing Accent Spot inside */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors" />

                    {/* Category Label */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest bg-neutral-950/60 border border-neutral-850 px-2 py-0.5 rounded leading-none">
                        {skill.category}
                      </span>
                      <span className="font-mono text-xs text-amber-400 font-extrabold">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Skill Name */}
                    <div className="relative z-10">
                      <h4 className="font-display text-sm md:text-base font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="font-sans text-[11px] text-neutral-500 mt-0.5">
                        {skill.yearsOfExp} Years Active Operational Production
                      </p>
                    </div>

                    {/* Styled metric indicator bar */}
                    <div className="w-full h-1 bg-neutral-950 border border-neutral-900 rounded-full overflow-hidden relative z-10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" 
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORK / PORTFOLIO SHOWCASE */}
        <section id="projects" className="max-w-7xl mx-auto px-6 relative z-10 scroll-mt-24">
          <ProjectShowcase />
        </section>

        {/* 4. DESIGN ESTIMATOR BOARD & CLIENT INQUIRY DOCK */}
        <section id="calculator" className="max-w-7xl mx-auto px-6 relative z-10 scroll-mt-24">
          <div className="glass-card p-1 rounded-3xl overflow-hidden relative group">
            {/* Ambient gold glow highlight inside the calculator block */}
            <div className="absolute -top-[15%] -left-[10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[90px]" />
            <div className="absolute -bottom-[15%] -right-[10%] w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[90px]" />

            <div className="bg-[#09090b]/90 p-6 md:p-10 rounded-2.5xl space-y-12 relative z-10">
              
              {/* Cost Calculator Module */}
              <InteractiveCostCalculator onApplyProposal={handleApplyProposal} />

              {/* Commission form Section Anchor */}
              <div id="contact" className="pt-8 border-t border-neutral-900/60 scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Side Quick Benefits Panel */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <span className="font-mono text-[9px] text-[#8c8c9e] uppercase tracking-widest block bg-neutral-900/50 border border-neutral-850 px-2.5 py-1 rounded inline-block">
                      SPECIFICATE_04 // TIMELINE_PIPELINE
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-neutral-100 tracking-tight leading-none uppercase">
                      Engagement Compass
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Workflow Step 1 */}
                      <div className="flex gap-4 glass-card p-4.5 rounded-xl border border-neutral-850/60 hover:border-neutral-700/60 transition-colors">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                          01
                        </span>
                        <div>
                          <h5 className="font-sans text-[12.5px] font-bold text-neutral-200">
                            Proposal Parsing & Alignment
                          </h5>
                          <p className="font-sans text-[11.5px] text-neutral-500 mt-1 leading-normal">
                            Kevin reviews your custom scopes or applied constraints to instantly outline build feasibility.
                          </p>
                        </div>
                      </div>

                      {/* Workflow Step 2 */}
                      <div className="flex gap-4 glass-card p-4.5 rounded-xl border border-neutral-850/60 hover:border-neutral-700/60 transition-colors">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                          02
                        </span>
                        <div>
                          <h5 className="font-sans text-[12.5px] font-bold text-neutral-200">
                            Discovery Video Consultation
                          </h5>
                          <p className="font-sans text-[11.5px] text-neutral-500 mt-1 leading-normal">
                            An automated calendar sync details a 15-minute screen share reviewing design prototypes together.
                          </p>
                        </div>
                      </div>

                      {/* Workflow Step 3 */}
                      <div className="flex gap-4 glass-card p-4.5 rounded-xl border border-neutral-850/60 hover:border-neutral-700/60 transition-colors">
                        <span className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                          03
                        </span>
                        <div>
                          <h5 className="font-sans text-[12.5px] font-bold text-neutral-200">
                            Milestone Delivery Lifecycle
                          </h5>
                          <p className="font-sans text-[11.5px] text-neutral-500 mt-1 leading-normal">
                            Work commences under secure, phased milestone contracts with weekly reviews via secure staging.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Component Wrapper (Right Side) */}
                  <div className="lg:col-span-7">
                    <ContactForm 
                      appliedProposalText={proposalText}
                      appliedProposalPrice={proposalPrice}
                      onClearProposal={handleClearProposal}
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. CLIENT SOCIAL PROOF / REVIEWS SECTION */}
        <section id="experience" className="max-w-7xl mx-auto px-6 relative z-10 scroll-mt-24 space-y-16">
          <ExperienceTimeline />

          <div className="pt-10 border-t border-neutral-900/60 space-y-8">
            {/* Header with Left border Swiss Accent */}
            <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500">
              <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
                <Quote size={11} className="text-amber-500" />
                <span>SPECIFICATE_05 // ENDORSEMENTS</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
                Endorsements
              </h2>
              <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
                Learn what VC product directors and lead engineers value most in Kevin's reliable delivery.
              </p>
            </div>

            {/* Testimonials grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, idx) => (
                <div 
                  key={testimonial.id}
                  className="glass-card glass-card-hover p-6 md:p-8 rounded-2xl relative flex flex-col justify-between text-left space-y-6 transition-all duration-300"
                >
                  <p className="font-sans text-xs md:text-sm text-neutral-200 leading-relaxed italic relative z-10 font-medium">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center gap-3 pt-3.5 relative z-10 border-t border-neutral-800/60">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full object-cover border border-neutral-800/80 saturate-[0.85] hover:saturate-100 transition-all"
                    />
                    <div>
                      <h5 className="font-sans text-xs font-bold text-neutral-100">
                        {testimonial.name}
                      </h5>
                      <p className="font-sans text-[11px] text-[#8c8c9e]">
                        {testimonial.role} at <strong className="text-amber-400 font-semibold">{testimonial.company}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Absolute elegant double quotes indicator decoration */}
                  <span className="absolute bottom-4 right-6 text-neutral-900 text-6xl select-none font-serif opacity-35 pointer-events-none">
                    ”
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER CANVAS */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 relative z-10 text-neutral-500 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
            <span>© {new Date().getFullYear()} Kevin Caidic. All project data protected under active licenses.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-500/80">BSIT GRADUATE // DNSC</span>
            <span>—</span>
            <span className="text-neutral-400">PANABO CITY, DAVAO</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
