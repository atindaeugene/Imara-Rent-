
import React, { useState } from 'react';
import { Smartphone, CreditCard, Wallet, ArrowRight, ShieldCheck, Zap, CheckCircle } from 'lucide-react';

const Payments: React.FC = () => {
  const [amount, setAmount] = useState('45,000');
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'failed'>(null);

  const simulateStkPush = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      setTimeout(() => setStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Center</h1>
        <p className="text-slate-500">Configure collection methods or manually process tenant payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Smartphone size={20} className="text-imara-green" />
              M-Pesa STK Push Simulator
            </h3>
            <p className="text-sm text-slate-500 mb-6">Initiate a secure payment request using the Daraja API integration.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+254</span>
                  <input 
                    type="text" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-green/20 focus:border-imara-green outline-none text-slate-700"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Amount (KES)</label>
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-imara-green/20 focus:border-imara-green outline-none font-bold text-slate-700"
                />
              </div>

              <button 
                onClick={simulateStkPush}
                disabled={loading}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-white transition-all ${
                  loading ? 'bg-slate-300' : 'bg-imara-green hover:bg-imara-green/90 shadow-lg shadow-imara-green/10'
                }`}
              >
                {loading ? 'Initiating Push...' : (
                  <>
                    <Zap size={20} />
                    Initiate STK Push
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-emerald-50 border border-imara-green/20 rounded-xl text-imara-green text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle size={18} />
                  Request sent! Check the phone for the M-Pesa prompt.
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-imara-orange" />
              Card Payment (Stripe)
            </h3>
            <p className="text-sm text-slate-500 mb-6">International cards via Visa, Mastercard or Amex.</p>
            <button className="w-full py-3 border-2 border-slate-100 border-dashed rounded-xl text-slate-400 text-sm font-bold hover:bg-imara-orange/5 hover:border-imara-orange/20 transition-colors">
              Configure Stripe Connect
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-imara-blue to-imara-blue/80 p-8 rounded-3xl text-white shadow-xl shadow-imara-blue/10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-imara-light text-xs font-bold uppercase tracking-widest mb-1">Company Wallet</p>
                <p className="text-3xl font-bold">KES 1,284,500</p>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Wallet size={24} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-imara-light/80">Processing Fees (30d)</span>
                <span className="font-bold">KES 14,200</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-imara-light/80">Settlement Queue</span>
                <span className="font-bold">KES 412,000</span>
              </div>
              <div className="pt-4 flex gap-3">
                <button className="flex-1 bg-white text-imara-blue py-3 rounded-xl font-bold text-sm shadow-lg shadow-black/10">Withdraw</button>
                <button className="flex-1 bg-imara-orange text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-imara-orange/20">View Ledger</button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-800">Gateway Status</h4>
              <span className="text-[10px] font-bold uppercase text-imara-green bg-imara-green/10 px-2 py-0.5 rounded">All Operational</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'M-Pesa STK Push', active: true, fee: '0.5%', color: 'bg-imara-green' },
                { name: 'PesaLink Transfer', active: true, fee: 'Free', color: 'bg-imara-light' },
                { name: 'Stripe (Cards)', active: false, fee: '2.9% + 30¢', color: 'bg-slate-300' },
                { name: 'Tenant Wallet', active: true, fee: 'Free', color: 'bg-imara-orange' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${m.color}`}></div>
                    <span className="text-sm font-semibold text-slate-700">{m.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{m.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
