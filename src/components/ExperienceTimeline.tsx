import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Briefcase, Award, ChevronRight, Zap } from 'lucide-react';
import { EXPERIENCES } from '../data';

export default function ExperienceTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  return (
    <div className="space-y-8">
      {/* Section Head with Swiss Border */}
      <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500">
        <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
          <Briefcase size={11} className="text-amber-500 animate-pulse" />
          <span>SPECIFICATE_03 // MILESTONE_TRACKS</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
          Contract Chronology
        </h2>
        <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
          A history of engineering leadership, custom API architectures, and high-stakes system delivery cycles. Expand rows to view performance vectors.
        </p>
      </div>

      {/* Main Vertical Timeline structure */}
      <div className="relative border-l border-neutral-900 ml-4 pl-6 md:pl-8 py-2 space-y-8 max-w-3xl">
        
        {EXPERIENCES.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          const isHovered = hoveredId === exp.id;

          return (
            <div 
              key={exp.id}
              className="relative group text-left transition-all duration-250"
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Timeline Bullet Anchor */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                className={`absolute -left-[35px] md:-left-[43px] top-1 w-5.5 h-5.5 rounded-full border flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                  isExpanded || isHovered
                    ? 'bg-amber-500 border-amber-500 text-neutral-950 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.35)]' 
                    : 'bg-neutral-950 border-neutral-800 text-neutral-600 group-hover:border-neutral-500'
                }`}
                id={`timeline-bullet-${exp.id}`}
              >
                <Zap size={9} className={isExpanded || isHovered ? 'animate-pulse' : ''} />
              </button>

              <div className="space-y-2">
                {/* Period & Category Header */}
                <span className="font-mono text-[10px] text-amber-500/80 font-bold tracking-wider flex items-center gap-1.5 matches-glow">
                  <Calendar size={10} />
                  <span>{exp.period.toUpperCase()}</span>
                </span>

                {/* Role and Organization Title */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="block text-left w-full cursor-pointer focus:outline-none"
                  id={`timeline-toggle-btn-${exp.id}`}
                >
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-base md:text-lg font-bold tracking-tight uppercase transition-colors duration-250 ${
                      isExpanded ? 'text-amber-400' : 'text-neutral-100 group-hover:text-amber-400'
                    }`}>
                      {exp.role}
                    </h3>
                    <ChevronRight 
                      size={14} 
                      className={`text-neutral-500 transform transition-transform duration-250 ${
                        isExpanded ? 'rotate-90 text-amber-400' : 'group-hover:translate-x-0.5'
                      }`} 
                    />
                  </div>
                  <span className="block font-sans text-xs md:text-sm text-neutral-400 font-medium tracking-tight mt-0.5">
                    {exp.company}
                  </span>
                </button>

                {/* Tags applied */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-950/40 border border-neutral-850/80 text-neutral-400 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expanded Descriptions via animations */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 mt-4 pl-3.5 list-outside list-disc border-l border-amber-500/30">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="font-sans text-xs md:text-sm text-neutral-300 leading-relaxed marker:text-amber-400/80 pl-1.5">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
