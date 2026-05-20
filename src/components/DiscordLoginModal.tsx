import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Check, Info, Bot, User, HelpCircle } from 'lucide-react';
import { LogoIcon } from './Logo';

interface DiscordLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthorize: (username: string, avatarUrl: string) => void;
}

export default function DiscordLoginModal({ isOpen, onClose, onAuthorize }: DiscordLoginModalProps) {
  if (!isOpen) return null;

  const handleAuthorizeClick = () => {
    // Generate simulated user names & realistic Discord mock profile
    const usernames = ['CrypticCoder', 'NeonOverlord', 'BotWhisperer', 'ViperDev', 'CyberShaman'];
    const chosenName = usernames[Math.floor(Math.random() * usernames.length)] + '#' + Math.floor(1000 + Math.random() * 9000);
    const colors = ['EC4899', '8B5CF6', '3B82F6', '10B981', 'F59E0B'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const simulatedAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${chosenName}&backgroundColor=${randomColor}`;
    
    onAuthorize(chosenName, simulatedAvatar);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          id="discord-modal-overlay"
        />

        {/* Discord container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          id="discord-auth-window"
          className="relative w-full max-w-md overflow-hidden bg-[#2F3136] text-white rounded-lg shadow-2xl border border-white/5 font-sans"
        >
          {/* Top header decoration banner */}
          <div className="h-24 bg-[#5865F2] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150 animate-pulse" />
            <div className="relative z-10 flex items-center gap-3">
              <LogoIcon size={44} className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] animate-none" />
              <div className="text-lg font-black tracking-widest text-slate-100 uppercase">NEXBOT INDIA</div>
            </div>
          </div>

          <div className="p-6">
            {/* Target App Info */}
            <div className="flex items-start gap-4 pb-5 border-b border-[#3F4248]">
              <LogoIcon size={56} className="filter drop-shadow-[0_0_12px_rgba(139,92,246,0.25)]" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base font-black text-slate-100 tracking-wider">NEXBOT INDIA HOSTING</h3>
                  <span className="bg-[#5865F2] text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Check className="w-3 h-3 stroke-[3]" /> Verified
                  </span>
                </div>
                <p className="text-xs text-[#B9BBBE] mt-0.5">Developed by </p>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-400">NOVA LABS (India)</p>
              </div>
            </div>

            {/* Scope details */}
            <div className="py-5 text-sm">
              <p className="text-xs uppercase font-extrabold tracking-wider text-[#8E9297] mb-3">
                NEXBOT INDIA IS REQUESTING ACCESS TO AUTHORIZE LOG IN:
              </p>
              
              <ul className="space-y-3.5 text-[#DCDDDE]">
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-emerald-400 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">Access your username and avatar</p>
                    <p className="text-xs text-[#8E9297]">We use this to construct your temporary secure dashboard profile.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-emerald-400 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">Read Discord Application Integrations</p>
                    <p className="text-xs text-[#8E9297]">Fetch names, metrics, and profiles for your active bot tokens.</p>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-yellow-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">Local Safe-box Sandbox Configuration</p>
                    <p className="text-xs text-[#8E9297]">Encrypt and store dashboard session parameters locally inside the sandbox.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Indian disclaimer / compliance notice */}
            <div className="bg-[#202225] border-l-4 border-purple-500 rounded p-3.5 mb-6">
              <div className="flex gap-2">
                <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs text-[#B9BBBE] leading-relaxed">
                  <span className="font-bold text-slate-200">Secure Client Notice:</span> We store your simulated profile and simulated credentials using standard client-side browser cryptography. We are fully committed to high integrity and transparent local-only hosting.
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-end">
              <button
                type="button"
                id="cancel-discord-auth-btn"
                onClick={onClose}
                className="order-2 sm:order-1 px-5 py-2.5 text-xs font-semibold rounded bg-transparent hover:underline text-slate-300 hover:text-white transition duration-150"
              >
                Cancel
              </button>
              <button
                type="button"
                id="authorize-discord-auth-btn"
                onClick={handleAuthorizeClick}
                className="order-1 sm:order-2 flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold rounded bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3C45A5] text-white shadow-lg shadow-blue-600/10 hover:shadow-blue-600/25 transition duration-150"
              >
                <HelpCircle className="w-4 h-4 hidden sm:block" />
                Authorize & Continue
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
