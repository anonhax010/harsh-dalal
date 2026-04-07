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
  Moon
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

// --- Components ---

const TrustNotification = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
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
    };

    const interval = setInterval(showNext, 8000);
    showNext();

    return () => clearInterval(interval);
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors z-10 dark:text-white"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Received!</h2>
              <p className="text-gray-600 dark:text-gray-400">Your UTR number <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{utr}</span> is being verified. You will receive your gift card code via SMS/Email within 5-10 minutes.</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className={`p-6 text-white relative overflow-hidden ${card.color}`}>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Payment Gateway
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-mono font-bold">
                    <Clock size={14} />
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold">Pay ₹{card.discountPrice}</h2>
                <p className="text-white/80 text-sm">For ₹{card.amount} {card.brand} Gift Card</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 relative group">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white flex items-center justify-center relative">
                    <img 
                      src="https://i.ibb.co/MyhcxLPS/qr.png" 
                      alt="Payment QR"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80">
                      <p className="text-[10px] font-bold text-center text-gray-900 px-4 uppercase">Scan with any UPI App</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium text-center">
                  Scan the QR code above to pay using any UPI app.<br/>
                  Do not close this window after payment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Enter 12-Digit UTR Number</label>
                  <input 
                    required
                    type="text"
                    maxLength={12}
                    placeholder="e.g. 123456789012"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:text-white"
                  />
                </div>
                <button 
                  disabled={utr.length < 12 || isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                    utr.length < 12 || isSubmitting 
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <TrendingUp size={20} />
                    </motion.div>
                  ) : (
                    <>Verify & Claim Card <ArrowRight size={20} /></>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Secure UPI Payment</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedCard, setSelectedCard] = useState<GiftCard | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'brand' | 'track' | 'reviews' | 'my-codes'>('home');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [closingTime, setClosingTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

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
