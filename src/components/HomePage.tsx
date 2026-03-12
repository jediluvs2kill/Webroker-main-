import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Users, Home, CreditCard, FileText, Store, ArrowRight, Sparkles, ShieldCheck, Zap, BarChart3, Globe, CheckCircle2, Check, X } from 'lucide-react';

interface HomePageProps {
  onEnter: (view: any) => void;
}

export default function HomePage({ onEnter }: HomePageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const roles = [
    {
      id: 'builder',
      title: 'Builder OS',
      description: 'Command your inventory, optimize pricing, and manage channel partners with AI-driven insights.',
      icon: Building2,
      color: 'from-indigo-500 to-blue-600',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      hooks: ['Live Inventory', 'Revenue Analytics', 'Broker Gamification', 'Market Sentiment']
    },
    {
      id: 'broker',
      title: 'Broker Copilot',
      description: 'Your AI assistant for matching leads, scheduling site visits, and closing deals faster.',
      icon: Users,
      color: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      hooks: ['AI Lead Matching', 'Smart Scheduling', 'Commission Tracker', 'Virtual Assistant']
    },
    {
      id: 'buyer',
      title: 'Buyer Portal',
      description: 'Find your dream property with personalized AI recommendations and transparent tracking.',
      icon: Home,
      color: 'from-rose-500 to-orange-600',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      hooks: ['AI Broker Match', 'Virtual Tours', 'Document Vault', 'Payment Milestones']
    }
  ];

  const modules = [
    { id: 'transactions', title: 'Transaction Engine', icon: CreditCard, desc: 'Seamless payments & escrow' },
    { id: 'verifications', title: 'Verifications Layer', icon: FileText, desc: 'Automated KYC & compliance' },
    { id: 'commercial', title: 'Commercial Mix', icon: Store, desc: 'Retail & office space optimization' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          WeBroker <span className="text-slate-500 font-light">OS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Resources</a>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium backdrop-blur-md transition-all">
          Contact Sales
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Intelligent Real Estate Ecosystem</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            One Platform.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
              Total Alignment.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            AI-driven workflows connecting builders, brokers, and buyers in real-time. 
            Select your role to enter the workspace.
          </motion.p>
        </div>

        {/* Role Portals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {roles.map((role, idx) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
              onClick={() => onEnter(role.id)}
              className={`group relative flex flex-col p-8 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-slate-700 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${role.color.split('-')[1]}-500/20`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${role.color} opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              <div className={`w-14 h-14 rounded-2xl ${role.bg} border ${role.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <role.icon className={`w-7 h-7 ${role.text}`} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                {role.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {role.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {role.hooks.map(hook => (
                  <span key={hook} className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                    {hook}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors mt-auto">
                Enter Workspace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modules Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-slate-800/50 pt-16 mb-32"
        >
          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-slate-300">Explore Platform Modules</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => onEnter(mod.id)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/30 border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <mod.icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-200">{mod.title}</div>
                  <div className="text-xs text-slate-500">{mod.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-slate-800/50 py-16"
        >
          {[
            { label: 'Properties Listed', value: '12,000+' },
            { label: 'Active Brokers', value: '5,400+' },
            { label: 'Transactions Processed', value: '$2.4B' },
            { label: 'Average Time to Close', value: '14 Days' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why WeBroker OS?</h2>
            <p className="text-slate-400">The only platform that connects the entire real estate lifecycle into a single, intelligent ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Real-Time Sync', desc: 'Inventory and pricing updates instantly across all broker networks.' },
              { icon: ShieldCheck, title: 'Secure Escrow', desc: 'Bank-grade security for all transactions and token advances.' },
              { icon: BarChart3, title: 'Predictive Analytics', desc: 'AI models forecast demand and optimize unit pricing dynamically.' },
              { icon: Globe, title: 'Global Reach', desc: 'Connect with international buyers and NRI investors seamlessly.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:bg-slate-800/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-32 pt-16 border-t border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Choose the plan that fits your scale. Upgrade anytime as your business grows.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Builder Basic</h3>
              <p className="text-sm text-slate-400 mb-6">For emerging developers managing single projects.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹39,999</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Live Inventory Management', 'Basic Analytics Dashboard', 'Up to 5 User Seats', 'Standard Email Support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-indigo-900/40 to-slate-900/50 border border-indigo-500/30 flex flex-col relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Broker Pro</h3>
              <p className="text-sm text-indigo-200/70 mb-6">For high-performing agencies and channel partners.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹14,999</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['AI Lead Matching & CRM', 'Smart Scheduling & Virtual Tours', 'Unlimited Listings', 'Commission Tracker', 'Priority 24/7 Support'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors shadow-lg shadow-indigo-500/25"
              >
                Get Started
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise OS</h3>
              <p className="text-sm text-slate-400 mb-6">For large institutions and multi-city developers.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['White-label Buyer Portal', 'Full API Access & Webhooks', 'Custom AI Model Training', 'Dedicated Success Manager', 'SLA Guarantee'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
              >
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-12 md:p-16 text-center border border-indigo-500/30"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to transform your real estate operations?</h2>
            <p className="text-indigo-100 text-lg mb-10">Join the top builders and brokers who are already using WeBroker OS to close deals faster and smarter.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2"
              >
                Request a Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-900/40 text-white font-semibold hover:bg-indigo-900/60 border border-indigo-400/30 backdrop-blur-md transition-colors"
              >
                View Pricing
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-indigo-200 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-day free trial</div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Request Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Request a Demo</h3>
                <p className="text-slate-400 text-sm">See how WeBroker OS can transform your real estate operations. Fill out the form below and our team will be in touch.</p>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsDemoModalOpen(false); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">First Name</label>
                    <input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Last Name</label>
                    <input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Work Email</label>
                  <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@company.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Company Name</label>
                  <input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Acme Real Estate" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">I am a...</label>
                  <select required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none">
                    <option value="" disabled selected>Select your role</option>
                    <option value="builder">Builder / Developer</option>
                    <option value="broker">Broker / Channel Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-4 mt-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors shadow-lg shadow-indigo-500/25">
                  Schedule My Demo
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
