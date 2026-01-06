"use client";

import React from 'react';
import { Trophy, Wallet, Sparkles, Gift } from 'lucide-react';
import { User } from '@/types';

interface MyDashboardProps {
    user: User;
}

const MyDashboard: React.FC<MyDashboardProps> = ({ user }) => {
    // Mock Data
    const stats = {
        activeEntries: 5,
        totalSpent: 1245,
        totalWinnings: 0,
        walletBalance: 156,
        referralEarnings: 75,
        totalTickets: 8
    };

    const recentEntries = [
        { id: 'RE-1001', date: '2024-10-25', pot: 'MacBook Air M3', status: 'Active', drawDate: '2024-11-15', tickets: 1 },
        { id: 'RE-1002', date: '2024-10-20', pot: 'Gold Coin', status: 'Active', drawDate: '2024-11-10', tickets: 1 },
        { id: 'RE-1003', date: '2024-09-01', pot: 'Luxury Staycation', status: 'Active', drawDate: '2024-11-20', tickets: 2 },
    ];

    const upcomingDraws = [
        { pot: 'Gold Coin', drawDate: '2024-11-10', daysLeft: 8, yourTickets: 1 },
        { pot: 'MacBook Air M3', drawDate: '2024-11-15', daysLeft: 13, yourTickets: 1 },
        { pot: 'Luxury Staycation', drawDate: '2024-11-20', daysLeft: 18, yourTickets: 2 },
    ];

    const recentTransactions = [
        { id: 'TXN-5001', type: 'Entry Purchase', amount: -249, date: '2024-10-25', description: 'MacBook Air M3 Entry' },
        { id: 'TXN-5002', type: 'Referral Bonus', amount: 50, date: '2024-10-22', description: 'Friend signup bonus' },
        { id: 'TXN-5003', type: 'Wallet Top-up', amount: 500, date: '2024-10-20', description: 'Added funds' },
        { id: 'TXN-5004', type: 'Entry Purchase', amount: -249, date: '2024-10-20', description: 'Gold Coin Entry' },
    ];

    return (
        <section className="max-w-7xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">
                    <Trophy className="inline w-8 h-8 mr-3 text-yellow-400" />
                    My Dashboard
                </h2>
                <p className="text-gray-400">Welcome back, {user.name.split(' ')[0]}! Here&apos;s your Royal Escape overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Trophy className="w-8 h-8 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400">{stats.activeEntries}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Active Entries</p>
                    <p className="text-xs text-gray-500 mt-1">Currently in the draw</p>
                </div>

                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Wallet className="w-8 h-8 text-green-400" />
                        <span className="text-2xl font-bold text-green-400">₹{stats.walletBalance}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Wallet Balance</p>
                    <p className="text-xs text-gray-500 mt-1">Available funds</p>
                </div>

                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Gift className="w-8 h-8 text-purple-400" />
                        <span className="text-2xl font-bold text-purple-400">₹{stats.referralEarnings}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Referral Earnings</p>
                    <p className="text-xs text-gray-500 mt-1">From friend signups</p>
                </div>

                <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <Sparkles className="w-8 h-8 text-orange-400" />
                        <span className="text-2xl font-bold text-orange-400">{stats.totalTickets}</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Total Tickets</p>
                    <p className="text-xs text-gray-500 mt-1">All-time entries</p>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-red-400 text-lg">↓</span>
                        </div>
                        Total Expenditure
                    </h3>
                    <p className="text-4xl font-bold text-red-400 mb-2">₹{stats.totalSpent}</p>
                    <p className="text-sm text-gray-400">Spent on entries & merchandise</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Entry Fees</span>
                            <span className="text-white font-semibold">₹{stats.totalSpent * 0.8}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Merchandise</span>
                            <span className="text-white font-semibold">₹{stats.totalSpent * 0.2}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-green-400 text-lg">↑</span>
                        </div>
                        Total Earnings
                    </h3>
                    <p className="text-4xl font-bold text-green-400 mb-2">₹{stats.totalWinnings + stats.referralEarnings}</p>
                    <p className="text-sm text-gray-400">Winnings & referral bonuses</p>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Prize Winnings</span>
                            <span className="text-white font-semibold">₹{stats.totalWinnings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Referral Bonuses</span>
                            <span className="text-white font-semibold">₹{stats.referralEarnings}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
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

                {/* Upcoming Draws */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                        <span>Upcoming Draws</span>
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                    </h3>
                    <div className="space-y-3">
                        {upcomingDraws.map((draw, idx) => (
                            <div key={idx} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-semibold text-white">{draw.pot}</p>
                                    <span className="px-2 py-1 bg-yellow-400/20 text-yellow-300 text-xs font-bold rounded-full">
                                        {draw.daysLeft} days
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">{draw.drawDate}</span>
                                    <span className="text-yellow-400 font-semibold">You have {draw.yourTickets} ticket{draw.yourTickets > 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                    <span>Recent Transactions</span>
                    <Wallet className="w-5 h-5 text-yellow-400" />
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                                <th className="py-2 px-3">Transaction ID</th>
                                <th className="py-2 px-3">Type</th>
                                <th className="py-2 px-3">Description</th>
                                <th className="py-2 px-3">Date</th>
                                <th className="py-2 px-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {recentTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="py-3 px-3 text-xs font-mono text-gray-400">{txn.id}</td>
                                    <td className="py-3 px-3 text-sm text-white">{txn.type}</td>
                                    <td className="py-3 px-3 text-sm text-gray-300">{txn.description}</td>
                                    <td className="py-3 px-3 text-xs text-gray-400">{txn.date}</td>
                                    <td className={`py-3 px-3 text-sm font-bold text-right ${txn.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default MyDashboard;
