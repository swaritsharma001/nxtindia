import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, LogOut, Sliders, LayoutGrid, CheckCircle, Flame, Menu, X, Bell, Globe, BookOpen, IndianRupee } from 'lucide-react';
import { ActiveTab } from '../types';
import { LogoIcon, LogoText } from './Logo';

interface NavbarProps {
  username: string | null;
  avatarUrl: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  brandingRemoved?: boolean;
}

export default function Navbar({
  username,
  avatarUrl,
  onLoginClick,
  onLogout,
  activeTab,
  setActiveTab,
  brandingRemoved = false,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMobileNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 w-full bg-slate-950/75 border-b border-[#8B5CF6]/15 backdrop-blur-md select-none font-sans"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Branding section */}
        <div className="flex items-center gap-2.5">
          {/* Mobile hamburger menu (only when logged in) */}
          {username && (
            <button
              type="button"
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 md:hidden focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <div
            onClick={() => username && setActiveTab('dashboard')}
            className={`flex items-center gap-3 cursor-pointer ${username ? 'hover:opacity-90' : ''}`}
          >
            <LogoIcon size={36} brandingRemoved={brandingRemoved} className="filter drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" />
            <LogoText brandingRemoved={brandingRemoved} />
          </div>
        </div>

        {/* Action button section (Login or Avatar Dropdown) */}
        <div className="flex items-center gap-3">
          
          {/* Node Health System Signal, shown when logged in */}
          {username && (
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-emerald-500/10 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400 font-medium">CLUSTER-IN-BOM: ON</span>
            </div>
          )}

          {username ? (
            <div className="flex items-center gap-3">
              {/* Notifications bell */}
              <div className="relative p-1.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-white/5 cursor-pointer transition">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
              </div>

              {/* User Avatar with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="navbar-profile-dropdown-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 hover:bg-slate-900/85 rounded-full border border-white/5 hover:border-purple-500/20 md:px-3 text-left transition duration-200 cursor-pointer"
                >
                  <img
                    src={avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=NxtBot'}
                    alt="Discord Avatar"
                    className="w-7 h-7 rounded-full bg-slate-800 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-slate-200 hover:text-white truncate max-w-28 font-mono">
                    {username.split('#')[0]}
                  </span>
                </button>

                {/* Dropdown Menu block */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      id="navbar-profile-dropdown"
                      className="absolute right-0 mt-2.5 w-52 overflow-hidden rounded-xl border border-purple-500/20 bg-slate-950 text-slate-100 shadow-2xl shadow-purple-950/20 before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-500/5 before:to-transparent before:pointer-events-none"
                    >
                      {/* Dropdown Profile Summary */}
                      <div className="p-3.5 border-b border-[#8B5CF6]/10 text-xs bg-slate-900/30">
                        <p className="text-slate-400 font-medium">Logged in as:</p>
                        <p className="font-bold text-white text-sm font-mono truncate">{username}</p>
                      </div>

                      {/* Dropdown actions */}
                      <div className="p-1 space-y-0.5">
                        <button
                          type="button"
                          id="dropdown-tab-dashboard"
                          onClick={() => {
                            setActiveTab('dashboard');
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                            activeTab === 'dashboard' ? 'bg-[#8B5CF6]/15 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <LayoutGrid className="w-4 h-4" />
                          <span>Console Dashboard</span>
                        </button>

                        <button
                          type="button"
                          id="dropdown-tab-settings"
                          onClick={() => {
                            setActiveTab('settings');
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                            activeTab === 'settings' ? 'bg-[#8B5CF6]/15 text-purple-400' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Sliders className="w-4 h-4" />
                          <span>Bot Settings</span>
                        </button>

                        <div className="h-px bg-[#8B5CF6]/10 my-1" />

                        <button
                          type="button"
                          id="dropdown-logout-btn"
                          onClick={() => {
                            onLogout();
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              type="button"
              id="landing-login-nav-btn"
              className="relative group overflow-hidden px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Login with Discord</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation (only visible when menu is toggled & user is authorized) */}
      <AnimatePresence>
        {mobileMenuOpen && username && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-nav-drawer"
            className="md:hidden border-b border-[#8B5CF6]/15 bg-slate-950 px-4 py-4 space-y-1 select-none"
          >
            {[
              { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutGrid },
              { id: 'bots' as ActiveTab, label: 'Bots Catalog', icon: Bot },
              { id: 'pricing' as ActiveTab, label: 'Premium Plan ⚡', icon: IndianRupee },
              { id: 'settings' as ActiveTab, label: 'Config Settings', icon: Sliders },
              { id: 'docs' as ActiveTab, label: 'Docs', icon: BookOpen },
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`mobile-tab-btn-${item.id}`}
                  onClick={() => handleMobileNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#8B5CF6]/15 text-purple-400 border border-purple-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-purple-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="h-px bg-white/5 my-2" />
            
            <button
              type="button"
              id="mobile-drawer-logout-btn"
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Disconnect Session</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
