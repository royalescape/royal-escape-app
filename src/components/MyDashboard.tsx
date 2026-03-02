"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import Loader from './Loader';
import { User, Transaction, DashboardData } from '@/types';
import { api } from '@/services/api';

interface MyDashboardProps {
    user: User;
}

const MyDashboard: React.FC<MyDashboardProps> = ({ user }) => {
    const [dashboardOverview, setDashboardOverview] = useState<DashboardData>({
        total_entries: 0,
        confirmed_entries: 0,
        pending_entries: 0,
        total_winnings: 0,
    });
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
             if (user._id) {
                 setIsLoading(true);
                 try {
                     const [overviewData, txnData] = await Promise.all([
                         api.user.getDashboardOverview(),
                         api.user.getTransactions(user._id)
                     ]);
                     setDashboardOverview(overviewData);
                     setRecentTransactions(txnData);
                 } catch (error) {
                     console.error("Failed to fetch dashboard data", error);
                 } finally {
                     setIsLoading(false);
                 }
             }
        };

        fetchDashboardData();
    }, [user._id]);

    // Mock Data for entries/draws (can be moved to API later)
    const recentEntries = [
        { id: 'RE-1001', date: '2024-10-25', pot: 'MacBook Air M3', status: 'Active', drawDate: '2024-11-15', tickets: 1 },
        { id: 'RE-1002', date: '2024-10-20', pot: 'Gold Coin', status: 'Active', drawDate: '2024-11-10', tickets: 1 },
        { id: 'RE-1003', date: '2024-09-01', pot: 'Luxury Staycation', status: 'Active', drawDate: '2024-11-20', tickets: 2 },
    ];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className="max-w-7xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                    <Trophy className="inline w-8 h-8 mr-3 text-yellow-400" />
                    My Dashboard
                </h2>
                <p className="text-gray-400">Welcome back, {user.name?.split(' ')[0] || 'User'}! Here&apos;s your Royal Escape overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Trophy className="w-8 h-8 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400">{dashboardOverview.confirmed_entries}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Confirmed Entries</p>
                    <p className="text-xs text-gray-500 mt-1">Currently in the draw</p>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Sparkles className="w-8 h-8 text-orange-400" />
                        <span className="text-2xl font-bold text-orange-400">{dashboardOverview.total_entries}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Total Entries</p>
                    <p className="text-xs text-gray-500 mt-1">All-time entries</p>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                {/* Pending Entries Card */}
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <span className="text-2xl font-bold text-purple-400">{dashboardOverview.pending_entries}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Pending Entries</p>
                    <p className="text-xs text-gray-500 mt-1">Entries awaiting confirmation</p>
                </div>

                {/* Total Winnings Card */}
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Trophy className="w-8 h-8 text-green-400" />
                        <span className="text-2xl font-bold text-green-400">₹{dashboardOverview.total_winnings}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Total Winnings</p>
                    <p className="text-xs text-gray-500 mt-1">All-time prize money won</p>
                </div>
            </div>

            {/* Two Column Layout for Recent Entries and Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Entries */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                        <span>Recent Entries</span>
                        <Trophy className="w-5 h-5 text-yellow-400" />
                    </h3>
                    <div className="space-y-3">
                        {recentEntries.map((entry) => (
                            <div key={entry.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-white">{entry.pot}</p>
                                        <p className="text-xs text-gray-500 font-mono">{entry.id}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-600/30 text-green-300 text-xs font-bold rounded-full border border-green-500">
                                        {entry.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Draw: {entry.drawDate}</span>
                                    <span className="text-yellow-400 font-semibold">{entry.tickets} ticket{entry.tickets > 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                        <span>Recent Transactions</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-2 px-3">Pass ID</th>
                                    <th className="py-2 px-3">Description</th>
                                    <th className="py-2 px-3">Date</th>
                                    <th className="py-2 px-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {recentTransactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-gray-700/30 transition-colors">
                                        <td className="py-3 px-3 text-xs font-mono text-gray-400">{txn.id}</td>
                                        <td className="py-3 px-3 text-sm text-gray-300">{txn.description}</td>
                                        <td className="py-3 px-3 text-xs text-gray-400">{txn.date}</td>
                                        <td className={`py-3 px-3 text-sm font-bold text-right ${txn.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount)}
                                        </td>
                                    </tr>
                                ))}
                                {recentTransactions.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-gray-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyDashboard;
