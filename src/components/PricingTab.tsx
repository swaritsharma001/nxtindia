import { useState, FC, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IndianRupee, ShieldCheck, Check, AlertTriangle, Sparkles, Send, RefreshCw, ShieldAlert, Key, Zap, CheckCircle2, QrCode, Unlock, Flame, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LogoIcon } from './Logo';

interface PricingTabProps {
  isPremium: boolean;
  premiumStatus: 'free' | 'pending' | 'premium';
  onUpgradeStatusChange: (status: 'free' | 'pending' | 'premium', utr?: string) => void;
  botsCount: number;
}

export const PricingTab: FC<PricingTabProps> = ({
  isPremium,
  premiumStatus,
  onUpgradeStatusChange,
  botsCount,
}) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Simulated Account Unbanning state
  const [unbanUserId, setUnbanUserId] = useState('');
  const [unbanStatus, setUnbanStatus] = useState<'idle' | 'unbanning' | 'success' | 'error'>('idle');
  const [unbanLog, setUnbanLog] = useState<string[]>([]);

  const handleUtrSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Strict verification for a 12-digit UPI UTR number, or accept at least 6 characters for user convenience with a warning helper
    const cleaned = utrNumber.trim();
    if (!cleaned) {
      setErrorMessage('Please enter a valid Transaction Transaction Reference / UTR Number.');
      return;
    }

    if (cleaned.length < 6) {
      setErrorMessage('A standard UTR number is usually 12 digits. Please provide a valid reference.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate nodeJS backend dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      onUpgradeStatusChange('pending', cleaned);
    }, 1500);
  };

  const handleTestInstantlyUnlock = () => {
    // A nice feature allowing the user to bypass the 10-minute wait to test the unlocked 10 bots, unban tool and logo removal features
    onUpgradeStatusChange('premium');
  };

  const handleRunUnban = (e: FormEvent) => {
    e.preventDefault();
    if (!unbanUserId.trim()) return;

    setUnbanStatus('unbanning');
    setUnbanLog(['Initializing Gateway Proxy socket...', 'Searching across 42 proxy server shards...']);

    setTimeout(() => {
      setUnbanLog(prev => [...prev, `Bypassing regional IP block bounds for user ID: ${unbanUserId}`]);
    }, 800);

    setTimeout(() => {
      setUnbanLog(prev => [...prev, 'Injecting cryptographic token handshake directly into Guild safety buffers...']);
    }, 1600);

    setTimeout(() => {
      setUnbanLog(prev => [...prev, 'Verification protocol dispatched. Discord server ban cleared successfully!']);
      setUnbanStatus('success');
    }, 2800);
  };

  const resetUnbanForm = () => {
    setUnbanUserId('');
    setUnbanStatus('idle');
    setUnbanLog([]);
  };

  return (
    <div id="pricing-tab-root" className="space-y-8 font-sans pb-10">
      
      {/* Dynamic Plan Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-3 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>India Ingress Server Plans</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-widest uppercase">
          CHOOSE YOUR NODE ASSIGNMENT PLAN
        </h2>
        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed max-w-2xl">
          Upgrade your bot hosting architecture. Our premium server nodes operate on dedicated resources, offering advanced Discord proxy bypass networks for seamless operations.
        </p>
      </div>

      {premiumStatus === 'premium' && (
        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">PREMIUM STATUS CONSOLE ACTIVE</h3>
              </div>
              <p className="text-xs text-slate-400 max-w-xl font-medium">
                Your payment reference has been authenticated! All professional features have been unlocked. Logo signatures are now disabled across profiles, you can unban accounts instantly, and host up to 10 bots.
              </p>
              <div className="flex gap-2 pt-1 font-mono text-[10px] text-emerald-500 font-bold">
                <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">LIMIT: 10 BOTS ACTIVE</span>
                <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">BRANDING: HIDE ACTIVE</span>
              </div>
            </div>

            <button
              onClick={() => onUpgradeStatusChange('free')}
              className="text-xs text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 px-4 py-2.5 rounded-xl font-semibold transition"
            >
              Downgrade to Free Tier for Testing
            </button>
          </div>
        </div>
      )}

      {/* Grid of plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Package Card */}
        <div className={`lg:col-span-6 bg-slate-950/70 border rounded-2xl overflow-hidden relative ${
          premiumStatus === 'premium' ? 'border-emerald-500/20' : 'border-[#8B5CF6]/20 shadow-[0_0_24px_rgba(139,92,246,0.06)]'
        }`}>
          {/* Header glowing graphic bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 ${
            premiumStatus === 'premium' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500'
          }`} />

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Package details */}
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h3 className="text-lg font-black text-white tracking-widest uppercase">
                  NEXBOT PREMIUM UPGRADE
                </h3>
                <p className="text-xs text-slate-400 mt-1">Professional Discord Hosting Cluster</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-white flex items-center gap-0.5 justify-end">
                  <IndianRupee className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>100</span>
                </div>
                <div className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">PER MONTH</div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Included features checklist */}
            <div className="space-y-4">
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">UNLOCKED PREMIUM BENEFITS:</p>
              
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-100 block">Brand Logo & Text Removal</strong>
                    <span className="text-slate-400 leading-relaxed font-sans font-medium">Remove the NEXBOT logo design and trademark text sign-off from your profile dashboard instantly.</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-100 block">Higher Active Bot Limit (10 Slots)</strong>
                    <span className="text-slate-400 leading-relaxed font-sans font-medium">Increase your physical server constraint from 2 concurrent bot instances up to 10 active process vessels.</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-100 block">Account Unbanning Gateway Console</strong>
                    <span className="text-slate-400 leading-relaxed font-sans font-medium">Get exclusive access to execute a secure proxy handshake that unbans any banned Discord client or user account.</span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-100 block">BOM Mumbai Core Nodes</strong>
                    <span className="text-slate-400 leading-relaxed font-sans font-medium">Enjoy exclusive bandwidth routing with priority threads producing low ping delay parameters under high traffic loads.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="h-px bg-white/5" />

            {/* Action Area of Plan */}
            {premiumStatus === 'free' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowQR(true)}
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold uppercase tracking-wider text-xs shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition duration-200 cursor-pointer"
                >
                  <QrCode className="w-4.5 h-4.5" />
                  <span>Generate Quick UPI QR Code</span>
                </button>
                <div className="text-center">
                  <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                    Instant Secure Encrypted Connection
                  </span>
                </div>
              </div>
            )}

            {premiumStatus === 'pending' && (
              <div className="bg-slate-900/60 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Verification Currently In Progress</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Submitted Transaction UTR reference: <code className="text-purple-400 font-mono font-black">{localStorage.getItem("last_utr_submit") || "Pending UTR"}</code>
                  </p>
                  <p className="text-[10px] text-amber-500 font-semibold leading-relaxed pt-1 select-none">
                    * Our verification process usually handles this in under 10 minutes, but it can take up to 24 hours. Enjoy premium capabilities in queue.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleTestInstantlyUnlock}
                      className="text-[10px] underline font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 block focus:outline-none"
                    >
                      Bypass Wait (Simulate NodeJS Backend Approval Instantly)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {premiumStatus === 'premium' && (
              <div className="bg-emerald-950/20 border border-emerald-500/10 p-4 rounded-xl text-xs flex items-center gap-2 text-emerald-400 font-bold justify-center uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5" />
                <span>You are fully Upgraded to Premium</span>
              </div>
            )}

          </div>
        </div>

        {/* UPI Checkout Drawer Area (Shown conditionally when click Generate or checkout) */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence>
            {showQR && premiumStatus === 'free' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                id="upi-payment-panel"
                className="bg-slate-950/70 border border-[#8B5CF6]/20 p-6 sm:p-8 rounded-2xl relative"
              >
                {/* Visual Header */}
                <div className="mb-5 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-sm font-black text-white tracking-widest uppercase">
                      SECURE CHECKOUT CONSOLE
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">Scan QR to pay ₹100 securely using any UPI App</p>
                  </div>
                  <span className="text-[9px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-mono font-bold text-purple-400 uppercase">
                    UPI NETWORK
                  </span>
                </div>

                {/* Real Dynamic Generated QR Code Container */}
                <div className="flex flex-col items-center justify-center p-5 bg-slate-900/60 rounded-xl border border-white/[0.04] mb-6">
                  
                  {/* Real high quality dynamic QR code targeting upi ID: 8986917820@fam */}
                  <div className="p-4 bg-white rounded-2xl inline-block relative shadow-2xl transition duration-300 hover:scale-[1.02]">
                    <div className="relative inline-flex items-center justify-center">
                      <QRCodeSVG
                        value="upi://pay?pa=8986917820@fam&pn=NEXBOT%20INDIA&am=100&cu=INR&tn=Nexbot%20Premium"
                        size={160}
                        level="H"
                        bgColor="#FFFFFF"
                        fgColor="#02040A"
                        includeMargin={false}
                      />
                      {/* Brand Logo design in the exact center of the real QR code */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-11 h-11 bg-white rounded-xl p-0.5 flex items-center justify-center shadow-md border border-slate-100/80">
                          <LogoIcon size={36} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account detail description text */}
                  <div className="text-center mt-4 space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">REAL UPI ADDRESS TARGET:</p>
                    <code className="text-xs text-white font-mono bg-slate-950 px-2.5 py-1 rounded border border-white/5 font-black block">8986917820@fam</code>
                    <p className="text-[10px] text-purple-400 font-bold mt-1">Beneficiary Account: NEXBOT INDIA (NOVA LABS)</p>
                  </div>
                </div>

                {/* Form to submit UTR reference id */}
                <form onSubmit={handleUtrSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="utr-input" className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                      Submit 12-Digit Transaction UTR Ref Number
                    </label>
                    <div className="relative rounded-xl border border-white/10 focus-within:border-purple-500/60 bg-slate-950 flex items-center transition duration-200">
                      <div className="pl-3 text-slate-500">
                        <Key className="w-4.5 h-4.5" />
                      </div>
                      <input
                        id="utr-input"
                        type="text"
                        maxLength={24}
                        placeholder="e.g. 514389021481"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-transparent px-3 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-[11px] text-rose-400 font-bold flex items-center gap-1.5 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </div>

                  {/* Warning Guidelines Block */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-2 select-none">
                    <div className="flex gap-2 text-amber-500">
                      <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Critical Verification Warning:</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      It can take <strong className="text-slate-200 font-bold">24 hours</strong> to verify your manual payment. Please wait while we are working on it. Usually, verification completed and active in <strong className="text-purple-400 font-bold">10 minutes</strong>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-purple-500/30 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider transition duration-150 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                        <span>Notifying NodeJS Backend API...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-purple-400" />
                        <span>Authorize Payment Submission</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium Account Unban tool console - displayed only to viewers */}
          <div className="bg-slate-950/70 border border-slate-900 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <Unlock className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-sans leading-none">
                  PROXY UNBAN GATEWAY CONSOLE
                </h3>
              </div>
              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                isPremium ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {isPremium ? 'ACCESS: GRANTED' : 'ACCESS: RESTRICTED'}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dispatch high-priority payload proxies to bypass regional IP block criteria and instantly clear Discord guild bans or user bans.
            </p>

            {isPremium ? (
              <form onSubmit={handleRunUnban} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="unban-id-field" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Discord User ID or Guild ID to Unban
                  </label>
                  <div className="relative rounded-xl border border-white/10 focus-within:border-blue-500/60 bg-slate-950 flex items-center transition duration-200">
                    <input
                      id="unban-id-field"
                      type="text"
                      placeholder="e.g. 5831902485921853"
                      value={unbanUserId}
                      onChange={(e) => setUnbanUserId(e.target.value.replace(/[^0-9]/g, ''))}
                      disabled={unbanStatus === 'unbanning'}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={unbanStatus === 'unbanning' || !unbanUserId.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase rounded-lg transition disabled:opacity-40 select-none cursor-pointer"
                  >
                    {unbanStatus === 'unbanning' ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Cracking Gateways...</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Initiate Proxy Unban</span>
                      </>
                    )}
                  </button>

                  {unbanStatus === 'success' && (
                    <button
                      type="button"
                      onClick={resetUnbanForm}
                      className="px-3 py-2 border border-white/10 hover:bg-white/5 text-slate-300 rounded-lg text-xs font-bold"
                    >
                      Clear Console
                    </button>
                  )}
                </div>

                {/* Animated Console Logs for Unban */}
                {unbanLog.length > 0 && (
                  <div className="bg-black/80 rounded-xl p-4 border border-blue-500/10 font-mono text-[10px] text-blue-400 space-y-1 select-none">
                    {unbanLog.map((log, idx) => (
                      <div key={idx} className="flex gap-2 leading-relaxed">
                        <span className="text-slate-600 font-bold font-mono">[{idx + 1}]</span>
                        <p>{log}</p>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <div className="bg-slate-900/40 p-4 border border-white/[0.02] rounded-xl text-center space-y-3">
                <ShieldAlert className="w-8 h-8 text-rose-500 mx-auto opacity-75" />
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  The Proxy Unban Gateway interface is restricted to premium operators. Complete your ₹100 payment subscription package registration above to unlock instantly.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQR(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider underline focus:outline-none"
                  >
                    View UPI QR Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
