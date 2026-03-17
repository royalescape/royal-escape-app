"use client";

import React, { useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Instagram } from 'lucide-react';

import AuthModal from "@/components/AuthModal";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
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
        router.push('/personal-info');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {isNavigating && <Loader />}
            
            <Header 
                user={user} 
                onAuthClick={openAuthModal} 
                onSignOut={handleSignOut} 
            />

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
};

export default BaseLayout;
