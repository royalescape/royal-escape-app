"use client";

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    User as UserIcon, Lock
} from 'lucide-react';
import { Instagram } from 'lucide-react';

import AuthModal from "@/components/AuthModal";
import Loader from "@/components/Loader";
import { User } from '@/types';
import { api } from '@/services/api';

interface BaseLayoutProps {
    children: ReactNode;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isNavigating: boolean;
    setIsNavigating: React.Dispatch<React.SetStateAction<boolean>>;
    // Optional props for controlled state (from parent)
    isAuthOpen?: boolean;
    authMode?: 'signin' | 'signup';
    openAuthModal?: (mode: 'signin' | 'signup') => void;
    closeAuthModal?: () => void;
    onAuthSuccess?: (user: User) => void;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ 
    children, 
    user, 
    setUser, 
    isNavigating, 
    setIsNavigating,
    // Destructure optional props
    isAuthOpen: propsIsAuthOpen,
    authMode: propsAuthMode,
    openAuthModal: propsOpenAuthModal,
    closeAuthModal: propsCloseAuthModal,
    onAuthSuccess: propsOnAuthSuccess
}) => {
    const router = useRouter();

    // Internal state for when not controlled by parent
    const [internalIsAuthOpen, setInternalIsAuthOpen] = useState(false);
    const [internalAuthMode, setInternalAuthMode] = useState<'signin' | 'signup'>('signin');
    const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Determine if state is controlled
    const isControlled = propsIsAuthOpen !== undefined;

    // Use props if controlled, otherwise internal state
    const isAuthOpen = isControlled ? propsIsAuthOpen : internalIsAuthOpen;
    const authMode = (isControlled && propsAuthMode) ? propsAuthMode : internalAuthMode;

    const openAuthModal = useCallback((mode: 'signin' | 'signup') => {
        if (isControlled && propsOpenAuthModal) {
            propsOpenAuthModal(mode);
        } else {
            setInternalAuthMode(mode);
            setInternalIsAuthOpen(true);
        }
    }, [isControlled, propsOpenAuthModal]);

    const closeAuthModal = useCallback(() => {
        if (isControlled && propsCloseAuthModal) {
            propsCloseAuthModal();
        } else {
            setInternalIsAuthOpen(false);
            setRedirectAfterAuth(null);
        }
    }, [isControlled, propsCloseAuthModal]);

    const internalHandleAuthSuccess = useCallback((authenticatedUser: User) => {
        setUser(authenticatedUser);
        localStorage.setItem('royalEscapeUser', JSON.stringify(authenticatedUser));
        closeAuthModal();

        if (redirectAfterAuth) {
            router.push(redirectAfterAuth);
        }
    }, [closeAuthModal, redirectAfterAuth, router, setUser]);

    const handleAuthSuccess = (isControlled && propsOnAuthSuccess) ? propsOnAuthSuccess : internalHandleAuthSuccess;

    const handleSignOut = useCallback(async () => {
        try {
            await api.auth.logout();
            setUser(null);
            console.log("User signed out.");
            setIsProfileDropdownOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [setUser]);

    const navigateToDashboard = () => {
        setIsNavigating(true);
        router.push('/dashboard');
    };

    const navigateToPersonalInfo = () => {
        setIsNavigating(true);
        // Assuming MyPersonalInfo is meant to be a component on the home page or a modal,
        // if it were a route, we would do router.push('/personal-info')
        // For now, it stays as a component on home if it's not a separate route.
        // If it's a modal, it would be handled differently.
        // For this task, we assume it's part of the home page as a component.
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {isNavigating && <Loader />}
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo - Flex grow allows it to take available space, shrinking buttons on mobile if needed */}
                        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0 mr-4" onClick={() => router.push('/')}>
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
                        </div>

                        {/* Right Side Buttons */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            {user ? (
                                <>
                                    {/* Profile Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                                            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 text-black font-bold rounded-full transition-all hover:ring-2 hover:ring-yellow-400 text-sm sm:text-base"
                                        >
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </button>

                                        {isProfileDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700 z-50">
                                                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                                                    Hi, {user.name?.split(' ')[0] || 'User'}
                                                </div>
                                                <button
                                                    onClick={navigateToDashboard}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 pb-2 mb-2"
                                                >
                                                    <UserIcon className="w-4 h-4 mr-2" /> My Dashboard
                                                </button>
                                                <button
                                                    onClick={navigateToPersonalInfo}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 pb-2 mb-2"
                                                >
                                                    <UserIcon className="w-4 h-4 mr-2" /> My Personal Info
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
                                        className="px-3 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg shadow-md hover:shadow-yellow-400/40 transition-all text-sm sm:text-base whitespace-nowrap"
                                    >
                                        LOGIN
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </header>

            <main className="min-h-[calc(100vh-64px-100px)]">
                {children}
            </main>

            {/* Footer (Always Visible) */}
            <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur py-10 text-center">
                <div className="flex justify-center gap-6 mb-6">
                    <a href="https://www.instagram.com/royale_escape/" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-8 h-8 text-pink-400 hover:scale-110 transition-transform" />
                    </a>
                </div>
                <p className="text-gray-500 text-sm">
                    © 2025 Royal Escape. All rights reserved. |
                    <a href="mailto:supportgroup@royalescape.club" className="hover:text-yellow-400 ml-1">supportgroup@royalescape.club</a>
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
};

export default BaseLayout;
