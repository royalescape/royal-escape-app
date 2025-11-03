// src/app/pot/[id]/PotClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users,
    Clock,
    Sparkles,
    Target,
    CheckCircle,
    Gift,
    Calendar,
    Loader2,
    Coins,
    Hotel,
    Plane,
    Laptop,
    Watch,
    ChevronDown,
    Ticket,
    Trophy,
    Crown,
    Home,
    Wallet,
    User,
    ListOrdered,
    Link as LinkIcon,
    Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data structures
interface FAQItem {
    question: string;
    answer: string;
}

interface MerchItem {
    id: number;
    name: string;
    price: number;
    image: string;
    costAfterCoupon: number;
}

interface PotItem {
    id: number;
    category: "gold" | "luxury" | "maldives" | "macbook" | "watch";
    type: "Electronics" | "Travel" | "Financial";
    name: string;
    description: string;
    prizeValue: string;
    totalSlots: number;
    filled: number;
    remaining: number;
    daysLeft: number;
    endDate: string;
    status: string;
    prizeDetails: string[];
    gallery: string[];
    merchList: MerchItem[];
    faqs: FAQItem[];
    termsAndConditions: string[];
    color: string;
}

const COUPON_PRICE = 499;

// Mock pot data
const mockPotData: PotItem[] = [
    {
        id: 1,
        category: "macbook",
        type: "Electronics",
        name: "MacBook Air M3",
        description: "Win the Latest MacBook Air with M3 Chip - Power Meets Elegance.",
        prizeValue: "₹1,14,900",
        totalSlots: 800,
        filled: 589,
        remaining: 211,
        daysLeft: 6,
        endDate: "15 November 2025",
        status: "Active",
        prizeDetails: [
            "Apple M3 chip with 8-core CPU",
            "13.6-inch Liquid Retina display",
            "8GB unified memory, 256GB SSD",
            "Up to 18 hours battery life",
            "1080p FaceTime HD camera",
            "MagSafe 3 charging port"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
            "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80"
        ],
        merchList: [
            { id: 1, name: "Premium Laptop Sleeve", price: 499, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80", costAfterCoupon: 0 },
            { id: 2, name: "Wireless Mouse & Pad", price: 499, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", costAfterCoupon: 0 },
            { id: 3, name: "USB-C Hub Adapter", price: 499, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80", costAfterCoupon: 0 },
            { id: 4, name: "Tech Organizer Pouch", price: 499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", costAfterCoupon: 0 }
        ],
        faqs: [
            { question: "How many entries can I purchase?", answer: "You can purchase up to 5 entries per user to ensure fair participation." },
            { question: "When will the winner be announced?", answer: "The draw closes on November 15, 2025, and the winner will be announced within 24 hours." }
        ],
        termsAndConditions: [
            "Each entry purchased is non-refundable once confirmed.",
            "Winners will be contacted via registered email within 24 hours of the draw.",
            "The MacBook Air M3 will be delivered within 15 business days.",
            "Royal Escape reserves the right to substitute an equivalent model if unavailable."
        ],
        color: "#6366F1"
    },
    {
        id: 2,
        category: "watch",
        type: "Electronics",
        name: "Apple Watch Ultra 2",
        description: "Engineered for adventure, endurance, and fitness.",
        prizeValue: "₹89,900",
        totalSlots: 180,
        filled: 135,
        remaining: 45,
        daysLeft: 10,
        endDate: "12 November 2025",
        status: "Active",
        prizeDetails: [
            "49mm Titanium Case with Ocean Band",
            "S9 SiP chip for enhanced performance",
            "36-hour battery life",
            "Precision dual-frequency GPS"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80",
            "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&q=80"
        ],
        merchList: [
            { id: 1, name: "Adventure Mug", price: 299, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80", costAfterCoupon: 0 }
        ],
        faqs: [
            { question: "Is this the latest model?", answer: "Yes, this is the 2024 Apple Watch Ultra 2." }
        ],
        termsAndConditions: ["Limited to 5 entries per user."],
        color: "#10B981"
    },
    {
        id: 3,
        category: "gold",
        type: "Financial",
        name: "24K Gold Coin",
        description: "A 24K certified 10-gram gold coin - a timeless symbol of prosperity.",
        prizeValue: "₹71,000",
        totalSlots: 150,
        filled: 90,
        remaining: 60,
        daysLeft: 8,
        endDate: "10 November 2025",
        status: "Active",
        prizeDetails: [
            "10g of 24K certified gold",
            "Hallmarked and BIS-certified",
            "Comes in secure tamper-proof packaging"
        ],
        gallery: [
            "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80"
        ],
        merchList: [
            { id: 1, name: "Royal Pouch", price: 199, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80", costAfterCoupon: 0 }
        ],
        faqs: [
            { question: "Is the gold coin hallmarked?", answer: "Yes, it is 24K BIS-certified gold." }
        ],
        termsAndConditions: ["Gold purity verified by BIS."],
        color: "#F59E0B"
    }
];

// Icon Map
const IconMap: Record<string, React.ElementType> = {
    gold: Coins,
    luxury: Hotel,
    maldives: Plane,
    macbook: Laptop,
    watch: Watch,
    default: Sparkles,
};

// Color configurations based on category
/* eslint-disable  @typescript-eslint/no-explicit-any */
const getColorClasses = (category: string) => {
    const configs: Record<string, any> = {
        macbook: {
            gradient: "from-indigo-600/20 via-purple-600/20 to-blue-600/20",
            border: "border-indigo-500/30",
            text: "text-indigo-300",
            button: "from-indigo-500 to-purple-600",
            glow: "shadow-indigo-500/20"
        },
        watch: {
            gradient: "from-emerald-600/20 via-green-600/20 to-teal-600/20",
            border: "border-emerald-500/30",
            text: "text-emerald-300",
            button: "from-emerald-500 to-green-600",
            glow: "shadow-emerald-500/20"
        },
        gold: {
            gradient: "from-yellow-600/20 via-amber-600/20 to-orange-600/20",
            border: "border-yellow-500/30",
            text: "text-yellow-300",
            button: "from-yellow-500 to-amber-600",
            glow: "shadow-yellow-500/20"
        },
        luxury: {
            gradient: "from-orange-600/20 via-red-600/20 to-pink-600/20",
            border: "border-orange-500/30",
            text: "text-orange-300",
            button: "from-orange-500 to-red-600",
            glow: "shadow-orange-500/20"
        },
        maldives: {
            gradient: "from-cyan-600/20 via-blue-600/20 to-indigo-600/20",
            border: "border-cyan-500/30",
            text: "text-cyan-300",
            button: "from-cyan-500 to-blue-600",
            glow: "shadow-cyan-500/20"
        }
    };
    return configs[category] || configs.macbook;
};

// Fixed Category Toggles Component
const SameCategoryToggles = ({
    currentPotId,
    pots,
    type,
    category
}: {
    currentPotId: number;
    pots: PotItem[];
    type: PotItem["type"];
    category: string;
}) => {
    const colors = getColorClasses(category);

    if (pots.length <= 1) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className={`w-6 h-6 ${colors.text}`} />
                More {type} Pots
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
                {pots.map((pot) => {
                    const isActive = pot.id === currentPotId;
                    const PotIcon = IconMap[pot.category] || IconMap.default;
                    const potColors = getColorClasses(pot.category);

                    return (
                        <Link key={pot.id} href={`/pot/${pot.id}`}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative min-w-[200px] px-5 py-3 rounded-xl whitespace-nowrap
                                border-2 transition-all duration-300 backdrop-blur-md
                                ${isActive
                                        ? `bg-gradient-to-r ${potColors.gradient} ${potColors.border} ${potColors.text} shadow-xl ${potColors.glow}`
                                        : `bg-slate-800/40 border-slate-700 text-slate-300 hover:${potColors.border} hover:${potColors.text}`
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${potColors.gradient} flex items-center justify-center`}>
                                        <PotIcon className={`w-5 h-5 ${potColors.text}`} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-sm">{pot.name}</div>
                                        <div className="text-xs opacity-75">{pot.prizeValue}</div>
                                    </div>
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className={`absolute -inset-[2px] rounded-xl pointer-events-none ${potColors.border}`}
                                        style={{
                                            boxShadow: `0 0 20px ${pot.color}40`
                                        }}
                                    />
                                )}
                            </motion.button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

// Stat Card Component
/* eslint-disable  @typescript-eslint/no-explicit-any */
const StatCard = ({ icon: Icon, label, value, colors }: any) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-5 rounded-xl bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} transition-all duration-300 shadow-lg hover:shadow-xl ${colors.glow}`}
    >
        <div className="flex items-center justify-between mb-2">
            <Icon className={`w-6 h-6 ${colors.text}`} />
            <p className="text-sm font-medium text-slate-300">{label}</p>
        </div>
        <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
    </motion.div>
);

// Feature Item Component
/* eslint-disable  @typescript-eslint/no-explicit-any */
const FeatureItem = ({ icon: Icon, text, colors }: any) => (
    <li className="flex items-start text-base text-slate-200 mb-3">
        <Icon className={`w-5 h-5 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} />
        <span>{text}</span>
    </li>
);

// FAQ Component
/* eslint-disable  @typescript-eslint/no-explicit-any */
const FAQ = ({ faqs, colors }: { faqs: FAQItem[]; colors: any }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className="max-w-5xl mx-auto px-4 md:px-0 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                Frequently Asked Questions
            </h2>
            <div className="space-y-3">
                {faqs.map((f, i) => (
                    <motion.div
                        key={i}
                        layout
                        className={`border ${colors.border} rounded-xl overflow-hidden backdrop-blur-sm ${openIndex === i ? `bg-gradient-to-r ${colors.gradient}` : "bg-slate-800/40"}`}
                    >
                        <button
                            onClick={() => toggle(i)}
                            className="w-full px-6 py-4 flex justify-between items-center text-left"
                        >
                            <span className="font-semibold text-white">{f.question}</span>
                            <motion.span
                                animate={{ rotate: openIndex === i ? 180 : 0 }}
                                className={colors.text}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="px-6 pb-4 text-slate-300 leading-relaxed">{f.answer}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// Confetti Component
const Confetti = () => {
    const particles = Array.from({ length: 50 });
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        left: `${Math.random() * 100}%`,
                        top: -20,
                    }}
                    animate={{
                        y: [0, window.innerHeight + 100],
                        x: [0, (Math.random() - 0.5) * 200],
                        rotate: [0, Math.random() * 360],
                        opacity: [1, 0.8, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
};

// Payment Modal Component
/* eslint-disable  @typescript-eslint/no-explicit-any */
const PaymentModal = ({ onClose, potName, colors }: any) => {
    const [step, setStep] = useState<"payment" | "success">("payment");
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (step === "payment") {
            const t = setTimeout(() => setStep("success"), 2500);
            return () => clearTimeout(t);
        }
        if (step === "success") {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        window.location.href = "http://localhost:3000";
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
        >
            {step === "success" && <Confetti />}

            <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className={`relative w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 overflow-hidden ${step === "success" ? "border-green-500" : colors.border
                    }`}
            >
                {/* Animated Background Gradient */}
                {step === "success" && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )}

                <div className="relative z-10 p-8 md:p-12">
                    {step === "payment" ? (
                        <div className="text-center">
                            <Loader2 className={`w-16 h-16 ${colors.text} animate-spin mx-auto mb-6`} />
                            <h2 className="text-3xl font-bold text-white mb-3">Processing Payment...</h2>
                            <p className="text-xl text-slate-300">
                                Total Amount: <span className={`${colors.text} font-bold`}>₹{COUPON_PRICE}</span>
                            </p>
                        </div>
                    ) : (
                        <div className="text-center space-y-6">
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="flex justify-center"
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    />
                                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-6">
                                        <CheckCircle className="w-20 h-20 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Header */}
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2"
                                >
                                    ENTRY SECURED!
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold text-white flex items-center justify-center gap-2"
                                >
                                    CONGRATULATIONS!
                                    <span className="inline-block animate-bounce">🎉</span>
                                    <span className="inline-block animate-bounce delay-100">✨</span>
                                    <span className="inline-block animate-bounce delay-200">🎊</span>
                                </motion.p>
                            </div>

                            {/* Success Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-6 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Ticket className="w-6 h-6 text-green-400" />
                                    <p className="text-xl font-bold text-white">
                                        You&apos;ve Successfully Entered the Pot!
                                    </p>
                                </div>
                                <p className="text-lg text-green-300 font-semibold mb-2">
                                    Your Entry Coupon is Ready!
                                </p>
                                <p className="text-base text-slate-300">
                                    Check <span className="font-bold text-white">My Orders</span> in your profile
                                </p>
                            </motion.div>

                            {/* Prize Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-slate-800/60 border border-slate-700 rounded-xl p-4"
                            >
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Gift className={`w-5 h-5 ${colors.text}`} />
                                    <p className="text-sm text-slate-400">Entered for:</p>
                                </div>
                                <p className={`text-2xl font-bold ${colors.text}`}>{potName}</p>
                            </motion.div>

                            {/* Status Indicators */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex justify-center gap-6 text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-green-400 font-semibold">Payment Confirmed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-green-400 font-semibold">Entry Registered</span>
                                </div>
                            </motion.div>

                            {/* Redirect Notice */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="pt-4 border-t border-slate-700"
                            >
                                <p className="text-slate-400 text-sm">
                                    Redirecting to homepage in <span className="font-bold text-white text-lg">{countdown}</span> seconds...
                                </p>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Royal Escape Header Component (Matches Homepage)
const RoyalEscapeHeader = ({
    onWalletClick,
    onProfileClick
}: {
    onWalletClick?: () => void;
    onProfileClick?: (view: string) => void;
}) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Mock user data - In production, this would come from your auth context/state
    // You can pass this as a prop in production
    const user = { name: "HUMZA", email: "user@example.com" };
    const isLoggedIn = true; // Set to false to show login/register buttons

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    const handleWalletClick = () => {
        if (onWalletClick) {
            onWalletClick();
        } else {
            window.location.href = '/?view=myWallet';
        }
    };

    const handleProfileOption = (view: string) => {
        setIsProfileDropdownOpen(false);
        if (onProfileClick) {
            onProfileClick(view);
        } else {
            window.location.href = `/?view=${view}`;
        }
    };

    const handleSignOut = () => {
        // In production, clear auth state here
        localStorage.removeItem('royalEscapeUser');
        window.location.href = '/';
    };

    const handleAuthClick = (mode: 'signin' | 'signup') => {
        window.location.href = `/?auth=${mode}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={handleHomeClick}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Crown className="w-6 h-6 text-black" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Royal Escape
                        </span>
                    </button>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                {/* Wallet Button */}
                                <button
                                    onClick={handleWalletClick}
                                    className="flex items-center gap-1 px-3 py-2 border border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transition-all"
                                >
                                    <Wallet className="w-5 h-5" />
                                    <span className="hidden sm:inline">Add Money</span>
                                </button>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                                        className="flex items-center justify-center w-10 h-10 bg-yellow-400 text-black font-bold rounded-full transition-all hover:ring-2 hover:ring-yellow-400"
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </button>

                                    {isProfileDropdownOpen && (
                                        <>
                                            {/* Backdrop to close dropdown */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            />

                                            {/* Dropdown Menu */}
                                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700 z-50">
                                                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                                                    Hi, <strong>{user.name.split(' ')[0]}</strong>
                                                </div>
                                                <button
                                                    onClick={() => handleProfileOption('myOrders')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <ListOrdered className="w-4 h-4 mr-2" /> My Dashboard
                                                </button>
                                                <button
                                                    onClick={() => handleProfileOption('myWallet')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <Wallet className="w-4 h-4 mr-2" /> My Wallet
                                                </button>
                                                <button
                                                    onClick={() => handleProfileOption('personalInfo')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <User className="w-4 h-4 mr-2" /> My Personal Info
                                                </button>
                                                <button
                                                    onClick={() => handleProfileOption('myReferrals')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 pb-2 mb-2"
                                                >
                                                    <LinkIcon className="w-4 h-4 mr-2" /> My Referrals
                                                </button>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <Lock className="w-4 h-4 mr-2" /> Sign Out
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Login/Register Buttons (for logged out users)
                            <>
                                <button
                                    onClick={() => handleAuthClick('signin')}
                                    className="px-5 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleAuthClick('signup')}
                                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg shadow-md hover:shadow-yellow-400/40 transition-all"
                                >
                                    REGISTER
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

// Info Modal Component for Wallet and Profile Views
const InfoModal = ({
    type,
    onClose
}: {
    type: 'wallet' | 'dashboard' | 'personalInfo' | 'referrals' | null;
    onClose: () => void;
}) => {
    if (!type) return null;

    const modalContent = {
        wallet: {
            title: 'My Wallet',
            icon: Wallet,
            color: 'green',
            message: 'Add funds to your Royal Escape wallet to participate in draws and purchase entries.',
            note: 'Visit the main dashboard to manage your wallet and view transaction history.'
        },
        dashboard: {
            title: 'My Dashboard',
            icon: Trophy,
            color: 'blue',
            message: 'View all your active entries, upcoming draws, and transaction history.',
            note: 'Visit the main dashboard for complete overview of your Royal Escape activity.'
        },
        personalInfo: {
            title: 'My Personal Info',
            icon: User,
            color: 'purple',
            message: 'Update your profile information, contact details, and preferences.',
            note: 'Visit the main dashboard to edit your personal information.'
        },
        referrals: {
            title: 'My Referrals',
            icon: LinkIcon,
            color: 'yellow',
            message: 'Share your referral link and earn rewards when friends join Royal Escape.',
            note: 'Visit the main dashboard to view your referral statistics and earnings.'
        }
    };

    const content = modalContent[type];
    const IconComponent = content.icon;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-gray-700"
            >
                <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${content.color}-500/20 flex items-center justify-center`}>
                        <IconComponent className={`w-8 h-8 text-${content.color}-400`} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{content.title}</h2>
                    <p className="text-lg text-slate-300 mb-4">{content.message}</p>
                    <p className="text-sm text-slate-400 mb-6 p-3 bg-slate-800/50 rounded-lg">
                        💡 {content.note}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Continue Here
                        </button>
                        <button
                            onClick={() => window.location.href = `/?view=${type === 'dashboard' ? 'myOrders' : type}`}
                            className={`flex-1 px-6 py-3 bg-gradient-to-r from-${content.color}-500 to-${content.color}-600 text-white font-bold rounded-lg hover:shadow-lg transition-all`}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Main Component
export default function PotClient({
    pot = mockPotData[0],
    relatedPots = mockPotData
}: {
    pot?: PotItem;
    relatedPots?: PotItem[]
}) {
    const [selectedMerch, setSelectedMerch] = useState<number | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [infoModalType, setInfoModalType] = useState<'wallet' | 'dashboard' | 'personalInfo' | 'referrals' | null>(null);

    const handlePurchase = () => {
        if (selectedMerch !== null) setIsPaymentModalOpen(true);
    };

    const handleWalletClick = () => {
        setInfoModalType('wallet');
    };

    const handleProfileClick = (view: string) => {
        const modalMap: Record<string, 'wallet' | 'dashboard' | 'personalInfo' | 'referrals'> = {
            'myOrders': 'dashboard',
            'myWallet': 'wallet',
            'personalInfo': 'personalInfo',
            'myReferrals': 'referrals'
        };
        setInfoModalType(modalMap[view]);
    };

    const filledPercent = ((pot.filled / pot.totalSlots) * 100).toFixed(1);
    const PotIcon = IconMap[pot.category] || IconMap.default;
    const colors = getColorClasses(pot.category);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {isPaymentModalOpen && <PaymentModal onClose={() => setIsPaymentModalOpen(false)} potName={pot.name} colors={colors} />}
            <AnimatePresence>
                {infoModalType && <InfoModal type={infoModalType} onClose={() => setInfoModalType(null)} />}
            </AnimatePresence>

            {/* Royal Escape Header */}
            <RoyalEscapeHeader
                onWalletClick={handleWalletClick}
                onProfileClick={handleProfileClick}
            />

            {/* Hero Section */}
            <header className={`relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br ${colors.gradient} border-b-2 ${colors.border} backdrop-blur-xl`}>
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-center items-center mb-6 gap-4"
                    >
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border}`}>
                            <PotIcon className={`w-10 h-10 ${colors.text}`} />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                            {pot.name}
                        </h1>
                    </motion.div>

                    <p className="text-xl md:text-2xl mt-4 text-slate-200 max-w-3xl mx-auto">
                        {pot.description}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${colors.gradient} border ${colors.border} backdrop-blur-md`}>
                            <span className="text-sm font-semibold uppercase text-white">
                                {pot.status} • Closes in {pot.daysLeft} days
                            </span>
                        </div>
                        <div className={`px-6 py-3 rounded-full bg-slate-900/60 border ${colors.border} backdrop-blur-md`}>
                            <span className={`text-lg font-bold ${colors.text}`}>
                                Prize Value: {pot.prizeValue}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Toggles */}
            <SameCategoryToggles
                currentPotId={pot.id}
                pots={relatedPots}
                type={pot.type}
                category={pot.category}
            />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Stats Section */}
                <section className="mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard icon={Target} label="Total Slots" value={pot.totalSlots} colors={colors} />
                        <StatCard icon={Users} label="Entries Filled" value={pot.filled} colors={colors} />
                        <StatCard icon={Sparkles} label="Remaining" value={pot.remaining} colors={colors} />
                        <StatCard icon={Clock} label="Days Left" value={pot.daysLeft} colors={colors} />
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-6 bg-gradient-to-r ${colors.gradient} rounded-2xl border ${colors.border} backdrop-blur-md`}
                    >
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-white text-lg">Pot Progress</h4>
                            <div className={`font-bold text-xl ${colors.text}`}>{filledPercent}%</div>
                        </div>
                        <div className="w-full bg-slate-900/60 rounded-full h-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${filledPercent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-4 bg-gradient-to-r ${colors.button} shadow-lg`}
                            />
                        </div>
                        <div className="text-right text-sm text-slate-300 mt-2">
                            {pot.filled} of {pot.totalSlots} entries claimed
                        </div>
                    </motion.div>
                </section>

                {/* Prize Details & Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Prize Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:col-span-1 p-8 bg-gradient-to-br ${colors.gradient} rounded-2xl border ${colors.border} backdrop-blur-md shadow-xl`}
                    >
                        <div className="flex items-center mb-6">
                            <Gift className={`w-8 h-8 ${colors.text} mr-3`} />
                            <h2 className="text-2xl font-bold text-white">Prize Includes</h2>
                        </div>
                        <ul className="space-y-3">
                            {pot.prizeDetails.map((d, idx) => (
                                <FeatureItem key={idx} icon={CheckCircle} text={d} colors={colors} />
                            ))}
                        </ul>
                        <div className={`mt-6 p-4 bg-slate-900/40 rounded-xl border border-slate-700`}>
                            <div className="flex items-center gap-2 text-slate-300">
                                <Calendar className={`w-5 h-5 ${colors.text}`} />
                                <span className="text-sm">Entry Cut-off: <strong className="text-white">{pot.endDate}</strong></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-white">Prize Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {pot.gallery.map((g, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.03 }}
                                    className={`relative aspect-video group overflow-hidden rounded-xl shadow-xl border ${colors.border}`}
                                >
                                    <img
                                        src={g}
                                        alt={`${pot.name} - ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Merchandise Section */}
                <section id="merch" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
                        Secure Your Entry & Exclusive Merch
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pot.merchList.map((merch) => {
                            const isSelected = selectedMerch === merch.id;
                            return (
                                <motion.div
                                    key={merch.id}
                                    onClick={() => setSelectedMerch(merch.id)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 backdrop-blur-md
                                        ${isSelected
                                            ? `${colors.border} bg-gradient-to-br ${colors.gradient} shadow-2xl ${colors.glow}`
                                            : "border-slate-700 bg-slate-800/40 hover:border-slate-600"
                                        }`}
                                >
                                    <div className="relative mb-4">
                                        <img
                                            src={merch.image}
                                            alt={merch.name}
                                            className="w-full h-48 object-cover rounded-xl"
                                        />
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br ${colors.button} flex items-center justify-center`}
                                            >
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{merch.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-slate-400 line-through">₹{merch.price}</span>
                                        {merch.costAfterCoupon === 0 && (
                                            <span className={`${colors.text} font-bold`}>FREE</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Includes 1 Entry Coupon</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <motion.button
                            onClick={handlePurchase}
                            disabled={!selectedMerch}
                            whileHover={{ scale: selectedMerch ? 1.05 : 1 }}
                            whileTap={{ scale: selectedMerch ? 0.95 : 1 }}
                            className={`px-12 py-5 text-xl font-black rounded-full transition-all duration-300 shadow-2xl
                                ${selectedMerch
                                    ? `bg-gradient-to-r ${colors.button} text-white hover:shadow-3xl ${colors.glow}`
                                    : "bg-slate-700 text-slate-400 cursor-not-allowed opacity-50"
                                }`}
                        >
                            <div className="flex items-center gap-3 justify-center">
                                <Ticket className="w-6 h-6" />
                                {selectedMerch ? `BUY & GET ENTRY for ₹${COUPON_PRICE}` : "Select Merchandise to Continue"}
                            </div>
                        </motion.button>
                    </div>
                </section>

                {/* Terms & Conditions */}
                <section id="terms" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                        Terms & Conditions
                    </h2>
                    <div className={`p-8 bg-gradient-to-br ${colors.gradient} rounded-2xl border ${colors.border} backdrop-blur-md`}>
                        <ul className="space-y-4 text-slate-200">
                            {pot.termsAndConditions.map((term, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                <FAQ faqs={pot.faqs} colors={colors} />
            </main>

            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}