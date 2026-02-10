import React from 'react';
import { Search, UserPlus, Mail, MoreHorizontal, MessageCircle } from 'lucide-react';

const TenantList: React.FC = () => {
  const tenants = [
    { id: '1', name: 'Alice Kimani', unit: 'B-104', property: 'Skyline Towers', status: 'Active', rent: 'KES 45,000', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Robert Maina', unit: 'A-201', property: 'Westside Plaza', status: 'Notice', rent: 'KES 120,000', email: 'robert@office.com', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Sarah Ochieng', unit: 'G-04', property: 'Emerald Gardens', status: 'Active', rent: 'KES 65,000', email: 'sarah.o@gmail.com', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Kevin Mutua', unit: 'H-302', property: 'Zion Heights', status: 'Arrears', rent: 'KES 15,000', email: 'kevo@mutua.me', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Dr. Jane Smith', unit: 'C-501', property: 'Skyline Towers', status: 'Active', rent: 'KES 85,000', email: 'jane@clinic.org', avatar: 'https://i.pravatar.cc/150?u=5' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-imara-green border-imara-green/20';
      case 'Arrears': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Notice': return 'bg-amber-50 text-imara-orange border-imara-orange/20';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenant Directory</h1>
          <p className="text-slate-500">Overview of all active and past residents across your properties.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-imara-blue text-white rounded-xl hover:bg-imara-blue/90 transition-shadow">
          <UserPlus size={20} />
          <span>Onboard Tenant</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or unit..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-imara-blue/10 outline-none"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">All Statuses</button>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">Bulk Actions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Property & Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lease Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Rent</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-slate-100" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{t.name}</p>
                        <p className="text-xs text-slate-400">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{t.unit}</p>
                    <p className="text-xs text-slate-400">{t.property}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(t.status)} uppercase tracking-wide`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {t.rent}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-imara-blue hover:bg-imara-blue/5 rounded-lg">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-imara-green hover:bg-imara-green/5 rounded-lg">
                        <MessageCircle size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantList;