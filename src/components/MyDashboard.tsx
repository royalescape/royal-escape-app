"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import Loader from './Loader';
import { User, DashboardData, PotEnrollment } from '@/types';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

interface MyDashboardProps {
    user: User;
}

const ITEMS_PER_PAGE = 5;
const MAX_PAGES = 10;

const MyDashboard: React.FC<MyDashboardProps> = ({ user }) => {
    const router = useRouter();

    const [dashboardOverview, setDashboardOverview] = useState<DashboardData>({
        total_entries: 0,
        confirmed_entries: 0,
        pending_entries: 0,
        total_winnings: 0,
    });
    const [potEnrollments, setPotEnrollments] = useState<PotEnrollment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
             if (user._id) {
                 setIsLoading(true);
                 try {
                     const [overviewData, enrollmentsData] = await Promise.all([
                         api.user.getDashboardOverview(),
                         api.pots.getMyEnrollments()
                     ]);
                     setDashboardOverview(overviewData);
                     setPotEnrollments(enrollmentsData);
                 } catch (error) {
                     console.error("Failed to fetch dashboard data", error);
                 } finally {
                     setIsLoading(false);
                 }
             }
        };

        fetchDashboardData();
    }, [user._id]);

    const sortedEnrollments = [...potEnrollments].sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime());

    // Filter recent entries by ticket_status: "confirmed" and take the first 5
    const recentEntries = sortedEnrollments.filter(entry => entry.ticket_status === "confirmed").slice(0, 5);

    const paginatedTransactions = sortedEnrollments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.min(MAX_PAGES, Math.ceil(sortedEnrollments.length / ITEMS_PER_PAGE));

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const formatStatus = (status: string) => {
        if (!status) return "";
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const formatTicketNumber = (ticketNumber: string) => {
        return `RE-${String(ticketNumber).padStart(3, '0')}`;
    };

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
                        {recentEntries.length > 0 ? (
                            recentEntries.map((entry) => (
                                <div
                                    key={`${entry.pot_id}-${entry.ticket_number}`}
                                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-yellow-400/50 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/pot/${entry.pot_id}`)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-semibold text-white">{entry.pot_name}</p>
                                            <p className="text-xs text-gray-500 font-mono">{formatTicketNumber(entry.ticket_number)}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-600/30 text-green-300 text-xs font-bold rounded-full border border-green-500">
                                            {formatStatus(entry.ticket_status)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Enrolled: {new Date(entry.enrolled_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No confirmed entries found.</p>
                        )}
                    </div>
                </div>

                {/* Recent Transactions (now using pot enrollments) */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                        <span>Recent Transactions</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-2 px-3">Pot Name</th>
                                    <th className="py-2 px-3">Ticket Number</th>
                                    <th className="py-2 px-3">Date</th>
                                    <th className="py-2 px-3 text-right">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {paginatedTransactions.length > 0 ? (
                                    paginatedTransactions.map((txn) => (
                                        <tr key={`${txn.pot_id}-${txn.ticket_number}`} className="hover:bg-gray-700/30 transition-colors">
                                            <td className="py-3 px-3 text-sm text-gray-300">{txn.pot_name}</td>
                                            <td className="py-3 px-3 text-xs font-mono text-gray-400">{formatTicketNumber(txn.ticket_number)}</td>
                                            <td className="py-3 px-3 text-xs text-gray-400">{new Date(txn.enrolled_at).toLocaleDateString()}</td>
                                            <td className="py-3 px-3 text-sm font-bold text-right text-yellow-400">
                                                ₹{txn.cost}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center text-gray-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyDashboard;
