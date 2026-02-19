'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Link2, Check } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function SocialShare({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out this job on ReferTRM!',
  description = 'Refer friends and earn up to 500,000 MMK',
  className = '',
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Facebook',
      nameMm: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#166FE5]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    },
    {
      name: 'Telegram',
      nameMm: 'Telegram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: 'bg-[#0088cc]',
      hoverColor: 'hover:bg-[#0077b5]',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      nameMm: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'bg-[#0A66C2]',
      hoverColor: 'hover:bg-[#004182]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'TikTok',
      nameMm: 'TikTok',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      color: 'bg-[#000000]',
      hoverColor: 'hover:bg-[#333333]',
      url: `https://www.tiktok.com/share?url=${encodedUrl}`,
    },
    {
      name: 'Viber',
      nameMm: 'Viber',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.398.002C9.473.028 5.313.344 3.014 2.467 1.294 4.182.518 6.793.397 10.022c-.101 2.682-.074 7.717 4.707 9.095h.004l-.004 2.235s-.032.906.566 1.091c.724.226 1.147-.466 1.837-1.211.378-.409.898-1.007 1.293-1.465 3.567.299 6.315-.384 6.626-.483.723-.233 4.814-.754 5.481-6.153.689-5.563-.331-9.079-2.176-10.671l-.001-.001c-.582-.525-2.111-1.513-5.503-1.837 0 0-.449-.168-1.417-.166.067-.001-.375-.006-.603-.001zm.209 1.59c.187-.001.352.002.482.011 4.417.288 6.222 1.678 6.806 2.211 1.535 1.316 2.339 4.467 1.769 9.151-.555 4.475-3.821 4.842-4.432 5.039-.256.083-2.675.712-5.691.469 0 0-2.254 2.72-2.957 3.432-.109.111-.237.155-.322.135-.118-.029-.151-.168-.149-.369l.018-3.551c-4.039-1.118-3.804-5.321-3.716-7.521.088-2.2.579-4.011 1.965-5.38 2.077-1.886 6.028-2.01 7.227-2.016zm.232 1.948c-.08 0-.143.064-.143.145v.728c0 .08.063.145.143.145.081 0 .146-.065.146-.145v-.728c0-.081-.065-.145-.146-.145zm2.238.064c-.08 0-.145.065-.145.145v.728c0 .081.065.145.145.145.081 0 .145-.064.145-.145v-.728c0-.08-.064-.145-.145-.145zm-4.458.021c-.081 0-.146.065-.146.145v.728c0 .081.065.145.146.145.08 0 .145-.064.145-.145v-.728c0-.08-.065-.145-.145-.145zm6.608.093c-.081 0-.146.065-.146.145v.728c0 .08.065.145.146.145.08 0 .145-.065.145-.145v-.728c0-.08-.065-.145-.145-.145zm-8.828.032c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm5.588.032c-.081 0-.146.065-.146.145v.728c0 .08.065.145.146.145.08 0 .145-.065.145-.145v-.728c0-.08-.065-.145-.145-.145zm-4.458.053c-.081 0-.146.065-.146.145v.728c0 .081.065.145.146.145.08 0 .145-.064.145-.145v-.728c0-.08-.065-.145-.145-.145zm6.608.064c-.081 0-.145.065-.145.145v.728c0 .08.064.145.145.145.08 0 .145-.065.145-.145v-.728c0-.08-.065-.145-.145-.145zm-8.828.032c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm5.588.032c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm-4.458.053c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm6.608.064c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm-8.828.032c-.08 0-.145.065-.145.145v.728c0 .08.065.145.145.145.081 0 .146-.065.146-.145v-.728c0-.08-.065-.145-.146-.145zm10.978.211c-.751.003-1.466.248-2.042.697-1.541 1.202-2.113 3.329-1.416 5.261.592 1.634 1.923 2.867 3.516 3.257.216.053.44.084.667.093.028.001.056.002.083.002.274 0 .542-.037.8-.109.503-.143.946-.409 1.3-.781.03-.032.03-.084-.002-.115-.032-.03-.084-.03-.115.002-.326.345-.734.593-1.197.723-.238.067-.486.101-.736.101-.025 0-.051 0-.076-.002-.209-.008-.417-.037-.617-.088-1.478-.363-2.711-1.507-3.258-3.019-.643-1.784-.113-3.754 1.316-4.867.532-.415 1.194-.642 1.888-.644h.013c.738 0 1.451.263 2.008.742.031.027.078.024.105-.007.027-.031.024-.078-.007-.105-.602-.518-1.39-.808-2.227-.785zm-2.078 2.352c-.089 0-.178.006-.266.019-.666.093-1.176.558-1.254 1.14-.057.428.085.857.392 1.178.32.337.777.534 1.254.541h.024c.469 0 .915-.18 1.244-.504.334-.328.52-.769.523-1.241.003-.468-.177-.914-.504-1.244-.322-.325-.762-.506-1.229-.506-.061 0-.122.003-.184.017zm.068 2.616c-.293 0-.57-.106-.779-.301-.22-.206-.331-.489-.313-.797.02-.351.296-.641.681-.714.072-.013.145-.02.218-.02.296 0 .576.11.789.311.214.202.331.471.33.758-.001.287-.117.555-.327.754-.207.196-.482.304-.773.309h-.026z"/>
        </svg>
      ),
      color: 'bg-[#7360F2]',
      hoverColor: 'hover:bg-[#6650E0]',
      url: `viber://forward?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-teal-500/20"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
        <span className="burmese-text text-xs opacity-80">မျှဝေမည်</span>
      </button>

      {/* Share Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto z-50 glass-card p-6 bg-slate-900 border border-white/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Share This Job</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Social Buttons Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl ${link.color} ${link.hoverColor} text-white transition-all transform hover:scale-105`}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                    <span className="text-xs opacity-70 burmese-text">{link.nameMm}</span>
                  </a>
                ))}
              </div>

              {/* Copy Link */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-slate-400 mb-2">Or copy link</p>
                <div className="flex gap-2">
                  <div className="flex-1 px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300 truncate">
                    {url}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      copied
                        ? 'bg-green-500 text-white'
                        : 'bg-teal-500 text-white hover:bg-teal-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Myanmar Social Media Tip */}
              <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-xs text-amber-400">
                  💡 <span className="font-medium">Tip:</span> Facebook & Telegram are most popular in Myanmar for job sharing!
                </p>
                <p className="text-xs text-amber-400/70 burmese-text mt-1">
                  Facebook နှင့် Telegram သည် မြန်မာ၌ အလုပ်မျှဝေရန် အသုံးအများဆုံးဖြစ်ပါသည်!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
