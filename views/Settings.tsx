import React from 'react';
import { User, Shield, Bell, CreditCard, Sliders, Globe, Database } from 'lucide-react';

const SettingsView: React.FC = () => {
  const sections = [
    { id: 'profile', label: 'My Profile', icon: <User size={20} />, active: true },
    { id: 'billing', label: 'Subscription Plan', icon: <CreditCard size={20} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'integrations', label: 'Third-Party APIs', icon: <Globe size={20} /> },
    { id: 'export', label: 'Data & Backups', icon: <Database size={20} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">System Settings</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                s.active ? 'bg-white shadow-sm border border-slate-200 text-imara-blue font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
              }`}
            >
              <div className={s.active ? 'text-imara-blue' : ''}>{s.icon}</div>
              <span>{s.label}</span>
            </button>
          ))}
        </aside>

        <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img src="https://picsum.photos/seed/john/150/150" alt="Profile" className="w-24 h-24 rounded-2xl border-4 border-slate-50 object-cover" />
              <button className="absolute -bottom-2 -right-2 p-2 bg-imara-blue text-white rounded-lg shadow-lg">
                <Sliders size={14} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">John Landlord</h2>
              <p className="text-slate-500 text-sm">Owner at ImaraRent Real Estate LTD</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-imara-blue/5 text-imara-blue text-[10px] font-bold rounded uppercase tracking-wider">Premium Plan</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-imara-green text-[10px] font-bold rounded uppercase tracking-wider">Verified User</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Full Name</label>
                <input type="text" defaultValue="John Landlord" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-blue/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
                <input type="email" defaultValue="john@imararent.io" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-blue/10 outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Company Name</label>
                <input type="text" defaultValue="ImaraRent Real Estate LTD" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-blue/10 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Timezone</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-blue/10 outline-none text-slate-600">
                  <option>East Africa Time (GMT+3)</option>
                  <option>London (GMT+0)</option>
                  <option>New York (EST)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-3">
            <button className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Discard Changes</button>
            <button className="px-6 py-2.5 bg-imara-blue text-white font-bold rounded-xl hover:bg-imara-blue/90 shadow-lg shadow-imara-blue/10 transition-all">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;