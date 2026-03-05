"use client";

import React, { useState, useEffect } from 'react';
import { Crown, Trophy, Sparkles } from 'lucide-react';
import { User, DashboardData } from '@/types';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

interface UserDashboardSummaryProps {
    user: User;
}

const UserDashboardSummary: React.FC<UserDashboardSummaryProps> = ({ user }) => {
    const router = useRouter();

    // New State for stats
    const [stats, setStats] = useState<{
        confirmed_entries: number;
        total_entries: number;
        pending_entries: number;
        total_winnings: number;
        walletBalance: number;
    }>({
        confirmed_entries: 0,
        total_entries: 0,
        pending_entries: 0,
        total_winnings: 0,
        walletBalance: 0,
    });
    
    // Fetch stats on mount
    useEffect(() => {
        const fetchStats = async () => {
             if (user._id) {
                 try {
                     const data: DashboardData = await api.user.getDashboardOverview();
                     setStats({
                         confirmed_entries: data.confirmed_entries,
                         total_entries: data.total_entries,
                         pending_entries: data.pending_entries,
                         total_winnings: data.total_winnings,
                         walletBalance: 0, // Wallet balance is not available from this API, keeping it as 0
                     });
                 } catch (error) {
                     console.error("Failed to fetch dashboard stats", error);
                 }
             }
        };
        fetchStats();
    }, [user._id]);

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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    <div
                        onClick={() => router.push('/dashboard')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-blue-400">{stats.confirmed_entries}</p>
                        <p className="text-xs text-gray-400">Confirmed Entries</p>
                    </div>
                    <div
                        onClick={() => router.push('/dashboard')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-orange-400">{stats.pending_entries}</p>
                        <p className="text-xs text-gray-400">Pending Entries</p>
                    </div>
                    <div
                        onClick={() => router.push('/dashboard')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Trophy className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-green-400">{stats.total_entries}</p>
                        <p className="text-xs text-gray-400">Total Entries</p>
                    </div>
                    <div
                        onClick={() => router.push('/dashboard')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-yellow-400">₹{stats.total_winnings}</p>
                        <p className="text-xs text-gray-400">Total Winnings</p>
                    </div>
                </div>

                <div className="mt-6 text-center">

                </div>
            </div>
        </section>
    );
};

export default UserDashboardSummary;
