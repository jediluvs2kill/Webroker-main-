import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Home, CreditCard, FileText, Store, ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onEnter: (view: any) => void;
}

export default function HomePage({ onEnter }: HomePageProps) {
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
          className="border-t border-slate-800/50 pt-16"
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
      </main>
    </div>
  );
}
