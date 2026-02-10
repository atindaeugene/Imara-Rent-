
import React, { useState } from 'react';
import { LayoutDashboard, FileText, CreditCard, MessageSquare, ArrowLeft, LogOut, CheckCircle, Bell, User } from 'lucide-react';

interface TenantPortalProps {
  onBackToAdmin?: () => void;
  onLogout: () => void;
}

const TenantPortal: React.FC<TenantPortalProps> = ({ onBackToAdmin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const stats = [
    { label: 'Next Rent Due', value: 'Dec 05, 2023', detail: 'KES 45,000' },
    { label: 'Wallet Balance', value: 'KES 0.00', detail: 'Advanced' },
    { label: 'Documents', value: '4 Active', detail: 'Leases, Receipts' }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mini Sidebar */}
      <aside className="w-20 md:w-64 bg-imara-blue border-r border-slate-800 flex flex-col">
        <div className="p-6 text-center md:text-left">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-imara-blue font-bold text-xl mx-auto md:mx-0">
            I
          </div>
          <span className="hidden md:block text-imara-light text-[10px] font-bold uppercase tracking-widest mt-4">Tenant Portal</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {[
            { id: 'home', icon: <LayoutDashboard />, label: 'Home' },
            { id: 'bills', icon: <CreditCard />, label: 'Bills & Rent' },
            { id: 'docs', icon: <FileText />, label: 'My Documents' },
            { id: 'help', icon: <MessageSquare />, label: 'Help Desk' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-imara-orange text-white shadow-lg shadow-imara-orange/20' : 'text-imara-light/60 hover:text-white'
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          {onBackToAdmin && (
            <button 
              onClick={onBackToAdmin}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-imara-light/60 hover:text-white md:hover:bg-white/5"
            >
              <ArrowLeft size={20} />
              <span className="hidden md:block text-sm">Landlord View</span>
            </button>
          )}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-imara-light/60 hover:text-rose-400 md:hover:bg-white/5"
          >
            <LogOut size={20} />
            <span className="hidden md:block text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="font-bold text-slate-800">Karibu, Welcome Back</h2>
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:text-imara-blue relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-imara-orange rounded-full"></span>
             </button>
             <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User size={16} className="text-slate-500" />
             </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          {activeTab === 'home' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-imara-blue rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Your Rent is Ready!</h3>
                    <p className="text-imara-light/90 mb-6 max-w-md">Securely pay your KES 45,000 monthly rent via ImaraRent before Dec 05.</p>
                    <button className="px-8 py-3 bg-imara-orange text-white rounded-xl font-bold hover:bg-imara-orange/90 transition-colors shadow-lg shadow-imara-orange/20">
                      Pay KES 45,000 Now
                    </button>
                  </div>
                  <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <p className="text-imara-light text-xs font-bold uppercase tracking-wider mb-2">Managed By ImaraRent</p>
                    <p className="text-xl font-bold">Skyline Towers</p>
                    <p className="text-3xl font-bold text-imara-orange">B-104</p>
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
                    <p className="text-slate-500 text-sm font-medium mb-1">{s.label}</p>
                    <p className="text-xl font-bold text-slate-800">{s.value}</p>
                    <p className="text-xs text-imara-blue font-bold mt-2 uppercase tracking-wide">{s.detail}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-bold text-slate-800">Recent Activity</h4>
                  <button className="text-sm font-bold text-imara-blue hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { id: 'INV-102', date: 'Nov 02, 2023', amount: 'KES 45,000', status: 'Paid', method: 'M-Pesa' },
                    { id: 'INV-101', date: 'Oct 04, 2023', amount: 'KES 45,000', status: 'Paid', method: 'M-Pesa' },
                  ].map((p, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-imara-green/10 text-imara-green flex items-center justify-center">
                          <CheckCircle size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{p.id}</p>
                          <p className="text-xs text-slate-500">{p.date} • {p.method}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{p.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'home' && (
             <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                <FileText size={48} className="mb-4 opacity-20" />
                <p className="font-medium">Under active development</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TenantPortal;
