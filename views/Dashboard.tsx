
import React from 'react';
import { 
  Users, 
  Home, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, collections: 3800 },
  { name: 'Feb', revenue: 4500, collections: 4200 },
  { name: 'Mar', revenue: 4800, collections: 4700 },
  { name: 'Apr', revenue: 5100, collections: 4900 },
  { name: 'May', revenue: 5800, collections: 5600 },
  { name: 'Jun', revenue: 6200, collections: 6100 },
];

const StatCard = ({ title, value, change, isPositive, icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass} text-white`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-imara-green' : 'text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}%
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back. Monitoring your properties with ImaraRent.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-imara-blue text-white rounded-lg text-sm font-medium hover:bg-imara-blue/90 transition-colors shadow-sm shadow-imara-blue/10">
            Add New Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Portfolio" 
          value="KES 12.4M" 
          change="12.5" 
          isPositive={true} 
          icon={<DollarSign size={20} />} 
          colorClass="bg-imara-blue"
        />
        <StatCard 
          title="Occupancy Rate" 
          value="94.2%" 
          change="2.4" 
          isPositive={true} 
          icon={<Home size={20} />} 
          colorClass="bg-imara-light"
        />
        <StatCard 
          title="Active Tenants" 
          value="1,248" 
          change="0.8" 
          isPositive={false} 
          icon={<Users size={20} />} 
          colorClass="bg-imara-orange"
        />
        <StatCard 
          title="Rent Collected" 
          value="KES 8.2M" 
          change="18.2" 
          isPositive={true} 
          icon={<TrendingUp size={20} />} 
          colorClass="bg-imara-green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Collection Performance</h3>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-500 px-3 py-1.5 rounded-lg focus:ring-0">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#002D5B" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="collections" fill="#39B54A" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Recent Activities</h3>
            <span className="p-1 bg-imara-orange/10 text-imara-orange rounded">
              <Clock size={16} />
            </span>
          </div>
          <div className="flex-1 space-y-6">
            {[
              { id: 1, type: 'payment', title: 'Payment Received', meta: 'KES 45,000 from Unit B-12', time: '12 mins ago', icon: <CheckCircle2 className="text-imara-green" size={18} /> },
              { id: 2, type: 'late', title: 'Late Payment Alert', meta: 'Unit A-04 is 3 days overdue', time: '2 hours ago', icon: <AlertCircle className="text-rose-500" size={18} /> },
              { id: 3, type: 'maintenance', title: 'Maintenance Request', meta: 'Leaking pipe in Unit C-09', time: '5 hours ago', icon: <AlertCircle className="text-imara-orange" size={18} /> },
              { id: 4, type: 'new', title: 'New Tenant Onboarded', meta: 'Sarah J. moved into Unit D-01', time: 'Yesterday', icon: <Users className="text-imara-blue" size={18} /> },
            ].map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.meta}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-center w-full py-2.5 text-imara-blue font-semibold text-sm hover:bg-imara-blue/5 rounded-xl transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
