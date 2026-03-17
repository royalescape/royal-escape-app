"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    User as UserIcon, Lock, Mail, LayoutDashboard
} from 'lucide-react';
import { User } from '@/types';

interface HeaderProps {
    user: User | null;
    onAuthClick: (mode: 'signin' | 'signup') => void;
    onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({
    user,
    onAuthClick,
    onSignOut
}) => {
    const router = useRouter();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleHomeClick = () => {
        router.push('/');
    };

    const navigateToDashboard = () => {
        setIsProfileDropdownOpen(false);
        router.push('/dashboard');
    };

    const navigateToPersonalInfo = () => {
        setIsProfileDropdownOpen(false);
        router.push('/personal-info');
    };

    const handleSignOut = () => {
        setIsProfileDropdownOpen(false);
        onSignOut();
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div 
                        className="flex items-center gap-2 cursor-pointer flex-shrink-0 mr-4" 
                        onClick={handleHomeClick}
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
                    </div>

                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Support Email Icon */}
                        <a 
                            href="mailto:support@royalescape.club" 
                            className="flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-colors mr-1 sm:mr-2"
                            aria-label="Contact Support"
                        >
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                        </a>

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
                                        <>
                                            {/* Backdrop to close dropdown */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            />

                                            {/* Dropdown Menu */}
                                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700 z-50">
                                                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700 truncate">
                                                    Hi, <strong>{user.name?.split(' ')[0] || 'User'}</strong>
                                                </div>
                                                <button
                                                    onClick={navigateToDashboard}
                                                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors flex items-center border-b border-gray-700 pb-2 mb-2"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 mr-2" /> My Dashboard
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
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Login/Register Buttons (for logged out users)
                            <>
                                <button
                                    onClick={() => onAuthClick('signin')}
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
    );
};

export default Header;
