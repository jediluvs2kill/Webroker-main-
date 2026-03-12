import React, { useState } from 'react';
import { Building2, LayoutDashboard, Users, FileText, Settings, Bell, Search, Menu, CreditCard, Store, Home } from 'lucide-react';
import BuilderDashboard from './components/BuilderDashboard';
import BrokerDashboard from './components/BrokerDashboard';
import TransactionEngine from './components/TransactionEngine';
import VerificationLayer from './components/VerificationLayer';
import CommercialIntelligence from './components/CommercialIntelligence';
import BuyerDashboard from './components/BuyerDashboard';
import HomePage from './components/HomePage';
import { Button } from './components/ui/button';

type ViewType = 'home' | 'builder' | 'broker' | 'buyer' | 'transactions' | 'verifications' | 'commercial';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (activeView === 'home') {
    return <HomePage onEnter={(view) => setActiveView(view)} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'builder': return <BuilderDashboard />;
      case 'broker': return <BrokerDashboard />;
      case 'buyer': return <BuyerDashboard />;
      case 'transactions': return <TransactionEngine />;
      case 'verifications': return <VerificationLayer />;
      case 'commercial': return <CommercialIntelligence />;
      default: return <BuilderDashboard />;
    }
  };

  const NavButton = ({ view, icon: Icon, label }: { view: ViewType, icon: any, label: string }) => (
    <button
      onClick={() => { setActiveView(view); setIsMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        activeView === view ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-slate-900 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-950 text-slate-300 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div 
            className="h-16 flex items-center px-6 border-b border-slate-800 cursor-pointer hover:bg-slate-900 transition-colors"
            onClick={() => setActiveView('home')}
          >
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              WeBroker
            </div>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
              Workspaces
            </div>
            
            <NavButton view="builder" icon={LayoutDashboard} label="Builder OS" />
            <NavButton view="broker" icon={Users} label="Broker Copilot" />
            <NavButton view="buyer" icon={Home} label="Buyer Dashboard" />

            <div className="mt-8 mb-4 px-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Modules
              </div>
            </div>
            
            <NavButton view="transactions" icon={CreditCard} label="Transaction Engine" />
            <NavButton view="verifications" icon={FileText} label="Verifications" />
            <NavButton view="commercial" icon={Store} label="Commercial Mix" />
          </div>

          <div className="p-4 border-t border-slate-800">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
              <Search className="w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search inventory, leads, or projects..." 
                className="bg-transparent border-none outline-none w-64 placeholder:text-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
              {activeView.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
