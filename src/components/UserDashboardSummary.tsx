"use client";

import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Gift, Sparkles } from 'lucide-react';
import { User, View } from '@/types';
import { api } from '@/services/api';

interface UserDashboardSummaryProps {
    user: User;
    handleViewChange: (view: View) => void;
}

const UserDashboardSummary: React.FC<UserDashboardSummaryProps> = ({ user, handleViewChange }) => {
    // New State for stats
    const [stats, setStats] = useState({
        activeEntries: 0,
        walletBalance: 0,
        totalTickets: 0
    });
    
    // Fetch stats on mount
    useEffect(() => {
        const fetchStats = async () => {
             if (user.id) {
                 try {
                     const data = await api.user.getDashboardStats(user.id);
                     setStats(data);
                 } catch (error) {
                     console.error("Failed to fetch dashboard stats", error);
                 }
             }
        };
        fetchStats();
    }, [user.id]);

    return (
        <section className="relative py-12 px-4 overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-b border-gray-700">
            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <Crown className="inline w-10 h-10 mr-3 text-yellow-400" />
                    Welcome back, <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{user.name?.split(' ')[0] || 'User'}!</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-4xl mb-8">
                    Your Royal Escape overview at a glance. Get ready for the next draw.
                </p>

                {/* Summary Stats Grid - Added onClick and styling to each stat block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div
                        onClick={() => handleViewChange('myOrders')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-blue-400">{stats.activeEntries}</p>
                        <p className="text-xs text-gray-400">Active Entries</p>
                    </div>
                    <div
                        onClick={() => handleViewChange('myOrders')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-orange-400">{stats.totalTickets}</p>
                        <p className="text-xs text-gray-400">Total Tickets</p>
                    </div>
                </div>

                <div className="mt-6 text-center">

                </div>
            </div>
        </section>
    );
};

export default UserDashboardSummary;
