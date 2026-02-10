import React, { useState } from 'react';
import { Mail, Lock, User, CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserRole, User as UserType } from '../types';
import EmailVerification from '../components/EmailVerification';

interface AuthProps {
  onLogin: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'VERIFY'>('LOGIN');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePasswordComplexity = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return minLength && hasUpper && hasLower && hasNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (mode === 'REGISTER') {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
      if (!validatePasswordComplexity(formData.password)) {
        newErrors.password = 'Password must be 8+ chars with uppercase, lowercase, and a number';
      }
      if (formData.password !== formData.passwordConfirmation) {
        newErrors.passwordConfirmation = 'Passwords do not match';
      }
    } else if (mode === 'LOGIN') {
      if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.password) newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate API calls
    try {
      if (mode === 'REGISTER') {
        console.log('Calling POST /api/auth/register', { 
          name: formData.name, 
          email: formData.email, 
          password: formData.password 
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMode('VERIFY');
      } else if (mode === 'LOGIN') {
        console.log('Calling POST /api/auth/login', { email: formData.email });
        
        await new Promise(resolve => setTimeout(resolve, 1200));
        const isAdmin = formData.email.includes('admin');
        onLogin({
          id: Math.random().toString(36).substr(2, 9),
          name: isAdmin ? 'System Admin' : (formData.name || 'Alice Tenant'),
          email: formData.email,
          role: isAdmin ? UserRole.ADMIN : UserRole.TENANT,
          avatar: isAdmin ? 'https://picsum.photos/seed/admin/100/100' : 'https://i.pravatar.cc/150?u=1'
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (code: string) => {
    setLoading(true);
    try {
      console.log('Calling POST /api/auth/verify', { email: formData.email, code });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMode('LOGIN');
      setMessage({ type: 'success', text: 'Account activated! You can now log in securely.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid verification code. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    console.log('Resending code to', formData.email);
    setMessage({ type: 'success', text: 'A fresh security code has been sent to your inbox.' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-imara-blue rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-xl shadow-imara-blue/20 relative overflow-hidden group">
            <span className="relative z-10">I</span>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-imara-green rounded-full transform rotate-45"></div>
          </div>
          <div className="text-3xl font-bold tracking-tight">
            <span className="text-imara-blue">Imara</span>
            <span className="text-imara-orange">Rent</span>
          </div>
          <p className="text-slate-400 text-sm mt-1 font-medium tracking-wide">Malipo ya Kodi Salama</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {mode !== 'VERIFY' ? (
            <>
              <div className="bg-imara-blue p-10 text-white text-center">
                <h2 className="text-2xl font-bold">
                  {mode === 'LOGIN' ? 'Welcome Back' : 'Get Started'}
                </h2>
                <p className="text-imara-light text-sm mt-2 opacity-90 font-medium">
                  {mode === 'LOGIN' 
                    ? 'Secure access to your ImaraRent portal' 
                    : 'Manage your building community with ease'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                {message && (
                  <div className={`p-4 rounded-2xl text-sm font-semibold flex gap-3 animate-in fade-in slide-in-from-top-2 ${
                    message.type === 'success' 
                      ? 'bg-emerald-50 text-imara-green border border-imara-green/10' 
                      : 'bg-rose-50 text-rose-700 border border-rose-100'
                  }`}>
                    {message.type === 'success' ? <CheckCircle className="text-imara-green" size={20} /> : <AlertCircle size={20} />}
                    {message.text}
                  </div>
                )}

                {mode === 'REGISTER' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-rose-400' : 'text-slate-400'}`} size={18} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-imara-blue/5 outline-none transition-all ${
                          errors.name ? 'border-rose-300' : 'border-slate-100 focus:border-imara-blue'
                        }`}
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.name}</p>}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-rose-400' : 'text-slate-400'}`} size={18} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-imara-blue/5 outline-none transition-all ${
                        errors.email ? 'border-rose-300' : 'border-slate-100 focus:border-imara-blue'
                      }`}
                      placeholder="example@imararent.io"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-slate-400 uppercase">Password</label>
                    {mode === 'LOGIN' && <button type="button" className="text-[10px] font-bold text-imara-orange hover:underline">Forgot password?</button>}
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-rose-400' : 'text-slate-400'}`} size={18} />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-imara-blue/5 outline-none transition-all ${
                        errors.password ? 'border-rose-300' : 'border-slate-100 focus:border-imara-blue'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.password}</p>}
                </div>

                {mode === 'REGISTER' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Repeat Password</label>
                    <div className="relative">
                      <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.passwordConfirmation ? 'text-rose-400' : 'text-slate-400'}`} size={18} />
                      <input
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={(e) => setFormData({ ...formData, passwordConfirmation: e.target.value })}
                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-2xl focus:ring-4 focus:ring-imara-blue/5 outline-none transition-all ${
                          errors.passwordConfirmation ? 'border-rose-300' : 'border-slate-100 focus:border-imara-blue'
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.passwordConfirmation && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.passwordConfirmation}</p>}
                  </div>
                )}

                <button
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-white transition-all transform active:scale-[0.98] ${
                    loading ? 'bg-imara-blue/50' : 'bg-imara-blue hover:bg-imara-blue/90 shadow-xl shadow-imara-blue/10'
                  }`}
                >
                  {loading ? 'Processing...' : (
                    <>
                      {mode === 'LOGIN' ? 'Secure Login' : 'Create Account'}
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <p className="text-center text-sm font-medium text-slate-500 mt-4">
                  {mode === 'LOGIN' ? (
                    <>
                      New to the platform?{' '}
                      <button type="button" onClick={() => { setMode('REGISTER'); setErrors({}); setMessage(null); }} className="text-imara-orange font-bold hover:underline">Join Now</button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button type="button" onClick={() => { setMode('LOGIN'); setErrors({}); setMessage(null); }} className="text-imara-orange font-bold hover:underline">Log In</button>
                    </>
                  )}
                </p>
              </form>
            </>
          ) : (
            <div className="p-10">
              <EmailVerification 
                email={formData.email} 
                loading={loading}
                onVerify={handleVerification}
                onResend={handleResend}
                onBack={() => setMode('REGISTER')}
              />
            </div>
          )}

          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="flex items-start gap-4 text-slate-400">
              <ShieldCheck size={18} className="flex-shrink-0 text-imara-blue mt-0.5" />
              <p className="text-[10px] font-medium leading-normal">
                Your connection is encrypted. ImaraRent uses bank-grade security protocols and audit logging to protect your data and transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;