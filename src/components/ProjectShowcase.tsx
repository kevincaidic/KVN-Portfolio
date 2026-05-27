import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, CheckCircle, Clock, Award, Briefcase, Plus, Minus, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CERTIFICATES } from '../data';
import { Project, Certificate } from '../types';

export default function ProjectShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>("project-1");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const toggleProject = (id: string) => {
    setSelectedProjectId(selectedProjectId === id ? null : id);
  };

  const selectProjectAndScroll = (projectId?: string) => {
    if (!projectId) return;
    setSelectedProjectId(projectId);
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      {/* 03.01 // PROJECT PORTFOLIO SHOWCASE BLOCK */}
      <div className="space-y-8">
        {/* Section Heading with Swiss-style Left Border Accent */}
        <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500">
          <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
            <Award size={11} className="text-amber-500" />
            <span>SPECIFICATE_03 // CORE_PORTFOLIO</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
            Selected Engineering Scopes
          </h2>
          <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
            Each contract delivery centers on tangible system stability, architectural integrity, and clear business outcomes. Toggle custom projects below to view detailed metrics.
          </p>
        </div>

        {/* Grid containing list and details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Project Selector - Left Sidebar Layout (5 columns) */}
          <div className="lg:col-span-5 space-y-3">
            {PROJECTS.map((project, index) => {
              const isSelected = selectedProjectId === project.id;
              const borderColors: Record<string, string> = {
                teal: 'hover:border-teal-500/40 border-neutral-850',
                indigo: 'hover:border-indigo-500/40 border-neutral-850',
                amber: 'hover:border-amber-400/40 border-neutral-850',
                slate: 'hover:border-neutral-500/40 border-neutral-850',
              };
              const borderPickedColors: Record<string, string> = {
                teal: 'border-teal-500 bg-teal-950/15 text-teal-400',
                indigo: 'border-indigo-500 bg-indigo-950/15 text-indigo-400',
                amber: 'border-amber-500 bg-amber-950/15 text-amber-400',
                slate: 'border-neutral-400 bg-neutral-900/40 text-neutral-200',
              };

              return (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => toggleProject(project.id)}
                  className={`w-full text-left p-4.5 rounded-xl border relative overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? `${borderPickedColors[project.highlightColor] || 'border-neutral-400'} shadow-lg shadow-neutral-950/50`
                      : `glass-card ${borderColors[project.highlightColor] || 'hover:border-neutral-700'}`
                  }`}
                  id={`project-btn-${project.id}`}
                >
                  {/* Glow pill absolute indicator */}
                  <span className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-300 ${
                    isSelected ? (
                      project.highlightColor === 'teal' ? 'bg-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.5)]' :
                      project.highlightColor === 'indigo' ? 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]' :
                      project.highlightColor === 'amber' ? 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]' :
                      'bg-neutral-400'
                    ) : 'bg-neutral-800'
                  }`} />

                  <div className="flex items-start justify-between gap-3 pl-2.5 w-full">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <h4 className={`font-display text-sm md:text-base font-bold transition-all ${
                        isSelected ? 'text-amber-400' : 'text-neutral-200 group-hover:text-amber-400'
                      }`}>
                        {project.title}
                      </h4>
                      <p className="text-neutral-400 font-sans text-xs line-clamp-1 mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="text-neutral-500 group-hover:text-neutral-300 transition-colors pt-1">
                      {isSelected ? <Minus size={13} /> : <Plus size={13} />}
                    </div>
                  </div>

                  {/* Tags preview on item */}
                  <div className="flex flex-wrap gap-1.5 pl-2.5 mt-3 w-full">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-950/60 text-neutral-400 border border-neutral-850">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-950/30 text-neutral-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Project Expanded Card Details - Right Layout (7 columns) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {selectedProjectId ? (
                (() => {
                  const project = PROJECTS.find(p => p.id === selectedProjectId) as Project;
                  if (!project) return null;

                  // Find certificates linked to this specific project
                  const projectCerts = CERTIFICATES.filter(c => c.associatedProjectId === project.id);

                  const bgColors: Record<string, string> = {
                    teal: 'from-teal-500/5 to-transparent border-teal-500/20',
                    indigo: 'from-indigo-500/5 to-transparent border-indigo-500/20',
                    amber: 'from-amber-500/5 to-transparent border-amber-500/20',
                    slate: 'from-neutral-500/5 to-transparent border-neutral-700/20',
                  };

                  const accentTextColors: Record<string, string> = {
                    teal: 'text-teal-400',
                    indigo: 'text-indigo-400',
                    amber: 'text-amber-400',
                    slate: 'text-neutral-400',
                  };

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.98, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -15 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`bg-gradient-to-b ${bgColors[project.highlightColor] || 'from-neutral-900/40 to-neutral-950/60'} glass-card rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden`}
                      id={`project-detail-panel-${project.id}`}
                    >
                      {/* Retro background glow element */}
                      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/[0.03] rounded-full blur-[60px]" />

                      {/* Floating top header detail badges */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-900">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] bg-neutral-950/80 border border-neutral-850 px-2.5 py-1 rounded-lg">
                            <Briefcase size={10} className="text-amber-500" />
                            <span>{project.role}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] bg-neutral-950/80 border border-neutral-850 px-2.5 py-1 rounded-lg">
                            <Clock size={10} className="text-amber-500" />
                            <span>{project.timeline}</span>
                          </div>
                        </div>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 hover:underline font-mono tracking-widest transition-all"
                            id={`project-external-link-${project.id}`}
                          >
                            <span>LIVE WORK</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>

                      {/* Project Preview Image Screenshot Block */}
                      {project.imageUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-neutral-850 bg-neutral-950 flex items-center justify-center shadow-inner group w-full h-auto bg-gradient-to-tr from-[#09090b] to-[#121214]">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-auto max-h-[380px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
                        </div>
                      )}

                      {/* Headline and core pitch */}
                      <div className="space-y-2 relative z-10">
                        <span className={`font-mono text-[9px] uppercase tracking-widest font-extrabold ${accentTextColors[project.highlightColor]}`}>
                          {project.category}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-extrabold text-neutral-150 tracking-tight leading-none uppercase">
                          {project.title}
                        </h3>
                        <p className="text-neutral-300 font-sans text-[13px] md:text-[14px] leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech stack used tags */}
                      <div className="space-y-2.5 relative z-10">
                        <h5 className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase">TECH STACK INTEGRATED</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map(tag => (
                            <span key={tag} className="font-mono text-[10.5px] px-2.5 py-1 rounded bg-[#09090b] border border-neutral-850 text-neutral-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Highly-designed project checklist results */}
                      <div className="space-y-3 pt-2 relative z-10 border-b border-neutral-900 pb-5">
                        <h5 className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase">DELIVERED IMPACT METRICS</h5>
                        <div className="space-y-2.5">
                          {project.results.map((result, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-[#09090b]/40 p-3.5 rounded-lg border border-neutral-850/60 hover:border-neutral-750 transition-colors">
                              <span className="mt-0.5 text-teal-400 flex-shrink-0">
                                <CheckCircle size={13} className="text-teal-400" />
                              </span>
                              <span className="font-sans text-xs md:text-sm text-neutral-300">
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Associated Verified Certificates (Link certificates directly inside the projects!) */}
                      {projectCerts.length > 0 && (
                        <div className="space-y-3 pt-1 relative z-10 animate-fade-in text-left">
                          <h5 className="font-mono text-[9px] text-amber-500 tracking-widest font-extrabold uppercase flex items-center gap-1.5Matches-glow animate-pulse">
                            <ShieldCheck size={12} className="text-amber-500" />
                            <span>VERIFIED CONTRACTUAL CREDENTIALS ({projectCerts.length})</span>
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {projectCerts.map(cert => (
                              <div 
                                key={cert.id} 
                                className="bg-[#09090b]/50 border border-neutral-850 p-4.5 rounded-xl space-y-2.5 hover:border-amber-500/20 group transition-all"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-start justify-between gap-1.5">
                                    <h6 className="font-sans text-xs font-bold text-neutral-200 leading-tight group-hover:text-amber-400 transition-colors">
                                      {cert.title}
                                    </h6>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        onClick={() => setSelectedCert(cert)}
                                        className="text-neutral-500 hover:text-amber-400 transition-colors cursor-pointer"
                                        title="View digital certificate preview"
                                      >
                                        <Award size={11} />
                                      </button>
                                      {cert.verificationUrl && (
                                        <a 
                                          href={cert.verificationUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-neutral-500 hover:text-neutral-200 transition-colors shrink-0"
                                        >
                                          <ExternalLink size={10} />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  <p className="font-mono text-[10px] text-neutral-500 leading-none">
                                    {cert.issuer}
                                  </p>
                                </div>

                                <div className="flex flex-col gap-1 border-t border-neutral-900/80 pt-2 font-mono text-[9px] text-[#8c8c9e]">
                                  <div className="flex justify-between">
                                    <span>CRED_ID</span>
                                    <span className="text-neutral-450 font-semibold">{cert.credentialId}</span>
                                  </div>
                                  <div className="flex justify-between text-[8px]">
                                    <span>VALIDITY</span>
                                    <span className="text-amber-500/80 font-bold">{cert.date}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </motion.div>
                  );
                })()
              ) : (
                <div className="h-[430px] flex flex-col items-center justify-center glass-card border-dashed border-neutral-800/80 rounded-2xl text-center p-6 bg-neutral-900/10">
                  <span className="font-mono text-neutral-600 text-[9px] uppercase tracking-widest block mb-2 font-bold">PREVIEWER_IDLE_AWAITING</span>
                  <p className="text-neutral-500 font-sans text-xs max-w-xs leading-normal">
                    Select a contract scope from the left tracker panel to inspect detailed telemetry, system stack deliverables, and milestones.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 03.02 // DEDICATED GENERAL CERTIFICATIONS & CREDENTIALS DOCK (Butanganan sa Certificate) */}
      <div className="pt-10 border-t border-neutral-900/80 space-y-8">
        
        {/* Section header */}
        <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500 text-left">
          <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
            <ShieldCheck size={12} className="text-amber-500 animate-pulse" />
            <span>SPECIFICATE_03.02 // VERIFIED_CREDENTIALS</span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
            Verified Certification Hub
          </h2>
          <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
            Professional industry-standard certifications proving architectural mastery, DevOps compliance, secure system deployment pipelines, and advanced state logic engineering.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATES.map((cert) => {
            const linkedProject = PROJECTS.find(p => p.id === cert.associatedProjectId);
            
            return (
              <div 
                key={cert.id}
                className="glass-card hover:border-amber-500/25 p-5 rounded-xl flex flex-col justify-between text-left space-y-4 hover:shadow-[0_0_15px_rgba(245,158,11,0.03)] group transition-all duration-300 relative overflow-hidden"
                id={`cert-card-${cert.id}`}
              >
                {/* Visual Seal Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500/5 group-hover:bg-amber-500/10 rounded-bl-xl transition-all flex items-center justify-center">
                  <ShieldCheck size={11} className="text-amber-500/60 group-hover:text-amber-400" />
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-amber-500 font-extrabold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                    {cert.issuer.split('(')[0].trim()}
                  </span>
                  
                  <h4 className="font-display text-xs md:text-[13px] font-extrabold text-neutral-200 leading-tight pt-1 group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h4>
                  
                  <p className="font-mono text-[9px] text-[#8c8c9e]">
                    {cert.date}
                  </p>
                </div>

                <div className="space-y-3.5 pt-3.5 border-t border-neutral-900">
                  <div className="font-mono text-[8.5px] text-neutral-500 space-y-1">
                    <div className="flex justify-between">
                      <span>CRED_ID</span>
                      <span className="font-semibold text-neutral-400">{cert.credentialId}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-0.5">
                    <div className="flex items-center gap-2">
                      {/* View Certificate Modal Trigger */}
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="flex-1 py-1 px-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:text-amber-400 text-[9.5px] font-mono font-bold uppercase rounded transition-all flex items-center justify-center gap-1 cursor-pointer"
                        title="View digital certificate reconstruction"
                      >
                        <Award size={9.5} />
                        <span>VIEW CARD</span>
                      </button>

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[9.5px] font-mono font-extrabold uppercase rounded transition-all flex items-center gap-1 cursor-pointer"
                          title="Verify Authentic Certificate Path"
                        >
                          <span>VERIFY</span>
                          <ExternalLink size={8} />
                        </a>
                      )}
                    </div>

                    {/* Link to show associated project */}
                    {linkedProject && (
                      <button
                        onClick={() => selectProjectAndScroll(cert.associatedProjectId)}
                        className="w-full py-1.5 px-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-neutral-750 text-neutral-405 hover:text-amber-400 text-[9px] font-mono font-bold uppercase rounded transition-all flex items-center justify-between cursor-pointer"
                        title="Focus this certified project source"
                      >
                        <span>PROJECT MODULE DETAILS</span>
                        <ArrowUpRight size={9} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 03.03 // INTERACTIVE DIGITAL CERTIFICATE RECONSTRUCTION MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-full max-w-2xl bg-[#09090b] border border-neutral-850 p-1.5 rounded-2xl shadow-2xl relative overflow-y-auto max-h-[90vh] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Outer Glow frame accents */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/[0.03] rounded-full blur-[60px]" />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors z-30"
              >
                ✕
              </button>

              <div className="p-4 md:p-8 space-y-6">
                               {/* 1. VISUAL CERTIFICATE DISPLAY */}
                {selectedCert.imageUrl ? (
                  <div className="bg-[#09090b] border border-neutral-800/80 p-2 rounded-xl shadow-inner overflow-hidden flex items-center justify-center relative group">
                    <img 
                      src={selectedCert.imageUrl} 
                      alt={selectedCert.title} 
                      className="w-full h-auto rounded-lg shadow-md border border-neutral-850/60 max-h-[70vh] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg text-center text-neutral-400">
                    <Award size={48} className="mx-auto text-amber-500 mb-3 animate-pulse" />
                    <h4 className="font-display text-lg font-bold text-neutral-200">{selectedCert.title}</h4>
                    <p className="font-mono text-xs text-neutral-500 mt-1">{selectedCert.issuer}</p>
                  </div>
                )}

                {/* 2. AUTHENTIC VERIFIABILITY FOOTNOTE */}
                <div className="bg-[#09090b]/85 border border-neutral-850 p-4.5 rounded-xl text-left space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={13} className="text-amber-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-[#8c8c9e] tracking-widest font-bold uppercase">SECURE_VERIFIABILITY_CREDENTIAL</span>
                  </div>
                  <p className="font-sans text-[11px] text-neutral-400 leading-normal">
                    This digital record is securely verified under academic index <strong className="text-neutral-200 font-mono text-[10px]">{selectedCert.credentialId}</strong>. You can perform an external registry audit by clicking the independent validation node.
                  </p>
                  
                  {/* Action link */}
                  {selectedCert.verificationUrl && (
                    <div className="pt-1.5">
                      <a
                        href={selectedCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-[9.5px] font-extrabold rounded-lg tracking-wider transition-colors shadow shadow-amber-500/10 cursor-pointer uppercase"
                      >
                        <span>Audit Authenticity Node</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
