import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, ChevronRight, User, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { DEVELOPER_BIO } from '../data';

interface ContactFormProps {
  appliedProposalText: string;
  appliedProposalPrice: number;
  onClearProposal: () => void;
}

export default function ContactForm({
  appliedProposalText,
  appliedProposalPrice,
  onClearProposal,
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Work');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Watch for proposal injections from the Quote Builder
  useEffect(() => {
    if (appliedProposalText) {
      setMessage(appliedProposalText);
      setProjectType('Custom Contract Package');
    }
  }, [appliedProposalText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) {
      setErrorText('Please specify your name or business.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorText('Please provide a valid corporate or contact email.');
      return;
    }
    if (!message.trim()) {
      setErrorText('Please enter your project objectives or parameters.');
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setProjectType('Full-Stack Work');
    setMessage('');
    setSubmitted(false);
    onClearProposal();
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Headers */}
            <div className="space-y-1.5 pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-500 font-extrabold tracking-widest uppercase">
                <Mail size={11} />
                <span>SECURE_COMMISSION // INQUIRY_WORK</span>
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-neutral-150 uppercase">
                Initiate Software Contract
              </h3>
              <p className="text-neutral-400 font-sans text-xs">
                Fill out the secure fields below. Average technical response turnaround is under 6 hours.
              </p>
            </div>

            {/* Error banner */}
            {errorText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-red-100 text-xs font-medium"
              >
                <AlertCircle size={14} className="shrink-0 text-red-400" />
                <span className="font-sans">{errorText}</span>
              </motion.div>
            )}

            {/* Injected Quote Status Indicator */}
            {appliedProposalText && (
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-amber-500/5 border border-amber-500/25 rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-amber-400 animate-pulse" />
                    <span className="font-mono text-[9.5px] text-amber-400 font-extrabold uppercase tracking-widest">
                      Proposal Specs Appended!
                    </span>
                  </div>
                  <button
                    onClick={onClearProposal}
                    className="font-mono text-[9px] text-neutral-500 hover:text-neutral-300 underline cursor-pointer"
                    id="clear-proposal-text-btn"
                  >
                    Reset parameters
                  </button>
                </div>
                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="font-sans text-xs text-neutral-400">Target Range:</span>
                  <span className="font-display text-base font-extrabold text-amber-400">
                    ${appliedProposalPrice.toLocaleString()} USD
                  </span>
                </div>
              </motion.div>
            )}

            {/* Inputs Frame */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label className="block font-mono text-[9px] text-neutral-500 tracking-wider uppercase font-bold">
                    Your Name / Client Business *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                      <User size={12} />
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp / Alex Lee"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-950/60 font-sans text-xs rounded-xl border border-neutral-850 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all"
                      id="contact-name-input"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label className="block font-mono text-[9px] text-neutral-500 tracking-wider uppercase font-bold">
                    Secure Contact Email *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                      <Mail size={12} />
                    </span>
                    <input
                      type="email"
                      placeholder="e.g. client@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-950/60 font-sans text-xs rounded-xl border border-neutral-850 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all"
                      id="contact-email-input"
                    />
                  </div>
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-1.5 text-left">
                <label className="block font-mono text-[9px] text-neutral-500 tracking-wider uppercase font-bold">
                  Contract Category Focus
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950/60 font-sans text-xs rounded-xl border border-neutral-850 text-neutral-200 cursor-pointer focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all"
                  id="contact-type-select"
                >
                  <option value="Full-Stack Work">Custom Full-Stack Web App</option>
                  <option value="Product MVP">Product MVP Delivery</option>
                  <option value="Design Systems">Design Systems & Interactions</option>
                  <option value="Custom Contract Package">Applied Calculator Proposal</option>
                </select>
              </div>

              {/* Objectives Frame */}
              <div className="space-y-1.5 text-left">
                <label className="block font-mono text-[9px] text-neutral-500 tracking-wider uppercase font-bold">
                  Project Parameters & Scope Overview *
                </label>
                <textarea
                  placeholder="Summarize the core requirements, API connections, deadlines, or design specs..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-950/60 font-mono text-[11px] rounded-xl border border-neutral-850 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all resize-none leading-relaxed"
                  id="contact-message-input"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group py-3 bg-neutral-100 hover:bg-white active:scale-[0.99] text-neutral-950 font-sans text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                id="contact-submit-btn"
              >
                <span>{loading ? 'Transmitting Inquiries...' : 'Transmit Specifications'}</span>
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 space-y-5"
          >
            <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto text-teal-400">
              <CheckCircle2 size={24} className="animate-bounce" />
            </div>

            <div className="space-y-2">
              <h4 className="font-display text-lg md:text-xl font-bold text-neutral-100 uppercase">
                Inquiry Succeeded
              </h4>
              <p className="text-neutral-400 font-sans text-xs max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-neutral-300">{name}</strong>. Kevin Caidic has been notified of your project parameter stream. An initial callback invite has been logged to <span className="text-neutral-300 underline font-medium">{email}</span>.
              </p>
            </div>

            {/* Simulated Workspace response terminal */}
            <div className="bg-[#09090b] border border-neutral-850 p-4 rounded-xl text-left font-mono text-[10px] text-neutral-500 max-w-sm mx-auto space-y-1.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/[0.02] rounded-full blur-xl animate-pulse" />
              <div className="flex items-center gap-1.5 border-b border-neutral-900 pb-2 mb-2 text-teal-400 font-bold">
                <Terminal size={12} />
                <span>INBOX_LOGGED_SUCCESS</span>
              </div>
              <p className="text-neutral-400">CLIENT_ID: {name.toUpperCase().replace(/\s+/g, '_')}</p>
              <p className="text-neutral-400 font-semibold text-amber-500">GATEWAY: SMTP.SECURE_TUNNEL</p>
              <p className="text-neutral-400">EMAIL: {email}</p>
              <p className="text-neutral-400">SCOPE: {projectType}</p>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 font-sans text-xs rounded-xl transition-all cursor-pointer"
              id="reset-contact-btn"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
