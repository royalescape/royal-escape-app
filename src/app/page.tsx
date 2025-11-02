"use client";

import React, { useState, useEffect, useCallback } from 'react';
import FAQSection from "@/components/FAQSection";
import {
    ShoppingCart,
    Crown,
    Sparkles,
    Trophy,
    Gift,
    Lock,
    Instagram,
    Facebook,
    MessageCircle,
    Wallet,
    User,
    Menu,
    X,
    LogOut,
    User as UserIcon,
    Mail,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

// --- AUTH MODAL COMPONENT (Integrated for Single-File Mandate) ---

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'signin' | 'signup';
    // The handler to be called when auth is successful.
    onAuthSuccess: (user: { name: string; email: string }) => void;
}

// Mock delay function to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onAuthSuccess }) => {
    const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Sync mode when the modal is opened with a new initialMode prop
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode, isOpen]);

    // Clear form state when modal closes or mode changes
    useEffect(() => {
        setEmail('');
        setPassword('');
        setName('');
        setError('');
    }, [mode, isOpen]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // --- Mock Authentication Logic ---
        await delay(1500); // Simulate network delay

        try {
            if (mode === 'signup') {
                if (!email || !password || !name) {
                    throw new Error('Please fill in all fields.');
                }
                if (password.length < 6) {
                    throw new Error('Password must be at least 6 characters.');
                }

                // Mock Sign Up API call successful
                console.log(`Mock Sign Up: User ${email} registered.`);
                onAuthSuccess({ name: name, email: email });

            } else { // 'signin'
                if (!email || !password) {
                    throw new Error('Please enter your email and password.');
                }

                // Mock Sign In API call successful
                console.log(`Mock Sign In: User ${email} logged in.`);
                const mockUserName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
                onAuthSuccess({ name: mockUserName, email: email });
            }
        } catch (err) {
            // Using a simple check to handle mock error
            const message = err instanceof Error ? err.message : 'An unexpected error occurred during authentication.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const isSignUp = mode === 'signup';
    const formTitle = isSignUp ? 'Create Royal Account' : 'Sign In to Your Kingdom';
    const submitButtonText = isSignUp ? 'Sign Up for Free Entry' : 'Sign In';

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose} // Close when clicking outside the modal content
        >
            <div
                className="relative w-full max-w-lg bg-gray-900 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,193,7,0.3)] border border-yellow-500/20"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h2 className="text-3xl font-bold text-white mb-2">{formTitle}</h2>
                    <p className="text-gray-400 text-sm">
                        {isSignUp
                            ? "Join today and get your first entry to luxury rewards!"
                            : "Welcome back, Your Majesty."
                        }
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        {!isSignUp && (
                            <div className="text-right mt-2">
                                <button type="button" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors">
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-xl">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading && (
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {submitButtonText}
                    </button>
                </form>

                {/* Switch Mode Link */}
                <div className="mt-8 text-center text-gray-400">
                    {isSignUp ? (
                        <span>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('signin')}
                                className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors"
                            >
                                Sign In
                            </button>
                        </span>
                    ) : (
                        <span>
                            Don&apos;t have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setMode('signup')}
                                className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors"
                            >
                                Sign Up
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};



// --- MAIN PAGE COMPONENT ---

export default function RoyalEscapeShop() {
    // --- AUTHENTICATION STATE & HANDLERS ---
    // Mock user state: null means logged out, object means logged in.
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin'); // 'signin' or 'signup'

    // Helper function to open Auth Modal
    const openAuthModal = useCallback((mode: 'signin' | 'signup') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
        // Always close the profile dropdown when opening the auth modal
        setIsProfileDropdownOpen(false);
    }, []);

    // Helper function to close Auth Modal
    const closeAuthModal = useCallback(() => {
        setIsAuthOpen(false);
    }, []);

    // Handler for successful authentication (called by AuthModal)
    const handleAuthSuccess = useCallback((authenticatedUser: { name: string; email: string }) => {
        setUser(authenticatedUser); // Set the logged-in user object
        closeAuthModal();
    }, [closeAuthModal]);

    // Handler for signing out
    const handleSignOut = useCallback(() => {
        setUser(null);
        setIsProfileDropdownOpen(false);
        // In a production app, this is where you'd call Firebase/Supabase/etc. signOut method
        console.log("User signed out.");
    }, []);
    // ----------------------------------------


    // --- APPLICATION STATE ---
    // The cart now tracks the selected POT (entry) and the selected MERCH (physical item).
    // Structure: [{ type: 'pot', id: 1, name: 'MacBook Air M3 Entry', price: 249 }, { type: 'merch', id: 1, name: 'Royal Tee', price: 0 }]
    const [cart, setCart] = useState<{ type: 'pot' | 'merch'; id: number; name: string; price: number; }[]>([]);
    const [wallet] = useState(0); // Keeping wallet state for potential future use
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // --- CONSTANTS FOR NEW FLOW ---
    const COUPON_PRICE = 249;


    // Logic for outside click of the dropdown - FIXED to target the entire container
    useEffect(() => {
        if (!isProfileDropdownOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const container = document.getElementById('profile-dropdown-container'); // Check the entire container
            const target = event.target as HTMLElement;

            // Close if the click is outside the entire profile container element
            if (container && !container.contains(target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    // Calculate total price in cart
    const cartTotalPrice = cart.reduce((sum, item) => sum + item.price, 0);


    // --- DATA STRUCTURES (UPDATED) ---

    // 1. Luxury Rewards (Pots) - These are now the main items a user 'buys' for the entry
    const luxuryRewards = [
        {
            id: 1,
            name: "MacBook Air M3",
            value: "₹1,20,000",
            icon: "💻",
            status: "live", // Changed status to live
            rewardValue: "₹1,20,000",
            description: "Your entry ticket to win this dream machine."
        },
        {
            id: 2,
            name: "Gold Coin",
            value: "₹30,000-₹40,000",
            icon: "🪙",
            status: "live",
            rewardValue: "₹30,000-₹40,000",
            description: "A chance to win a valuable investment asset."
        },
        {
            id: 3,
            name: "Luxury Hotel Staycation",
            value: "₹25,000",
            icon: "🏨",
            status: "live",
            rewardValue: "₹25,000",
            description: "Unlock an amazing weekend getaway."
        },
        {
            id: 4,
            name: "Apple Watch Ultra 2",
            value: "₹70,000",
            icon: "⌚",
            status: "live",
            rewardValue: "₹70,000",
            description: "Enter to win the ultimate smartwatch."
        },
        {
            id: 5,
            name: "Royal Escape Maldives Trip",
            value: "₹1.2L",
            icon: "🏝️",
            status: "live",
            rewardValue: "₹1.2L",
            description: "A free entry to win an all-inclusive trip."
        },
        {
            id: 6,
            name: "iPhone 15 Pro Max",
            value: "₹1,50,000",
            icon: "📱",
            status: "live",
            rewardValue: "₹1,50,000",
            description: "Get your chance to own the latest flagship phone."
        },
        {
            id: 7,
            name: "Dubai Luxury Package",
            value: "₹2,00,000",
            icon: "✈️",
            status: "live",
            rewardValue: "₹2,00,000",
            description: "Win a premium vacation package."
        },
        {
            id: 8,
            name: "PS5 Console Bundle",
            value: "₹60,000",
            icon: "🎮",
            status: "live",
            rewardValue: "₹60,000",
            description: "Your entry for a next-gen gaming console."
        },
        {
            id: 9,
            name: "Samsung Galaxy Z Fold",
            value: "₹1,80,000",
            icon: "📱",
            status: "live",
            rewardValue: "₹1,80,000",
            description: "Win a high-end foldable smartphone."
        },
        {
            id: 10,
            name: "Swiss Watch Collection",
            value: "₹3,00,000",
            icon: "⌚",
            status: "live",
            rewardValue: "₹3,00,000",
            description: "Enter for a chance to win a luxury timepiece set."
        }
    ];

    // 2. Merchandise - Now tied to the pot purchase
    const merchandise = [
        {
            id: 1,
            name: "Royal Tee (T-Shirt)",
            price: 799,
            // Custom image with better fit
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            tag: `Additional ₹${799 - COUPON_PRICE}`,
            costAfterCoupon: 799 - COUPON_PRICE // 550
        },
        {
            id: 2,
            name: "Royal Cap",
            price: 249, // This item is FREE with the coupon
            // DUMMY IMAGE for cap (Royal Escape Style)
            image: "/cap.png",
            tag: "FREE with Entry",
            costAfterCoupon: 0
        },
        {
            id: 3,
            name: "Royal Hoodie",
            price: 1499,
            // Custom image with better fit
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            tag: `Additional ₹${1499 - COUPON_PRICE}`,
            costAfterCoupon: 1499 - COUPON_PRICE // 1250
        },
        {
            id: 4,
            name: "Royal Tote Bag",
            price: 499,
            // Custom image with better fit
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            tag: `Additional ₹${499 - COUPON_PRICE}`,
            costAfterCoupon: 499 - COUPON_PRICE // 250
        },
        {
            id: 5,
            name: "Royal Key Chain",
            price: 249, // This item is FREE with the coupon
            // DUMMY IMAGE for key chain (Royal Escape Style)
            image: "/key_chain.png",
            tag: "FREE with Entry",
            costAfterCoupon: 0
        },
        {
            id: 6,
            name: "Mystery Merch Box",
            price: 999,
            // Custom image with better fit (using "hamper" as context for the box image)
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            tag: `Additional ₹${999 - COUPON_PRICE}`,
            costAfterCoupon: 999 - COUPON_PRICE // 750
        }
    ];

    // --- ACTION HANDLERS (UPDATED) ---

    const addPotToCart = (pot: typeof luxuryRewards[number]) => {
        // Clear existing pot entries to ensure only one entry/pot is selected at a time
        const newCart = cart.filter(item => item.type !== 'pot');

        newCart.push({
            type: 'pot',
            id: pot.id,
            name: `${pot.name} Entry Ticket`,
            price: COUPON_PRICE
        });

        setCart(newCart);
    };

    const addMerchToCart = (item: typeof merchandise[number]) => {
        // Clear existing merch items to ensure only one merch is selected at a time
        const newCart = cart.filter(cartItem => cartItem.type !== 'merch' && cartItem.type !== 'pot');

        // Ensure a pot (entry) is selected first
        const selectedPot = cart.find(cartItem => cartItem.type === 'pot');

        if (selectedPot) {
            newCart.push(selectedPot);
        } else {
            // Optional: Show error if no pot is selected, but for simplicity, we'll assume the user follows the flow
            alert("Please select a Luxury Reward Pot (Entry) first!");
            return;
        }

        newCart.push({
            type: 'merch',
            id: item.id,
            name: item.name,
            price: item.costAfterCoupon
        });

        setCart(newCart);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                Royal Escape
                            </span>
                        </div>



                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#pots" className="text-gray-300 hover:text-yellow-400 transition-colors">Live Pots</a>
                            <a href="#merch" className="text-gray-300 hover:text-yellow-400 transition-colors">Free Merch</a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-yellow-400 transition-colors">How It Works</a>
                        </nav>


                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {user && ( // Only show wallet if logged in
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
                                    <Wallet className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-semibold text-white">₹{wallet}</span>
                                </div>
                            )}
                            <button className="relative p-2 bg-gray-800 rounded-full border border-gray-700 hover:border-yellow-400 transition-colors">
                                <ShoppingCart className="w-5 h-5 text-gray-300" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                                        {cart.length}
                                    </span>
                                )}
                            </button>

                            {/* Profile Dropdown Container */}
                            <div className="hidden md:relative md:block" id="profile-dropdown-container">
                                <button
                                    id="profile-dropdown-button"
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    // Use a different color if user is logged in
                                    className={`p-2 bg-gray-800 rounded-full border ${user ? 'border-yellow-400/80 hover:border-yellow-400' : 'border-gray-700 hover:border-yellow-400'} transition-colors`}
                                >
                                    <User className={`w-5 h-5 ${user ? 'text-yellow-400' : 'text-gray-300'}`} />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-20">
                                        {user ? (
                                            // LOGGED IN VIEW
                                            <>
                                                <div className="px-4 py-3 text-sm text-yellow-400 font-semibold truncate border-b border-gray-700">
                                                    {user.name || 'Your Profile'}
                                                </div>
                                                <a
                                                    href="#profile" // Placeholder link
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                                                >
                                                    <UserIcon className="w-4 h-4" /> View Profile
                                                </a>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors border-t border-gray-700"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </>
                                        ) : (
                                            // LOGGED OUT VIEW - Combined button
                                            <button
                                                type="button"
                                                // Default to signin, user can switch to signup inside the modal
                                                onClick={() => openAuthModal('signin')}
                                                className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                                            >
                                                Sign In / Register
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                className="md:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (UPDATED AUTH LOGIC) */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-gray-800 border-t border-gray-700">
                        <nav className="px-4 py-4 space-y-3">
                            <a href="#pots" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-yellow-400 transition-colors">Live Pots</a>
                            <a href="#merch" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-yellow-400 transition-colors">Free Merch</a>
                            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-yellow-400 transition-colors">How It Works</a>

                            {user ? (
                                // Mobile Logged In Links
                                <>
                                    <a href="#profile" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-yellow-400 transition-colors py-1">
                                        View Profile
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                                        className="block w-full text-left text-red-400 hover:text-red-300 transition-colors py-1 border-t border-gray-700 pt-3 mt-3"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                // Mobile Logged Out Link (Combined)
                                <button
                                    type="button"
                                    onClick={() => { openAuthModal('signin'); setMobileMenuOpen(false); }}
                                    className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-colors py-1"
                                >
                                    Sign In / Register
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Banner (UPDATED MESSAGE) */}
            <section className="relative py-12 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-pink-500/10" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 rounded-full border border-yellow-400/30 mb-6">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">10 Live Luxury Pots Running Now!</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
                            Buy Your Entry{" "}
                        </span>
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Win Luxury & Get Free Merch
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Select any of the 10 Live Pots for just **₹{COUPON_PRICE}** to get a coupon, a free entry, and choose a free or discounted merch item!
                    </p>
                </div>
            </section>

            {/* 1. Live Royal Escape Pots Section (NEW PRIMARY SECTION) */}
            <section id="pots" className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
                                10 Live Royal Escape Pots{" "}
                            </span>
                            <span className="text-gray-400 text-2xl">(Entry: ₹{COUPON_PRICE})</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Each **₹{COUPON_PRICE}** entry ticket grants you a chance to win the corresponding luxury reward and a coupon for merch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {luxuryRewards.map((reward) => (
                            <div
                                key={reward.id}
                                className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border ${cart.some(item => item.type === 'pot' && item.id === reward.id) ? 'border-green-400 ring-4 ring-green-400/30' : 'border-gray-700/50 hover:border-yellow-400/50'} relative overflow-hidden group transition-all duration-300`}
                            >
                                <div className="relative z-10 text-center space-y-4">
                                    <div className="text-6xl mb-4">
                                        {reward.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-white min-h-[3rem] flex items-center justify-center">
                                        {reward.name}
                                    </h3>

                                    <div className="space-y-2">
                                        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                            <p className="text-xs text-gray-500 mb-1">Pot worth up to</p>
                                            <p className="text-xl font-bold text-yellow-400">{reward.value}</p>
                                        </div>

                                        <p className="text-sm text-gray-400">
                                            {reward.description}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => addPotToCart(reward)}
                                        className="w-full py-2 mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all disabled:opacity-50"
                                        disabled={cart.some(item => item.type === 'pot' && item.id === reward.id)} // Disable if already selected
                                    >
                                        {cart.some(item => item.type === 'pot' && item.id === reward.id) ? 'Selected' : `Buy Entry for ₹${COUPON_PRICE}`}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Merchandise Section (UPDATED MESSAGE & LOGIC) */}
            <section id="merch" className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
                                Select Your Merch Gift{" "}
                            </span>
                            <span className="text-gray-400 text-2xl">(Coupon Applied)</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Your **₹{COUPON_PRICE}** entry includes a coupon. Choose a merch item: pay only the difference for premium items, or get a base item free!
                        </p>
                        {/* Cart Summary Card */}
                        <div className="max-w-lg mx-auto mt-6 p-4 bg-gray-800/70 border border-yellow-500/50 rounded-xl shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-2">Current Cart</h3>
                            <div className="text-left text-sm text-gray-300 space-y-1">
                                {cart.length === 0 ? (
                                    <p className="text-red-400">Cart is empty. Select a Pot first!</p>
                                ) : (
                                    cart.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span>{item.name} {item.type === 'pot' && '(Entry)'}</span>
                                            <span className={item.price > 0 ? 'text-yellow-400' : 'text-green-400'}>
                                                + ₹{item.price}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="border-t border-gray-700 my-3 pt-3 flex justify-between items-center">
                                <span className="text-lg font-bold text-white">Total:</span>
                                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    ₹{cartTotalPrice}
                                </span>
                            </div>
                            {cart.length > 0 && (
                                <button
                                    type="button"
                                    className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-green-400/50 transition-all"
                                >
                                    Proceed to Checkout
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {merchandise.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl overflow-hidden border ${cart.some(cartItem => cartItem.type === 'merch' && cartItem.id === item.id) ? 'border-yellow-400 ring-4 ring-yellow-400/30' : 'border-gray-700 hover:border-yellow-400/50'} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20`}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        // THIS IS THE CRITICAL CHANGE: ensuring the image covers the entire box area
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null;
                                            (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1f2937/d1d5db?text=Merch+Item`;
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
                                        <span className="text-xs font-bold text-black">{item.tag}</span>
                                    </div>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                    <div className="bg-gray-700/50 rounded-lg p-3">
                                        <p className="text-sm text-gray-400">
                                            Coupon Value: **₹{COUPON_PRICE}**
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                                        <div className="text-left">
                                            <span className="block text-sm text-gray-400 line-through">Retail: ₹{item.price}</span>
                                            <span className="text-2xl font-bold text-green-400">
                                                {item.costAfterCoupon === 0 ? 'FREE' : `+₹${item.costAfterCoupon}`}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addMerchToCart(item)}
                                            disabled={cart.some(cartItem => cartItem.type === 'merch' && cartItem.id === item.id) || cart.filter(item => item.type === 'pot').length === 0}
                                            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all disabled:opacity-50 disabled:bg-gray-600 disabled:text-gray-300"
                                        >
                                            {cart.filter(item => item.type === 'pot').length === 0 ? 'Select Pot First' : (cart.some(cartItem => cartItem.type === 'merch' && cartItem.id === item.id) ? 'Selected' : 'Select Item')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button type="button" className="px-8 py-3 bg-gray-800 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
                            View All Merchandise
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section (UPDATED STEPS) */}
            <section id="how-it-works" className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
                        How It{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "1",
                                title: "Choose Your Pot",
                                description: `Select any of the 10 Live Luxury Pots and pay the ₹${COUPON_PRICE} entry fee.`,
                                icon: Trophy
                            },
                            {
                                step: "2",
                                title: "Select Your Merch",
                                description: `Your entry fee includes a coupon. Choose a merch item: get a base item FREE or pay the difference for premium.`,
                                icon: Gift
                            },
                            {
                                step: "3",
                                title: "Win Amazing Prizes",
                                description: "You are now officially entered for a chance to win MacBooks, trips, gold coins, and more!",
                                icon: Sparkles
                            }
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700 text-center hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-black" />
                                </div>
                                <div className="text-yellow-400 text-4xl font-bold mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section (Now MOCK) */}
            <FAQSection />

            {/* Footer */}
            <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center space-x-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <span className="font-bold text-xl text-white">Royal Escape</span>
                        </div>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The ultimate gaming experience where every purchase could win you amazing trips to incredible destinations
                        </p>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://www.instagram.com/royale_escape/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 rounded-full border border-pink-500/30 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/20"
                            >
                                <Instagram className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                className="group bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-full border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
                            >
                                <Facebook className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a
                                href="#"
                                className="group bg-gradient-to-r from-sky-500/20 to-cyan-500/20 p-4 rounded-full border border-sky-500/30 hover:border-sky-400 transition-all duration-300 hover:shadow-lg hover:shadow-sky-400/20"
                            >
                                <MessageCircle className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                        <div className="border-t border-gray-800 pt-8">
                            <p className="text-gray-500 text-sm">
                                © 2024 Royal Escape. All rights reserved. |
                                <a href="mailto:support@royalescape.club" className="hover:text-yellow-400 transition-colors duration-300 ml-2">
                                    support@royalescape.club
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Auth Modal Component Rendered Here */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={closeAuthModal}
                initialMode={authMode}
                // Pass the success handler here
                onAuthSuccess={handleAuthSuccess}
            />
        </div>
    );
}