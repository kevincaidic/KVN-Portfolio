import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, DollarSign, ArrowRight, Check, CheckSquare, Square, Info, ShieldAlert, Sparkles } from 'lucide-react';
import { PROJECT_CALCULATOR_PRESETS } from '../data';

interface InteractiveCostCalculatorProps {
  onApplyProposal: (proposalSummary: string, estimatedTotalPrice: number) => void;
}

export default function InteractiveCostCalculator({ onApplyProposal }: InteractiveCostCalculatorProps) {
  const [selectedType, setSelectedType] = useState('web-app');
  const [selectedComplexity, setSelectedComplexity] = useState('standard');
  const [selectedTimeline, setSelectedTimeline] = useState('normal');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['animations']);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Read data structures from template config
  const projectTypes = PROJECT_CALCULATOR_PRESETS.types;
  const complexityLevels = PROJECT_CALCULATOR_PRESETS.complexities;
  const timelines = PROJECT_CALCULATOR_PRESETS.timelines;
  const featuresList = PROJECT_CALCULATOR_PRESETS.features;

  // Active math computation
  useEffect(() => {
    const typeObj = projectTypes.find(t => t.id === selectedType);
    const compObj = complexityLevels.find(c => c.id === selectedComplexity);
    const timeObj = timelines.find(t => t.id === selectedTimeline);

    if (!typeObj || !compObj || !timeObj) return;

    // Formula calculation
    let base = typeObj.basePrice * typeObj.factor;
    
    // Add feature prices
    let featuresSum = 0;
    selectedFeatures.forEach(featId => {
      const featObj = featuresList.find(f => f.id === featId);
      if (featObj) {
        featuresSum += featObj.price;
      }
    });

    // Multipliers affect base + features
    let total = (base + featuresSum) * compObj.multiplier * timeObj.multiplier;
    
    setEstimatedPrice(Math.round(total));
  }, [selectedType, selectedComplexity, selectedTimeline, selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    const typeLabel = projectTypes.find(t => t.id === selectedType)?.name || '';
    const compLabel = complexityLevels.find(c => c.id === selectedComplexity)?.name || '';
    const timeLabel = timelines.find(t => t.id === selectedTimeline)?.name || '';
    const activeFeatsString = selectedFeatures
      .map(id => featuresList.find(f => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const proposalSummaryString = 
      `Project Workspace Proposal:\n` +
      `- Type: ${typeLabel}\n` +
      `- Structural Multiplier: ${compLabel}\n` +
      `- Deadline Track: ${timeLabel}\n` +
      `- Features Checklist: ${activeFeatsString || 'None requested'}\n` +
      `- Est Range: $${estimatedPrice.toLocaleString()}`;

    onApplyProposal(proposalSummaryString, estimatedPrice);
  };

  // Sub-breakdowns of pricing
  const breakDownFrontend = Math.round(estimatedPrice * 0.45);
  const breakDownBackend = Math.round(estimatedPrice * 0.35);
  const breakDownAudit = Math.round(estimatedPrice * 0.20);

  return (
    <div className="space-y-8">
      {/* Intro Heading Block with Swiss Border */}
      <div className="flex flex-col gap-2.5 relative pl-5 border-l-2 border-amber-500">
        <div className="flex items-center gap-2 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
          <Calculator size={11} className="text-amber-500 animate-pulse" />
          <span>SPECIFICATE_04 // ESTIMATION_BOARD</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-100 tracking-tight leading-none uppercase">
          Contract Quote Builder
        </h2>
        <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-2xl mt-0.5 leading-relaxed">
          Adjust parameters to configure a personalized project quote. This uses real operational weights to output a transparent development estimation.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Editor Controls Section - Left (7 columns) */}
        <div className="xl:col-span-7 glass-card p-5 md:p-7 rounded-2xl space-y-6">
          
          {/* 1. Project Type */}
          <div className="space-y-3">
            <label className="block font-mono text-[9px] text-[#8c8c9e] tracking-wider uppercase font-bold">
              01 // Choose Platform Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projectTypes.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedType(pt.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    selectedType === pt.id 
                      ? 'border-amber-500 bg-amber-500/10 text-neutral-100 shadow-[0_0_15px_rgba(245,158,11,0.04)]' 
                      : 'border-neutral-850 bg-neutral-950/20 text-neutral-400 hover:border-neutral-700/80'
                  }`}
                  id={`calc-type-${pt.id}`}
                >
                  <span className={`block font-display text-xs font-bold leading-none ${selectedType === pt.id ? 'text-amber-400' : 'text-neutral-200'}`}>
                    {pt.name}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 mt-2 block leading-none">
                    Starting: ${pt.basePrice}
                  </span>
                  {selectedType === pt.id && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Complexity & System Scale */}
          <div className="space-y-3">
            <label className="block font-mono text-[9px] text-[#8c8c9e] tracking-wider uppercase font-bold">
              02 // Define System Complexity
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {complexityLevels.map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComplexity(comp.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex gap-3 relative overflow-hidden ${
                    selectedComplexity === comp.id 
                      ? 'border-amber-500 bg-amber-500/10 text-neutral-100 shadow-[0_0_15px_rgba(245,158,11,0.04)]' 
                      : 'border-neutral-850 bg-neutral-950/20 text-neutral-400 hover:border-neutral-700/80'
                  }`}
                  id={`calc-comp-${comp.id}`}
                >
                  <span className="text-xl pt-0.5">{comp.icon}</span>
                  <div>
                    <span className={`block font-display text-xs font-bold ${selectedComplexity === comp.id ? 'text-amber-400' : 'text-neutral-100'}`}>
                      {comp.name}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 block mt-0.5">
                      Multiplier: x{comp.multiplier}
                    </span>
                  </div>
                  {selectedComplexity === comp.id && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Operational Features Grid */}
          <div className="space-y-3">
            <label className="block font-mono text-[9px] text-[#8c8c9e] tracking-wider uppercase font-bold">
              03 // Select Functional Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {featuresList.map(feat => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-start text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer gap-3 relative ${
                      isSelected 
                        ? 'border-amber-500 bg-amber-500/10 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.03)]' 
                        : 'border-neutral-850 bg-neutral-950/15 text-neutral-400 hover:border-neutral-750'
                    }`}
                    id={`calc-feat-${feat.id}`}
                  >
                    <div className="mt-0.5 text-neutral-500">
                      {isSelected ? (
                        <CheckSquare size={14} className="text-amber-400" />
                      ) : (
                        <Square size={14} className="text-neutral-750" />
                      )}
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center gap-2">
                        <span className={`font-sans text-xs font-bold ${isSelected ? 'text-neutral-100' : 'text-neutral-300'}`}>
                          {feat.name}
                        </span>
                        <span className="font-mono text-[10px] text-amber-400 font-extrabold">
                          +${feat.price}
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-neutral-500 leading-normal mt-0.5">
                        {feat.dec}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Delivery Deadlines */}
          <div className="space-y-3">
            <label className="block font-mono text-[9px] text-[#8c8c9e] tracking-wider uppercase font-bold">
              04 // Timeline Schedule
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {timelines.map(time => (
                <button
                  key={time.id}
                  onClick={() => setSelectedTimeline(time.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden ${
                    selectedTimeline === time.id 
                      ? 'border-amber-500 bg-amber-500/10 text-neutral-100 shadow-[0_0_15px_rgba(245,158,11,0.04)]' 
                      : 'border-neutral-850 bg-neutral-950/20 text-neutral-400 hover:border-neutral-700/80'
                  }`}
                  id={`calc-time-${time.id}`}
                >
                  <span className={`block font-display text-xs font-bold ${selectedTimeline === time.id ? 'text-amber-400' : 'text-neutral-200'}`}>
                    {time.name}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 mt-1 block leading-none">
                    x{time.multiplier} multiplier
                  </span>
                  {selectedTimeline === time.id && (
                    <span className="absolute top-0 right-0 font-mono text-[8px] bg-amber-500 text-neutral-950 font-bold px-1.5 py-0.5 rounded-bl">
                      {time.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Billing Panel - Right (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
            {/* Glowing amber accent mesh background */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/10 blur-2xl" />

            <span className="font-mono text-[9px] text-neutral-500 tracking-widest block uppercase mb-1">
              PROPOSAL METRICS
            </span>

            {/* Total Estimated Price Display */}
            <div className="space-y-1 pb-6 border-b border-neutral-900">
              <span className="font-sans text-xs text-neutral-400 font-medium">Estimated Investment:</span>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                  ${estimatedPrice.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-neutral-500 font-medium pb-1">USD</span>
              </div>
            </div>

            {/* Price breakdown charts / sliders list */}
            <div className="space-y-4 py-6 border-b border-neutral-900">
              <h5 className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase">ALLOCATION PLAN</h5>
              
              <div className="space-y-3">
                {/* Visual slider 1: Frontend & Interactions */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-neutral-400">UI/UX & Frontend Interactions</span>
                    <span className="text-neutral-200 font-bold">${breakDownFrontend.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-950 border border-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '45%' }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-amber-500" 
                    />
                  </div>
                </div>

                {/* Visual slider 2: System Logic */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-neutral-400">Core Logic & Integrations</span>
                    <span className="text-neutral-200 font-bold">${breakDownBackend.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-950 border border-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '35%' }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full bg-teal-400" 
                    />
                  </div>
                </div>

                {/* Visual slider 3: Auditing & DevOps */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-[10.5px]">
                    <span className="text-neutral-400">Security, DevOps, & Launch Audit</span>
                    <span className="text-neutral-200 font-bold">${breakDownAudit.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1 bg-neutral-950 border border-neutral-900 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '20%' }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-indigo-400" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Apply Call-To-Action */}
            <div className="pt-6 space-y-4">
              <button
                onClick={handleApply}
                type="button"
                className="w-full group py-3 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-neutral-950 font-sans text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                id="apply-quote-proposal-btn"
              >
                <Sparkles size={13} className="text-neutral-900 animate-spin-slow" />
                <span>Apply Proposal to Inquiries</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-neutral-950" />
              </button>
              
              <div className="flex items-start gap-2 bg-[#09090b] p-3 rounded-xl border border-neutral-850">
                <Info size={12} className="text-neutral-500 shrink-0 mt-0.5" />
                <p className="font-sans text-[10px] text-neutral-500 leading-normal">
                  Applying this setup writes detailed checklist variables straight into the secure inquire form below, streamlining contractual scope mapping.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
