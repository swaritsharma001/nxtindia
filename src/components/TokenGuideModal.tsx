import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Youtube, Info, CheckCircle2, Phone, AlertTriangle, ShieldCheck, Play } from 'lucide-react';

interface TokenGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TokenGuideModal({ isOpen, onClose }: TokenGuideModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          id="token-guide-overlay"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          id="token-guide-window"
          className="relative w-full max-w-2xl overflow-hidden bg-[#0A0D14] text-slate-100 rounded-2xl shadow-2xl border border-purple-500/25 font-sans"
        >
          {/* Header glowing graphic bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
          
          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-slate-900 border border-white/5 rounded-lg hover:border-purple-500/20 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            
            {/* Title Block */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-3 select-none">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Token Extraction</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                HOW TO GET YOUR BOT TOKEN (MOBILE METHOD)
              </h2>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans font-medium">
                Follow this quick 2-step official tutorial to access and authorize your bot securely directly using our utility app on mobile devices.
              </p>
            </div>

            {/* Step 1 & 2 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Step 1 Card: APK Retrieval */}
              <div className="bg-slate-950/60 border border-purple-500/10 p-5 rounded-xl flex flex-col justify-between relative group hover:border-[#8B5CF6]/30 transition duration-300">
                <div className="absolute -top-3 left-4 bg-purple-500 text-white font-mono text-xs font-black px-2.5 py-0.5 rounded shadow-lg shadow-purple-500/30">
                  STEP 01
                </div>

                <div className="mt-2 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-100 tracking-wide uppercase">Download Official App</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Download the official <span className="text-purple-400 font-bold">NEXBOT APK</span> utility tools, or search for it directly on the Google Play Store for secure bot node verification.
                  </p>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-white/[0.03] text-[11px] leading-relaxed text-slate-400 font-medium">
                    <span className="text-amber-500 font-bold block mb-1 uppercase text-[10px]">VERIFICATION ONLY:</span>
                    This light-sandbox binary runs only on security-grounded client endpoints to facilitate rapid port extraction.
                  </div>
                </div>

                <a
                  href="https://images.mintgram.live/VIDEOS/NOBALABS-signed.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition duration-200 select-none cursor-pointer"
                >
                  <Download className="w-4 h-4 animate-bounce" />
                  <span>Download Verified APK</span>
                </a>
              </div>

              {/* Step 2 Card: Video Tutorial walkthrough */}
              <div className="bg-slate-950/60 border border-blue-500/10 p-5 rounded-xl flex flex-col justify-between relative group hover:border-blue-500/30 transition duration-300">
                <div className="absolute -top-3 left-4 bg-blue-500 text-white font-mono text-xs font-black px-2.5 py-0.5 rounded shadow-lg shadow-blue-500/30">
                  STEP 02
                </div>

                <div className="mt-2 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/40 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Youtube className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-100 tracking-wide uppercase">Watch Video tutorial</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    Follow the verified walkthrough video carefully to find your private key token path.
                  </p>

                  {/* Simulated video screenshot/play icon frame block */}
                  <div className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-900 group-hover:border-blue-500/20 transition-all flex items-center justify-center aspect-video select-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-transparent" />
                    <div className="relative flex flex-col items-center gap-1.5 p-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold">TUTORIAL WALKTHROUGH</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://youtube.com/shorts/wmfs5L44Bzc?si=pixr8_GRkKLl71j5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-white/10 hover:border-blue-500/25 transition duration-200 select-none cursor-pointer"
                >
                  <Youtube className="w-4 h-4 text-rose-500" />
                  <span>Open Video Tutorial</span>
                </a>
              </div>

            </div>

            {/* Warning guidelines disclaimer bar */}
            <div className="mt-6 flex gap-3.5 bg-slate-950 border border-white/5 p-4 rounded-xl text-xs select-none">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-slate-400 font-sans leading-relaxed">
                <h4 className="font-bold text-slate-200 uppercase">Warning: Privacy Guard Command:</h4>
                <p>
                  Do not share your retrieved token with third parties or publish it in GitHub files. Paste it safely directly into the NEXBOT secure panel context pipeline.
                </p>
              </div>
            </div>

            {/* Centered closing action button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 rounded-lg transition"
              >
                Got It
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
