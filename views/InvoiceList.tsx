import React from 'react';
import { Search, Filter, Download, Plus, Clock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const InvoiceList: React.FC = () => {
  const invoices = [
    { id: 'INV-2023-001', tenant: 'Alice Kimani', unit: 'B-104', amount: 'KES 45,000', dueDate: 'Nov 05, 2023', status: 'Paid', method: 'M-Pesa' },
    { id: 'INV-2023-002', tenant: 'Robert Maina', unit: 'A-201', amount: 'KES 120,000', dueDate: 'Nov 05, 2023', status: 'Pending', method: '-' },
    { id: 'INV-2023-003', tenant: 'Sarah Ochieng', unit: 'G-04', amount: 'KES 65,000', dueDate: 'Nov 05, 2023', status: 'Overdue', method: '-' },
    { id: 'INV-2023-004', tenant: 'Kevin Mutua', unit: 'H-302', amount: 'KES 15,000', dueDate: 'Nov 01, 2023', status: 'Paid', method: 'Cash' },
    { id: 'INV-2023-005', tenant: 'Dr. Jane Smith', unit: 'C-501', amount: 'KES 85,000', dueDate: 'Oct 05, 2023', status: 'Paid', method: 'Stripe' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle2 size={16} className="text-imara-green" />;
      case 'Pending': return <Clock size={16} className="text-imara-orange" />;
      case 'Overdue': return <AlertTriangle size={16} className="text-rose-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Invoices</h1>
          <p className="text-slate-500">Automated recurring rent generation and tracking.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50">
            <Download size={18} />
            Export All
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-imara-blue text-white rounded-xl font-medium hover:bg-imara-blue/90 shadow-md shadow-imara-blue/10">
            <Plus size={18} />
            Create Custom Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Outstanding', amount: 'KES 4.2M', icon: <FileText size={20} className="text-imara-blue" />, bg: 'bg-imara-blue/5' },
          { label: 'Expected this Month', amount: 'KES 18.5M', icon: <Clock size={20} className="text-imara-orange" />, bg: 'bg-imara-orange/5' },
          { label: 'Collected this Month', amount: 'KES 14.3M', icon: <CheckCircle2 size={20} className="text-imara-green" />, bg: 'bg-imara-green/5' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-800">{stat.amount}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by invoice ID or tenant name..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-imara-blue/10 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100"><Filter size={18} /></button>
            <div className="h-9 w-[1px] bg-slate-100"></div>
            <button className="text-xs font-bold text-imara-blue px-3 hover:bg-imara-blue/5 rounded-lg">Send Reminders</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tenant & Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-imara-blue">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{inv.tenant}</p>
                    <p className="text-xs text-slate-400">{inv.unit}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {inv.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {inv.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(inv.status)}
                      <span className="text-sm font-semibold text-slate-700">{inv.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-imara-blue p-2 rounded-lg hover:bg-imara-blue/5 transition-colors">
                      <Download size={18} />
                    </button>
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

export default InvoiceList;