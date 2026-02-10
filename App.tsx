
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  Search,
  HelpCircle,
  Wallet
} from 'lucide-react';
import { UserRole, User } from './types';
import Dashboard from './views/Dashboard';
import PropertyList from './views/PropertyList';
import TenantList from './views/TenantList';
import InvoiceList from './views/InvoiceList';
import Payments from './views/Payments';
import SettingsView from './views/Settings';
import TenantPortal from './views/TenantPortal';
import Auth from './views/Auth';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTenantView, setIsTenantView] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('imararent_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.role === UserRole.TENANT) {
        setIsTenantView(true);
      }
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('imararent_user', JSON.stringify(userData));
    if (userData.role === UserRole.TENANT) {
      setIsTenantView(true);
    } else {
      setIsTenantView(false);
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('imararent_user');
    setIsTenantView(false);
  };

  const toggleView = () => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.MANAGER) {
      setIsTenantView(!isTenantView);
      setActiveTab(isTenantView ? 'dashboard' : 'tenant-dashboard');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'properties', label: 'Properties', icon: <Building2 size={20} /> },
    { id: 'tenants', label: 'Tenants', icon: <Users size={20} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  if (isTenantView) {
    return <TenantPortal onBackToAdmin={user.role !== UserRole.TENANT ? toggleView : undefined} onLogout={handleLogout} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-2">
          <div className="w-10 h-10 bg-imara-blue rounded-xl flex items-center justify-center text-white font-bold text-xl relative overflow-hidden group">
            <span className="relative z-10">I</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-imara-green rounded-full transform rotate-45"></div>
          </div>
          {sidebarOpen && (
            <div className="text-xl font-bold tracking-tight">
              <span className="text-imara-blue">Imara</span>
              <span className="text-imara-orange">Rent</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-imara-blue/5 text-imara-blue font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className={activeTab === item.id ? 'text-imara-blue' : ''}>
                {item.icon}
              </div>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          {(user.role === UserRole.ADMIN || user.role === UserRole.MANAGER) && (
            <button 
              onClick={toggleView}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-imara-orange hover:bg-imara-orange/5 transition-colors ${!sidebarOpen && 'justify-center'}`}
            >
              <Users size={20} />
              {sidebarOpen && <span className="font-medium text-sm">Tenant Portal</span>}
            </button>
          )}
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-slate-50 px-3 py-1.5 rounded-full w-80 border border-slate-100">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search anything..." className="bg-transparent border-none text-sm focus:outline-none w-full" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-imara-orange rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role === UserRole.ADMIN ? 'Super Admin' : 'Property Manager'}</p>
              </div>
              <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="Avatar" className="w-9 h-9 rounded-full ring-2 ring-imara-blue/10" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'properties' && <PropertyList />}
          {activeTab === 'tenants' && <TenantList />}
          {activeTab === 'invoices' && <InvoiceList />}
          {activeTab === 'payments' && <Payments />}
          {activeTab === 'settings' && <SettingsView />}
          {(activeTab === 'wallet' || activeTab === 'help') && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
               <HelpCircle size={48} className="mb-4 opacity-20" />
               <p className="text-lg font-medium">Coming soon to ImaraRent</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
