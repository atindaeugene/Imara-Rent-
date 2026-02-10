import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, MapPin, Building, Percent } from 'lucide-react';

const PropertyList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    { id: '1', name: 'Skyline Towers', address: 'Riverside Drive, Nairobi', units: 45, occupied: 42, type: 'Residential', value: 'KES 240M' },
    { id: '2', name: 'Westside Plaza', address: 'Westlands, Nairobi', units: 12, occupied: 12, type: 'Commercial', value: 'KES 180M' },
    { id: '3', name: 'Emerald Gardens', address: 'Kileleshwa, Nairobi', units: 30, occupied: 24, type: 'Residential', value: 'KES 310M' },
    { id: '4', name: 'Zion Heights', address: 'Syokimau, Machakos', units: 80, occupied: 65, type: 'Residential', value: 'KES 120M' },
  ];

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio Properties</h1>
          <p className="text-slate-500">Manage your real estate assets and monitor unit performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-imara-blue text-white rounded-xl hover:bg-imara-blue/90 transition-shadow shadow-md shadow-imara-blue/10">
          <Plus size={20} />
          <span>Add Property</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, location or type..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-imara-blue/10 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
            <Filter size={16} />
            Filter
          </button>
          <button className="px-4 py-2 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-imara-blue/30 transition-all group">
            <div className="h-48 relative">
              <img src={`https://picsum.photos/seed/${p.id}/600/400`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-imara-blue">
                {p.type}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                <button className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <MoreVertical size={18} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-6">
                <MapPin size={14} />
                {p.address}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase mb-1">
                    <Building size={12} />
                    Units
                  </div>
                  <p className="font-bold text-slate-800">{p.units}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase mb-1">
                    <Percent size={12} />
                    Occupancy
                  </div>
                  <p className="font-bold text-imara-orange">{Math.round((p.occupied/p.units)*100)}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Estimated Value</p>
                  <p className="text-slate-800 font-bold text-sm">{p.value}</p>
                </div>
                <button className="px-4 py-2 bg-imara-blue/5 text-imara-blue rounded-lg text-sm font-bold hover:bg-imara-blue/10 transition-colors">
                  View Units
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;