"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    Crown, Sparkles, Trophy, Instagram, Facebook, MessageCircle, Menu, X, Wallet,
    User as UserIcon, ListOrdered, Link, Lock, Gift
} from 'lucide-react';

import FAQSection from "@/components/FAQSection";
import AuthModal from "@/components/AuthModal";
import MyReferrals from "@/components/MyReferrals";
import MyPersonalInfo from "@/components/MyPersonalInfo";
import MyDashboard from "@/components/MyDashboard";
import UserDashboardSummary from "@/components/UserDashboardSummary";
import { User, View, PotItem } from '@/types';
import { api } from '@/services/api';
import { COUPON_PRICE } from '@/lib/potData';

// --- Main Application Component ---
export default function RoyalEscapeHome() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // NEW STATE: For internal routing
    const [currentView, setCurrentView] = useState<View>('home');
    
    // NEW STATE: For data fetching
    const [livePots, setLivePots] = useState<PotItem[]>([]);
    const [comingSoonPots, setComingSoonPots] = useState<PotItem[]>([]);
    const [isLoadingPots, setIsLoadingPots] = useState(true);

    // 🚩 EFFECT: Load user state from local storage on mount (Persistence Fix)
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('royalEscapeUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser) as User);
            }
        } catch (error) {
            console.error("Failed to load user from localStorage:", error);
            localStorage.removeItem('royalEscapeUser');
            setUser(null);
        }
    }, []);

    // 🚩 EFFECT: Fetch Pots Data
    useEffect(() => {
        const fetchPots = async () => {
            setIsLoadingPots(true);
            try {
                // Fetch data in parallel
                const [active, upcoming] = await Promise.all([
                    api.pots.getActive(),
                    api.pots.getUpcoming()
                ]);
                setLivePots(active);
                setComingSoonPots(upcoming);
            } catch (error) {
                console.error("Failed to fetch pots:", error);
                // In a real app, set an error state here to show a retry button or message
            } finally {
                setIsLoadingPots(false);
            }
        };

        fetchPots();
    }, []);


    const openAuthModal = useCallback((mode: 'signin' | 'signup') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    }, []);

    const closeAuthModal = useCallback(() => {
        setIsAuthOpen(false);
        setRedirectAfterAuth(null);
    }, []);

    // 🚩 UPDATED: Handle view change and close dropdown
    const handleViewChange = useCallback((view: View) => {
        setCurrentView(view);
        setIsProfileDropdownOpen(false);
        if (view === 'home') {
            // Usually we stay on the same route for SPA feel, or push '/'
            // router.push('/'); // Optional: Update URL if you want deep linking support for views later
        } else {
            console.log(`Navigating to ${view} view...`);
        }
    }, []);

    // UPDATED: Save user to localStorage on success
    const handleAuthSuccess = useCallback((authenticatedUser: User) => {
        setUser(authenticatedUser);
        localStorage.setItem('royalEscapeUser', JSON.stringify(authenticatedUser));
        closeAuthModal();

        if (redirectAfterAuth) {
            router.push(redirectAfterAuth);
        }
    }, [closeAuthModal, redirectAfterAuth, router]);

    // UPDATED: Clear persistence on sign out
    const handleSignOut = useCallback(() => {
        setUser(null);
        localStorage.removeItem('royalEscapeUser');
        console.log("User signed out.");
        setIsProfileDropdownOpen(false);
        setCurrentView('home'); // Go back to home view
    }, []);


    // FUNCTION: Handles click on a Pot, checks authentication, and redirects
    const handlePotClick = (potId: number) => {
        const potUrl = `/pot/${potId}`;

        if (user) {
            router.push(potUrl);
        } else {
            setRedirectAfterAuth(potUrl);
            openAuthModal('signin');
        }
    };

    // --- Conditional Rendering based on View State ---

    const renderContent = () => {
        if (!user) return <HomeViewContent user={null} handleViewChange={handleViewChange} livePots={livePots} comingSoonPots={comingSoonPots} handlePotClick={handlePotClick} />;

        switch (currentView) {
            case 'personalInfo':
                return <MyPersonalInfo user={user} />;
            case 'myReferrals':
                return <MyReferrals user={user} />;
            case 'myOrders':
                return <MyDashboard user={user} />;
            case 'myWallet':
                return <section className="max-w-4xl mx-auto py-12 px-4 text-center text-white"><h2 className="text-4xl font-bold mb-4 text-yellow-400">My Wallet</h2><p className="text-lg text-gray-400">Manage your Royal Escape funds here. Current Balance: **₹0**</p><p className="mt-8 text-sm text-gray-500">Feature implementation pending. Click &apos;Add Money&apos; in the header to navigate here when developed.</p></section>;
            case 'home':
            default:
                // Home view content, which handles the Hero/Summary swap internally
                return <HomeViewContent user={user} handleViewChange={handleViewChange} livePots={livePots} comingSoonPots={comingSoonPots} handlePotClick={handlePotClick} />;
        }
    };

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const HomeViewContent: React.FC<{ user: User | null, handleViewChange: (view: View) => void, livePots: any[], comingSoonPots: any[], handlePotClick: (id: number) => void }> = ({ user, handleViewChange, livePots, comingSoonPots, handlePotClick }) => (
        <>
            {/* Hero Banner / Dashboard Summary (CONDITIONALLY RENDERED) */}
            {user ? (
                // LOGGED IN: User Dashboard Summary
                <UserDashboardSummary user={user} handleViewChange={handleViewChange} />
            ) : (
                // LOGGED OUT: Promotional Hero Banner
                <section className="relative py-12 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-pink-500/10" />
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 rounded-full border border-yellow-400/30 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-400">10 Live Luxury Pots Running Now!</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
                                The Ultimate Escape:{" "}
                            </span>
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                Win Luxury & Get Free Merch
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-extrabold">
                                Secure your **Entry Ticket** and gain immediate access to exclusive benefits: A{' '}
                                high value coupon
                            </span>
                            , a{' '}
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                                FREE TICKET to win high end prizes
                            </span>
                            , and an{' '}
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
                                exclusive merchandise
                            </span>
                            .
                        </p>

                        {/* NEW: Company Boast Stats */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
                            {/* Stat 1: Lucky Winners */}
                            <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-xl">
                                <Sparkles className="w-8 h-8 text-yellow-400 mb-2 mx-auto" />
                                <p className="text-3xl font-extrabold text-white">500+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Lucky Winners</p>
                            </div>
                            {/* Stat 2: Prize Money Won */}
                            <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-xl">
                                <Trophy className="w-8 h-8 text-green-400 mb-2 mx-auto" />
                                <p className="text-3xl font-extrabold text-white">₹5 Cr+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Prize Money Won</p>
                            </div>
                            {/* Stat 3: Active Users */}
                            <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-xl">
                                <UserIcon className="w-8 h-8 text-blue-400 mb-2 mx-auto" />
                                <p className="text-3xl font-extrabold text-white">50K+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Active Users</p>
                            </div>
                            {/* Stat 4: Pots Ran */}
                            <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 shadow-xl">
                                <Crown className="w-8 h-8 text-red-400 mb-2 mx-auto" />
                                <p className="text-3xl font-extrabold text-white">120+</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Luxury Pots Ran</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* Live Pots */}
            <section id="live-pots" className="py-16 px-4 bg-gray-900/40">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
                        Live <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Pots</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {livePots.map(pot => (
                            <div key={pot.id} className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300 flex flex-col h-full">
                                <div className="text-6xl mb-4">{pot.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{pot.name}</h3>
                                <p className="text-gray-400 mb-3 flex-grow">{pot.description}</p>
                                <p className="text-yellow-400 font-semibold">{pot.prizeValue}</p>
                                <button
                                    onClick={() => handlePotClick(pot.id)}
                                    className="mt-4 w-full py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40 transition-all"
                                >
                                    Know More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Coming Soon Pots */}
            <section id="coming-soon" className="py-16 px-4 bg-gray-800/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
                        Coming <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Soon</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {comingSoonPots.map(pot => (
                            <div key={pot.id} className="bg-gray-800/70 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                                <div className="text-6xl mb-4">{pot.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{pot.name}</h3>
                                <p className="text-gray-400 mb-3">{pot.description}</p>
                                <p className="text-yellow-400 font-semibold">{pot.prizeValue}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );

    // CORRECTED CONDITION: Only show promotional sections if the user is LOGGED OUT AND on the home view.
    const showPromotionalSections = currentView === 'home' && !user;


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleViewChange('home')}>
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-6 h-6 text-black" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                Royal Escape
                            </span>
                        </div>

                        {/* Right Side Buttons */}
                        <div className="flex items-center gap-3">
                            {user ? (
                                <>
                                    {/* Wallet Button (Navigates to myWallet view) */}
                                    <button
                                        onClick={() => handleViewChange('myWallet')}
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
                                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700 z-50">
                                                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                                                    Hi, **{user.name.split(' ')[0]}**
                                                </div>
                                                <button
                                                    onClick={() => handleViewChange('myOrders')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <ListOrdered className="w-4 h-4 mr-2" /> My Dashboard
                                                </button>
                                                <button
                                                    onClick={() => handleViewChange('myWallet')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <Wallet className="w-4 h-4 mr-2" /> My Wallet
                                                </button>
                                                <button
                                                    onClick={() => handleViewChange('personalInfo')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <UserIcon className="w-4 h-4 mr-2" /> My Personal Info
                                                </button>
                                                <button
                                                    onClick={() => handleViewChange('myReferrals')}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 pb-2 mb-2"
                                                >
                                                    <Link className="w-4 h-4 mr-2" /> My Referrals
                                                </button>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center"
                                                >
                                                    <Lock className="w-4 h-4 mr-2" /> Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                // Login/Register Buttons (for logged out users)
                                <>
                                    <button
                                        onClick={() => openAuthModal('signin')}
                                        className="px-5 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => openAuthModal('signup')}
                                        className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg shadow-md hover:shadow-yellow-400/40 transition-all"
                                    >
                                        REGISTER
                                    </button>
                                </>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Render */}
            <main className="min-h-[calc(100vh-64px-100px)]">
                {renderContent()}
            </main>

            {/* How It Works Section (CONDITIONALLY RENDERED) */}
            {/* FINAL FIX: Only render if `showPromotionalSections` is true (i.e., NOT logged in AND on home) */}
            {showPromotionalSections && (
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
            )}

            {/* FAQ Section (Always shown in original, but wrapped in component) */}
            {showPromotionalSections && <FAQSection />}

            {/* Footer (Always Visible) */}
            <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur py-10 text-center">
                <div className="flex justify-center gap-6 mb-6">
                    <a href="https://www.instagram.com/royale_escape/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-6 h-6 text-pink-400 hover:scale-110 transition-transform" />
                    </a>
                    <a href="#"><Facebook className="w-6 h-6 text-blue-400 hover:scale-110 transition-transform" /></a>
                    <a href="#"><MessageCircle className="w-6 h-6 text-sky-400 hover:scale-110 transition-transform" /></a>
                </div>
                <p className="text-gray-500 text-sm">
                    © 2025 Royal Escape. All rights reserved. |
                    <a href="mailto:support@royalescape.club" className="hover:text-yellow-400 ml-1">support@royalescape.club</a>
                </p>
            </footer>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={closeAuthModal}
                initialMode={authMode}
                onAuthSuccess={handleAuthSuccess}
            />
        </div>
    );
}
