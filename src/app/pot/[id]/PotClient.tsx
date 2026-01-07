"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    User,
    ListOrdered,
    Link as LinkIcon,
    Lock,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PotItem, FAQItem } from "@/types";
import { COUPON_PRICE } from '@/lib/potData';
import { api } from "@/services/api";

// --- Reusing these since they are specific to this page's presentation ---
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
                        window.location.href = "/";
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
    onProfileClick
}: {
    onProfileClick?: (view: string) => void;
}) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Added for mobile menu

    // Mock user data - In production, this would come from your auth context/state
    const user = { name: "Royal Escape", email: "user@example.com" };
    const isLoggedIn = true; // Set to false to show login/register buttons

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    const handleProfileOption = (view: string) => {
        setIsProfileDropdownOpen(false);
        if (onProfileClick) {
            onProfileClick(view);
        } else {
            window.location.href = `/?view=${view}`;
        }
    };

    const handleSignOut = async () => {
        try {
            await api.auth.logout();
            localStorage.removeItem('royalEscapeUser');
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleAuthClick = (mode: 'signin' | 'signup') => {
        window.location.href = `/?auth=${mode}`;
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Flex grow allows it to take available space */}
                    <button
                        onClick={handleHomeClick}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0 mr-4"
                    >
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center p-0.5 overflow-hidden flex-shrink-0">
                            <Image 
                                src="/logo.png" 
                                alt="Royal Escape Logo" 
                                width={40} 
                                height={40} 
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-none">
                            Royal Escape
                        </span>
                    </button>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {isLoggedIn ? (
                            <>
                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 text-black font-bold rounded-full transition-all hover:ring-2 hover:ring-yellow-400 text-sm sm:text-base"
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
                                    className="px-3 sm:px-5 py-1.5 sm:py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all text-sm sm:text-base whitespace-nowrap"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleAuthClick('signup')}
                                    className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg shadow-md hover:shadow-yellow-400/40 transition-all text-sm sm:text-base whitespace-nowrap hidden sm:block"
                                >
                                    REGISTER
                                </button>
                                 {/* Mobile Register (Icon or shorter text) - Keeping distinct for clarity */}
                                 <button
                                    onClick={() => handleAuthClick('signup')}
                                    className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg shadow-md hover:shadow-yellow-400/40 transition-all text-sm whitespace-nowrap sm:hidden"
                                >
                                    JOIN
                                </button>
                            </>
                        )}
                        {/* Mobile Menu Button - Added to match homepage */}
                        <button
                            className="md:hidden p-1.5 sm:p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                        </button>
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
    if (!type || type === 'wallet') return null;

    const modalContent = {
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
    
    // @ts-ignore
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
    pot,
    relatedPots
}: {
    pot: PotItem;
    relatedPots: PotItem[]
}) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [infoModalType, setInfoModalType] = useState<'wallet' | 'dashboard' | 'personalInfo' | 'referrals' | null>(null);

    const handlePurchase = async () => {
         // In a real implementation, you would trigger the payment API here
         // await api.payment.createSession({ potId: pot.id });
        setIsPaymentModalOpen(true);
    };

    const handleProfileClick = (view: string) => {
        const modalMap: Record<string, 'dashboard' | 'personalInfo' | 'referrals'> = {
            'myOrders': 'dashboard',
            'personalInfo': 'personalInfo',
            'myReferrals': 'referrals'
        };
        // @ts-ignore
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
                            {pot.prizeDetails && pot.prizeDetails.map((d, idx) => (
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
                            {pot.gallery && pot.gallery.map((g, i) => (
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

                {/* Merchandise Section (Removed Selection Logic, Display Only if needed, or repurposed) */}
                {/* Simplified Purchase Section */}
                <section id="purchase" className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
                        Enter the Draw
                    </h2>
                    
                     <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 max-w-2xl mx-auto backdrop-blur-md">
                        <div className="flex flex-col items-center gap-6">
                            <div className="p-4 bg-yellow-400/10 rounded-full border border-yellow-400/30">
                                <Ticket className="w-12 h-12 text-yellow-400" />
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Secure Your Entry Ticket</h3>
                                <p className="text-slate-300">
                                    Purchase your entry for <span className="text-white font-bold">₹{COUPON_PRICE}</span> and get a chance to win the <span className="text-yellow-400 font-bold">{pot.name}</span>.
                                </p>
                            </div>

                            <motion.button
                                onClick={handlePurchase}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-12 py-5 text-xl font-black rounded-full transition-all duration-300 shadow-2xl bg-gradient-to-r ${colors.button} text-white hover:shadow-3xl ${colors.glow} w-full sm:w-auto`}
                            >
                                <div className="flex items-center gap-3 justify-center">
                                    <Ticket className="w-6 h-6" />
                                    PAY ₹{COUPON_PRICE} & JOIN
                                </div>
                            </motion.button>
                            
                            <p className="text-xs text-slate-500">
                                * By proceeding, you agree to our Terms & Conditions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Terms & Conditions */}
                <section id="terms" className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                        Terms & Conditions
                    </h2>
                    <div className={`p-8 bg-gradient-to-br ${colors.gradient} rounded-2xl border ${colors.border} backdrop-blur-md`}>
                        <ul className="space-y-4 text-slate-200">
                            {pot.termsAndConditions && pot.termsAndConditions.map((term, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                                    <span>{term}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                {pot.faqs && <FAQ faqs={pot.faqs} colors={colors} />}
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
