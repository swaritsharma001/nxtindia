/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, ConsoleLog, ToastMessage, ActiveTab, BotStatus } from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ParticleBackground from './components/ParticleBackground';
import DiscordLoginModal from './components/DiscordLoginModal';
import ToastContainer from './components/ToastContainer';
import LandingPage from './components/LandingPage';
import DashboardStats from './components/DashboardStats';
import BotManager from './components/BotManager';
import TokenSection from './components/TokenSection';
import DocsTab from './components/DocsTab';
import SettingsTab from './components/SettingsTab';
import Footer from './components/Footer';
import ConsoleLogPanel from './components/ConsoleLogPanel';
import { Sparkles, Terminal, Info, Zap, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { PricingTab } from './components/PricingTab';
import cookie from "js-cookie"
import axios from "axios"
import { useDispatch } from "react-redux";

import { seetUser } from "../redux/userSlice";



export default function App() {
  const dispatch = useDispatch();
  // Authentication & Profile States
  const [user, setUser] = useState<{ username: string; avatarUrl: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')

  useEffect(() => {

  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");

  if (token) {

    

    // Save cookie
    cookie.set("token", token, {
      expires: 30,
      path: "/"
    });

    
  }

}, []);

  useEffect(() => {
    const token = cookie.get("token");

    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://5dfe6ee9-e7c3-42ac-8969-a375eaf6f061-00-3t8s8w7v3ehcc.worf.replit.dev:3000/auth/user",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        dispatch(seetUser(res.data)); // ✅ FIXED TYPO
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };

    fetchUser();
  }, [dispatch]);
  
  // Premium System & Dynamic White-labeling
  const [premiumStatus, setPremiumStatus] = useState<'free' | 'pending' | 'premium'>(() => {
    return (localStorage.getItem('premium_status') as 'free' | 'pending' | 'premium') || 'free';
  });

  const [brandingRemoved, setBrandingRemoved] = useState(() => {
    return localStorage.getItem('branding_removed') === 'true';
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Seed standard bots - Music Manager, Auto Moderation
  const [bots, setBots] = useState<Bot[]>([
    {
      id: 'music-manager',
      name: 'Music Manager',
      status: 'running',
      type: 'music',
      avatarColor: 'bg-purple-950/40 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)] text-purple-400',
      uptime: '1d 4h 12m',
      latency: 22,
      ramUsage: '48.4MB',
      cpuUsage: '1.2%',
      description: 'Futuristic high frequency music stream audio node supporting YT/SoundCloud feeds.',
    },
    {
      id: 'auto-mod',
      name: 'Auto Moderation',
      status: 'running',
      type: 'moderation',
      avatarColor: 'bg-blue-950/40 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.2)] text-blue-400',
      uptime: '4d 18h 35m',
      latency: 18,
      ramUsage: '32.1MB',
      cpuUsage: '0.8%',
      description: 'Advanced heuristic analysis agent that identifies spam links and toxicity.',
    },
  ]);

  // Telemetry Console Logs
  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      id: 'init-1',
      timestamp: '07:58:19.450',
      botName: 'NX-CLUSTER',
      level: 'success',
      message: 'Establish local cryptography layer. Safe AES-256 pipeline initialized successfully.',
    },
    {
      id: 'init-2',
      timestamp: '07:58:19.510',
      botName: 'BOM-NODE-01',
      level: 'info',
      message: 'Established high speed connection to Discord Gateway API in Mumbai region.',
    },
    {
      id: 'init-3',
      timestamp: '07:58:19.640',
      botName: 'Music Manager',
      level: 'success',
      message: 'Gateway handshake resolved. Connection established with 22ms average latency.',
    },
    {
      id: 'init-4',
      timestamp: '07:58:20.100',
      botName: 'Auto Moderation',
      level: 'success',
      message: 'Anti-spam database cache verified. Parsed 24,000 regulatory toxicity patterns.',
    },
  ]);

  // Utility to add a toast smoothly
  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Log dispatch helper
  const addLog = useCallback((botName: string, level: ConsoleLog['level'], message: string) => {
    const date = new Date();
    const ts = date.toTimeString().split(' ')[0] + '.' + String(date.getMilliseconds()).padStart(3, '0');
    const id = Math.random().toString(36).substring(2, 9);
    
    setLogs((prev) => {
      // Buffer logs limit to 200 items to prevent rendering slowdowns
      const truncated = prev.length > 200 ? prev.slice(prev.length - 150) : prev;
      return [...truncated, { id, timestamp: ts, botName, level, message }];
    });
  }, []);

  // State Handler Actions for Upgrades
  const handleUpgradeStatusChange = (status: 'free' | 'pending' | 'premium', utr?: string) => {
    setPremiumStatus(status);
    localStorage.setItem('premium_status', status);
    if (utr) {
      localStorage.setItem('last_utr_submit', utr);
    }
    if (status === 'premium') {
      setBrandingRemoved(true);
      localStorage.setItem('branding_removed', 'true');
      addToast('🎉 Welcome to Premium! High-capacity slots and White-Labeling active.', 'success');
      addLog('SYS-UPGRADE', 'success', `Premium subscriber gateway unlocked. Access token whitelist verified by nodejs backend.`);
    } else if (status === 'pending') {
      addToast('✉️ Payment reference submitted under review! Premium queue active.', 'info');
      addLog('SYS-UPGRADE', 'info', `New transaction request queued with UTR reference: ${utr}. NodeJS processing trigger initiated.`);
    } else {
      setBrandingRemoved(false);
      localStorage.setItem('branding_removed', 'false');
      addToast('Simulated free tier reset successfully.', 'warning');
    }
  };

  const handleToggleBranding = (removed: boolean) => {
    setBrandingRemoved(removed);
    localStorage.setItem('branding_removed', removed ? 'true' : 'false');
    if (removed) {
      addToast('White-Label active. NEXBOT logos and slogans hidden from view.', 'success');
    } else {
      addToast('NEXBOT brand elements restored successfully.', 'info');
    }
  };

  // Simulate periodic logs based on active running bots
  useEffect(() => {
    const interval = setInterval(() => {
      const activeBots = bots.filter((b) => b.status === 'running');
      
      // Randomly choose an active bot or direct cluster log
      if (activeBots.length > 0 && Math.random() > 0.3) {
        const targetBot = activeBots[Math.floor(Math.random() * activeBots.length)];
        
        const logsTemplates: Record<string, string[]> = {
          'Music Manager': [
            'Flushed voice buffer stream. Average packet loss: 0.00%',
            'Playing track "Cyberpunk Dreams - Low Lofi Remix" for user Cryptic#1244.',
            'Syncing lyrics webhook callbacks. Stream resolution locked in stereo.',
            'Uptime record verified. Relaying connection queries safely.',
          ],
          'Auto Moderation': [
            'Scanned 42 text packages. 0 toxic comments discovered.',
            'Audited message channel #general. Clean index metrics stable.',
            'Checked link invite domains. Filter list refreshed.',
            'Rate limiting parameters optimal. Spurred transaction flow approved.',
          ],
          'AI Assistant': [
            'Streaming generative AI token block response. Latency in bounds.',
            'Context window garbage collection resolved cleanly in 4ms.',
            'Calculated prompt token embedding index profile: active.',
            'Recounting chat conversational context history logs.',
          ]
        };

        const list = logsTemplates[targetBot.name] || ['Handshake heartbeat query safely processed.'];
        const chosenMessage = list[Math.floor(Math.random() * list.length)];
        const levels: ConsoleLog['level'][] = ['info', 'success'];
        addLog(targetBot.name, levels[Math.floor(Math.random() * levels.length)], chosenMessage);
      } else {
        // Infrastructure general logs
        const infraLogs = [
          'Heartbeat ping safe (24ms latency average established).',
          'AES-256 sandbox container validation loop completed and healthy.',
          'Mumbai-Node cluster ingress resource utilization checked. RAM 34.2% stable.',
          'SSL payload verify: OK. Dispatched certificates: active.',
        ];
        addLog('NX-INTEGRITY', 'info', infraLogs[Math.floor(Math.random() * infraLogs.length)]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [bots, addLog]);

  // Bot Controller closures
  const handleStartBot = (id: string) => {
    setBots((prev) =>
      prev.map((bot) => {
        if (bot.id === id) {
          addToast(`${bot.name} is starting up on Mumbai Server Cluster...`, 'info');
          addLog(bot.name, 'info', `Launching bot thread sandbox. Loading resources...`);
          
          setTimeout(() => {
            addToast(`${bot.name} launched successfully and is online.`, 'success');
            addLog(bot.name, 'success', `Gateway fully active in Mumbai. Client authenticated. Uptime starting.`);
          }, 1500);

          return {
            ...bot,
            status: 'running',
            uptime: '0h 0m',
            latency: Math.floor(15 + Math.random() * 20),
            cpuUsage: (0.5 + Math.random() * 1.5).toFixed(1) + '%',
            ramUsage: (25 + Math.random() * 20).toFixed(1) + 'MB',
          };
        }
        return bot;
      })
    );
  };

  const handleStopBot = (id: string) => {
    setBots((prev) =>
      prev.map((bot) => {
        if (bot.id === id) {
          addToast(`${bot.name} connection cleanly terminated.`, 'warning');
          addLog(bot.name, 'warning', `Client shut down request received. Disconnecting gateway...`);
          
          setTimeout(() => {
            addLog(bot.name, 'error', `Gateway connection lost (Code 1000 - NORMAL_CLOSE). Thread offline.`);
          }, 800);

          return {
             ...bot,
             status: 'stopped',
             uptime: '0h 0m',
             cpuUsage: '0%',
             ramUsage: '0MB',
             latency: 0,
          };
        }
        return bot;
      })
    );
  };

  const handleRestartBot = (id: string) => {
    const targetBot = bots.find((b) => b.id === id);
    if (!targetBot) return;

    addToast(`Rebooting ${targetBot.name} system thread...`, 'info');
    addLog(targetBot.name, 'warning', 'Initiating hot-reboot protocol. Flushing internal frames cache...');
    
    // Stop-Start sequence state
    setBots((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            uptime: '0h 0m',
            cpuUsage: '0.1%',
            ramUsage: '5MB',
            latency: 12,
          };
        }
        return b;
      })
    );

    setTimeout(() => {
      addToast(`${targetBot.name} reboot completed. Latency stabilized.`, 'success');
      addLog(targetBot.name, 'success', 'Reboot complete. Swapped processes verified on Mumbai cloud platform.');
      
      setBots((prev) =>
        prev.map((b) => {
          if (b.id === id) {
            return {
              ...b,
              cpuUsage: (0.6 + Math.random() * 1.6).toFixed(1) + '%',
              ramUsage: (28 + Math.random() * 21).toFixed(1) + 'MB',
              latency: Math.floor(16 + Math.random() * 15),
            };
          }
          return b;
        })
      );
    }, 1800);
  };

  const handleSelectBotForLogs = (botName: string) => {
    addToast(`Filtering diagnostic dashboard stream for: ${botName}`, 'success');
    addLog('CONSOLE-ROUTING', 'success', `Diagnostic logs viewer customized focus scope to "${botName}"`);
  };

  // Token Section closure
  const handleAddNewToken = (token: string) => {
    if (!isPremium && bots.length >= 2) {
      addToast('❌ Bot slot limit exceeded! Free Tier is limited to 2 active bots. Redirecting to Premium Upgrades...', 'error');
      addLog('SECURITY-LIMIT', 'error', 'Attempted to provision container thread exceeding Free-Tier allocation boundary.');
      setActiveTab('pricing');
      return;
    }

    // Generate a random bot name inside our database
    const botTypeNames = [
      { name: 'Server Auditor', type: 'moderation' as const, desc: 'Advanced analytics for guilds.' },
      { name: 'India Soundwaves', type: 'music' as const, desc: 'Lo-fi ambient tunes from Mumbai nodes.' },
      { name: 'Gemini Agent', type: 'ai' as const, desc: 'Dynamic text answers using the modern SDK.' }
    ];
    const picked = botTypeNames[Math.floor(Math.random() * botTypeNames.length)];
    const uniqueId = `sim-bot-${Math.random().toString(36).substring(2, 7)}`;
    
    addToast('Verifying Discord Secret Token integrity...', 'info');
    addLog('NX-INTEGRITY', 'info', `Decrypting and compiling incoming Token hash: ${token.substring(0, 15)}...`);

    setTimeout(() => {
      // Add custom new bot to lists!
      const newBot: Bot = {
        id: uniqueId,
        name: picked.name,
        status: 'running',
        type: picked.type,
        avatarColor: picked.type === 'music' 
          ? 'bg-purple-950/40 border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
          : picked.type === 'moderation'
          ? 'bg-blue-950/40 border-blue-500/30 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
          : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]',
        uptime: '0h 1m',
        latency: Math.floor(18 + Math.random() * 18),
        ramUsage: '28.5MB',
        cpuUsage: '0.4%',
        description: picked.desc,
      };

      setBots((prev) => [...prev, newBot]);
      addToast(`Newly Authorized Bot "${picked.name}" successfully active on India Server!`, 'success');
      addLog(picked.name, 'success', `Vessel container successfully generated. Hot-swap route registered.`);
      setActiveTab('bots'); // automatically swap view to bot catalog!
    }, 1800);
  };

  // Settings closure
  const handleSaveSettings = (message: string) => {
    addToast(message, 'success');
    addLog('NX-INFRA', 'success', 'Saved network preferences. Rerouting ingress sockets to regional routers.');
  };

  const handleClearAll = () => {
    addToast('Clearing sandbox profile and caches. Terminating connection sockets...', 'warning');
    addLog('NX-DESTRUCTION', 'error', 'Full client cache destruction request confirmed. Purging cookie salts...');
    
    setTimeout(() => {
      setUser(null);
      setBots([
        {
          id: 'music-manager',
          name: 'Music Manager',
          status: 'stopped',
          type: 'music',
          avatarColor: 'bg-purple-950/40 border-purple-500/30 text-purple-400',
          uptime: '0h 0m',
          latency: 0,
          ramUsage: '0MB',
          cpuUsage: '0%',
          description: 'Music stream audio node support.',
        },
      ]);
      setActiveTab('dashboard');
      addToast('Ingress successfully flushed. Logged out cleanly.', 'success');
    }, 1500);
  };

  // Discord Simulated Login callbacks
  const handleAuthorizeDiscordSession = (username: string, avatarUrl: string) => {
    setIsAuthModalOpen(false);
    setUser({ username, avatarUrl });
    addToast(`Discord Authorization Granted: Welcome ${username.split('#')[0]}!`, 'success');
    addLog('DISCORD-OAUTH', 'success', `OAuth scope criteria processed safe. Profile: ${username}`);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    addToast('Disconnected dashboard session safely.', 'info');
    addLog('TERMINAL-CONSOLE', 'info', 'Console session logged out. Local files remain encrypted in sandbox.');
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            
            {/* Welcome banner widget card */}
            <div className="bg-gradient-to-r from-purple-950/30 to-indigo-950/20 border border-[#8B5CF6]/20 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm select-none">
              {/* Abs behind visual glow */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-white tracking-wide">
                    WELCOME BACK, OPERATOR
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl mt-1.5 font-sans font-medium">
                    You are securely authorized into the premium Indian Node Cluster. All process containers are sandboxed and fully isolated. Switch cards or copy dev credentials underneath.
                  </p>
                </div>
                
                <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-purple-400 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-3.5 py-2.5 rounded-xl font-bold">
                  <Zap className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>NODE LEVEL: DEVRANK_01</span>
                </div>
              </div>
            </div>

            {/* Micro dashboard layout stats cards */}
            <DashboardStats bots={bots} />

            {/* Quick overview of process bots list */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-purple-400 animate-pulse" />
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                    ACTIVE BOT PROCESS ENGINES
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('bots')}
                  className="text-xs text-purple-400 hover:text-purple-300 font-bold hover:underline font-sans cursor-pointer"
                >
                  Configure Catalog
                </button>
              </div>

              <BotManager
                bots={bots.slice(0, 3)}
                onStartBot={handleStartBot}
                onStopBot={handleStopBot}
                onRestartBot={handleRestartBot}
                onSelectBotForLogs={handleSelectBotForLogs}
              />
            </div>

            {/* Logs console window explicitly at dashboard */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4.5 h-4.5 text-purple-400" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                  INTELLIGENT RE-TIME CONSOLE
                </h3>
              </div>
              
              {/* Dynamic scrollable telemetry terminal */}
              <ConsoleLogPanel logs={logs} onClearLogs={() => setLogs([])} />
            </div>

          </div>
        );
      
      case 'bots':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-black text-white tracking-widest uppercase mb-1">
                MY ACTIVE BOT HULLS
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Boot up or toggle music streams, moderations, or deep neural artificial helper networks directly inside your Mumbai container threads.
              </p>
            </div>

            <BotManager
              bots={bots}
              onStartBot={handleStartBot}
              onStopBot={handleStopBot}
              onRestartBot={handleRestartBot}
              onSelectBotForLogs={handleSelectBotForLogs}
            />

            <div className="border-t border-white/[0.04] pt-8">
              <TokenSection onSubmitToken={handleAddNewToken} />
            </div>
          </div>
        );

      case 'settings':
        return (
          <SettingsTab
            onSave={handleSaveSettings}
            onClearAll={handleClearAll}
            isPremium={isPremium}
            brandingRemoved={brandingRemoved}
            onToggleBranding={handleToggleBranding}
          />
        );

      case 'pricing':
        return (
          <PricingTab
            isPremium={isPremium}
            premiumStatus={premiumStatus}
            onUpgradeStatusChange={handleUpgradeStatusChange}
            botsCount={bots.length}
          />
        );

      case 'docs':
        return <DocsTab />;

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#02040A] text-slate-100 overflow-x-hidden selection:bg-purple-600/30 selection:text-white">
      {/* Absolute particle generator bg */}
      <ParticleBackground />

      {/* Styled toast manager alerts inside framework */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Login Discord Simulated OAuth Modal structure */}
      <DiscordLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthorize={handleAuthorizeDiscordSession}
      />

      {/* Primary Site wrapper */}
      <div id="website-layout-body" className="relative z-10 flex flex-col min-h-screen">
        
        {/* Universal Navbar */}
        <Navbar
          username={user?.username || null}
          avatarUrl={user?.avatarUrl || null}
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          brandingRemoved={brandingRemoved}
        />

        {/* Dynamic authenticated dashboard with sidebar, or immersive guest landing page */}
        {user ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Desktop Left Sidebar */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              username={user.username}
              onLogout={handleLogout}
              runningCount={bots.filter((b) => b.status === 'running').length}
              brandingRemoved={brandingRemoved}
            />

            {/* Dashboard Container body scroll */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between max-w-7xl mx-auto w-full">
              
              {/* Content view transitions with framer-motion */}
              <motion.main
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex-1 mb-10"
              >
                {renderActiveTabContent()}
              </motion.main>

              {/* Secure responsive footer */}
              <Footer />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <LandingPage onLoginClick={() => setIsAuthModalOpen(true)} />
          </div>
        )}
      </div>
    </div>
  );
  }