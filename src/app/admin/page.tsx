"use client";

import React, { useState, useEffect } from 'react';
import {
    Crown, Plus, Edit2, Trash2, Eye, TrendingUp, Users, Wallet,
    Trophy, Package, RefreshCw, Search, X,
    Calendar, DollarSign, Save,
    Home, Tag, MessageSquare
} from 'lucide-react';
import { PotItem, User, Coupon, Transaction, SupportTicket, PotStatus } from '@/types';

// --- Types ---
type AdminUser = { email: string; role: 'admin' | 'super-admin' };

type DashboardView = 'home' | 'pots' | 'users' | 'finance' | 'coupons' | 'support';

// --- Mock Data ---

const MOCK_ADMIN = { email: 'admin@royalescape.club', role: 'admin' as const };

// Mapping to match PotItem from @/types but with required fields for Admin view
const MOCK_POTS: PotItem[] = [
    {
        id: 1,
        name: "MacBook Air M3",
        icon: "💻",
        prizeValue: "₹1,20,000",
        description: "Your entry ticket to win this dream machine.",
        status: 'active',
        entryFee: 249,
        totalEntries: 950, // Renamed from filled
        // filled: 950, // Map this in real app if keys differ
        maxEntries: 1000, // Renamed from totalSlots
        // totalSlots: 1000,
        drawDate: '2025-01-05',
        createdDate: '2024-12-15',
        revenue: 236550,
        merchandiseId: 1,
        // Default required fields for PotItem
        category: 'macbook',
        type: 'Electronics',
        filled: 950,
        totalSlots: 1000,
        remaining: 50,
        daysLeft: 5,
        endDate: '2025-01-05'
    },
    {
        id: 2,
        name: "Gold Coin",
        icon: "🪙",
        prizeValue: "₹30,000-₹40,000",
        description: "A chance to win a valuable investment asset.",
        status: 'ending-soon',
        entryFee: 249,
        totalEntries: 750,
        maxEntries: 800,
        drawDate: '2025-01-01',
        createdDate: '2024-12-10',
        revenue: 186750,
        merchandiseId: 2,
        category: 'gold',
        type: 'Financial',
        filled: 750,
        totalSlots: 800,
        remaining: 50,
        daysLeft: 1,
        endDate: '2025-01-01'
    },
    {
        id: 6,
        name: "iPhone 16 Pro",
        icon: "📱",
        prizeValue: "₹1,60,000",
        description: "Coming soon to Royal Escape draws!",
        status: 'upcoming',
        entryFee: 299,
        totalEntries: 0,
        maxEntries: 1200,
        drawDate: '2025-01-20',
        createdDate: '2024-12-25',
        revenue: 0,
        merchandiseId: 3,
        category: 'macbook', // Default fallback
        type: 'Electronics',
        filled: 0,
        totalSlots: 1200,
        remaining: 1200,
        daysLeft: 20,
        endDate: '2025-01-20'
    }
];

const MOCK_USERS: User[] = [
    {
        id: 101, name: "Arjun Singh", email: "arjun@example.com", mobile: "9876543210", address: "Mumbai",
        walletBalance: 1500, status: 'active', registrationDate: '2024-12-15', totalEntries: 15, totalWinnings: 5000, referralCode: 'ARJUN101'
    },
    {
        id: 102, name: "Priya Sharma", email: "priya@example.com", mobile: "9988776655", address: "Delhi",
        walletBalance: 250, status: 'active', registrationDate: '2024-12-18', totalEntries: 5, totalWinnings: 0, referralCode: 'PRIYA102'
    },
    {
        id: 103, name: "Ravi Varma", email: "ravi@example.com", mobile: "9000011111", address: "Bangalore",
        walletBalance: 0, status: 'suspended', registrationDate: '2024-12-20', totalEntries: 0, totalWinnings: 0, referralCode: 'RAVI103'
    },
];

const MOCK_COUPONS: Coupon[] = [
    { id: 1, code: 'WELCOME20', discountType: 'percentage', value: 20, expiryDate: '2025-02-28', usageLimit: 1000, usedCount: 50, appliesTo: 'global' },
    { id: 2, code: 'POT1FREE', discountType: 'fixed', value: 249, expiryDate: '2025-01-05', usageLimit: 10, usedCount: 3, appliesTo: 'specific_pot', targetId: 1 },
];

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 1, userId: 101, type: 'deposit', amount: 2000, date: '2024-12-28', status: 'success' },
    { id: 2, userId: 101, type: 'spend', amount: 747, date: '2024-12-29', status: 'success', potId: 1 },
    { id: 3, userId: 102, type: 'win', amount: 5000, date: '2025-01-02', status: 'success' },
];

const MOCK_TICKETS: SupportTicket[] = [
    { id: 1, userId: 102, subject: 'Wallet Deposit Issue', status: 'open', priority: 'high', lastUpdated: '2025-01-03 10:00' },
    { id: 2, userId: 101, subject: 'Pot 2 Draw Inquiry', status: 'in-progress', priority: 'medium', lastUpdated: '2025-01-03 15:30' },
];


// --- Helper Components (Dashboard Stats and PotFormModal from original file, slightly updated) ---

const DashboardStats: React.FC<{ pots: PotItem[] }> = ({ pots }) => {
    // ... (Stats calculation remains the same, revenue updated to reflect new mock data)
    const stats = {
        totalRevenue: pots.reduce((sum, pot) => sum + (pot.revenue || 0), 0),
        activePots: pots.filter(p => p.status === 'active' || p.status === 'ending-soon').length,
        totalEntries: pots.reduce((sum, pot) => sum + (pot.totalEntries || 0), 0),
        avgFillRate: pots.filter(p => p.status === 'active' || p.status === 'ending-soon').reduce((sum, pot) =>
            sum + ((pot.totalEntries || 0) / (pot.maxEntries || 1) * 100), 0) /
            pots.filter(p => p.status === 'active' || p.status === 'ending-soon').length || 0
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-green-400">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-300 font-medium mt-1">Total Pot Revenue</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Trophy className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-blue-400">{stats.activePots}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium mt-1">Live/Ending Pots</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Users className="w-8 h-8 text-purple-400" />
                    <span className="text-2xl font-bold text-purple-400">{stats.totalEntries.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-300 font-medium mt-1">Total Entries</p>
            </div>

            <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <Package className="w-8 h-8 text-orange-400" />
                    <span className="text-2xl font-bold text-orange-400">{stats.avgFillRate.toFixed(1)}%</span>
                </div>
                <p className="text-sm text-gray-300 font-medium mt-1">Avg Fill Rate</p>
            </div>
        </div>
    );
};

// Pot Form Modal (Minimal changes for merchandise link)
const PotFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    pot?: PotItem;
    onSave: (pot: Partial<PotItem>) => void;
}> = ({ isOpen, onClose, pot, onSave }) => {
    const [formData, setFormData] = useState({
        name: pot?.name || '',
        icon: pot?.icon || '🎁',
        prizeValue: pot?.prizeValue || '',
        description: pot?.description || '',
        status: pot?.status || 'upcoming',
        entryFee: pot?.entryFee || 249,
        maxEntries: pot?.maxEntries || 1000,
        drawDate: pot?.drawDate || '',
        merchandiseId: pot?.merchandiseId || 1, // Added field
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.prizeValue || !formData.description || !formData.drawDate) {
            alert('Please fill in all required fields');
            return;
        }

        onSave({
            ...formData,
            ...(pot ? { id: pot.id } : {}),
            totalEntries: pot?.totalEntries || 0,
            revenue: pot?.revenue || 0,
            createdDate: pot?.createdDate || new Date().toISOString().split('T')[0]
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-gray-900 rounded-3xl p-8 border border-yellow-500/20 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-yellow-400">
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                    <Crown className="w-8 h-8 mr-3 text-yellow-400" />
                    {pot ? 'Edit Pot' : 'Create New Pot'}
                </h2>

                <div className="space-y-4">
                    {/* ... (Existing form fields: Name, Icon, Value, Description) ... */}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Pot Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (Emoji) *</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                                maxLength={2}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Value (e.g., ₹1,20,000) *</label>
                        <input
                            type="text"
                            value={formData.prizeValue}
                            onChange={e => setFormData({ ...formData, prizeValue: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Entry Fee (₹) *</label>
                            <input
                                type="number"
                                value={formData.entryFee}
                                onChange={e => setFormData({ ...formData, entryFee: Number(e.target.value) })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Max Entries *</label>
                            <input
                                type="number"
                                value={formData.maxEntries}
                                onChange={e => setFormData({ ...formData, maxEntries: Number(e.target.value) })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Status *</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as PotStatus })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                                <option value="ending-soon">Ending Soon</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        {/* New Field: Merchandise Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Merchandise ID</label>
                            <input
                                type="number"
                                value={formData.merchandiseId}
                                onChange={e => setFormData({ ...formData, merchandiseId: Number(e.target.value) })}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                                placeholder="e.g., 1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Draw Date *</label>
                        <input
                            type="date"
                            value={formData.drawDate}
                            onChange={e => setFormData({ ...formData, drawDate: e.target.value })}
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg"
                        >
                            <Save className="inline w-5 h-5 mr-2" />
                            {pot ? 'Update Pot' : 'Create Pot'}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-700 text-gray-400 rounded-lg hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Pots Table Component (Minimal status update)
const PotsTable: React.FC<{
    pots: PotItem[];
    onEdit: (pot: PotItem) => void;
    onDelete: (id: number) => void;
    onView: (pot: PotItem) => void;
}> = ({ pots, onEdit, onDelete, onView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<PotStatus | 'all'>('all');

    const filteredPots = pots.filter(pot => {
        const matchesSearch = pot.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || pot.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: 'bg-green-600/30 text-green-300 border-green-500',
            upcoming: 'bg-blue-600/30 text-blue-300 border-blue-500',
            'ending-soon': 'bg-red-600/30 text-red-300 border-red-500', // New style
            completed: 'bg-gray-600/30 text-gray-300 border-gray-500',
            cancelled: 'bg-red-600/30 text-red-300 border-red-500'
        };
        return styles[status] || styles['completed'];
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                    All Pots
                </h3>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search pots..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as PotStatus | 'all')}
                        className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-yellow-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ending-soon">Ending Soon</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">Pot</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Entries</th>
                            <th className="py-3 px-4">Revenue</th>
                            <th className="py-3 px-4">Draw Date</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredPots.map(pot => (
                            <tr key={pot.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{pot.icon}</span>
                                        <div>
                                            <p className="text-white font-semibold">{pot.name}</p>
                                            <p className="text-xs text-gray-400">{pot.prizeValue}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(pot.status)}`}>
                                        {pot.status.toUpperCase().replace('-', ' ')}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">{pot.totalEntries} / {pot.maxEntries}</span>
                                        <div className="w-24 h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                                style={{ width: `${((pot.totalEntries || 0) / (pot.maxEntries || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="text-green-400 font-bold">₹{pot.revenue?.toLocaleString() || 0}</span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">{pot.drawDate}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onView(pot)}
                                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onEdit(pot)}
                                            className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(pot.id)}
                                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredPots.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No pots found matching your criteria</p>
                </div>
            )}
        </div>
    );
};


// --- New Feature Components ---

// 1. User Management Component
const UserManagement: React.FC<{ users: User[], onView: (user: User) => void }> = ({ users, onView }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-2xl font-bold text-white flex items-center mb-6">
            <Users className="w-6 h-6 mr-2 text-purple-400" />
            User Management
        </h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Name/Email</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Wallet</th>
                        <th className="py-3 px-4">Entries / Winnings</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-4">
                                <p className="text-white font-semibold">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </td>
                            <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${user.status === 'active' ? 'bg-green-600/30 text-green-300' : 'bg-red-600/30 text-red-300'}`}>
                                    {user.status?.toUpperCase()}
                                </span>
                            </td>
                            <td className="py-4 px-4">₹{user.walletBalance?.toLocaleString()}</td>
                            <td className="py-4 px-4">
                                <span className="text-white">{user.totalEntries} entries</span>
                                <span className="block text-green-400 text-sm">₹{user.totalWinnings?.toLocaleString()} won</span>
                            </td>
                            <td className="py-4 px-4">
                                <button
                                    onClick={() => onView(user)}
                                    className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                    title="View Profile"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// 2. Financial Management Component
const FinancialManagement: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-2xl font-bold text-white flex items-center mb-6">
            <Wallet className="w-6 h-6 mr-2 text-green-400" />
            Financial Overview
        </h3>

        {/* Financial Stats (Detailed) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400">Total Deposits</p>
                {/* Changed text-xl to text-lg */}
                <p className="text-lg font-bold text-green-300">₹{MOCK_TRANSACTIONS.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400">Total Payouts</p>
                {/* Changed text-xl to text-lg */}
                <p className="text-lg font-bold text-red-300">₹{MOCK_TRANSACTIONS.filter(t => t.type === 'win').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400">Net Revenue</p>
                {/* Changed text-xl to text-lg */}
                <p className="text-lg font-bold text-yellow-300">₹{(MOCK_POTS.reduce((sum, p) => sum + (p.revenue || 0), 0) - MOCK_TRANSACTIONS.filter(t => t.type === 'win').reduce((sum, t) => sum + t.amount, 0)).toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-400">Active Wallet Balance</p>
                {/* Changed text-xl to text-lg */}
                <p className="text-lg font-bold text-blue-300">₹{MOCK_USERS.reduce((sum, u) => sum + (u.walletBalance || 0), 0).toLocaleString()}</p>
            </div>
        </div>

        {/* Global Transaction Log */}
        <h4 className="text-xl font-semibold text-white mb-4 mt-8">Global Transaction Log</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">User ID</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {transactions.map(t => (
                        <tr key={t.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-4 text-gray-300 text-sm">{t.date}</td>
                            <td className="py-4 px-4 text-white">{t.userId}</td>
                            <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${t.type === 'deposit' ? 'bg-green-600/30 text-green-300' : t.type === 'spend' ? 'bg-red-600/30 text-red-300' : 'bg-blue-600/30 text-blue-300'}`}>
                                    {t.type.toUpperCase()}
                                </span>
                            </td>
                            <td className={`py-4 px-4 font-bold ${t.type === 'deposit' || t.type === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                                {t.type === 'deposit' || t.type === 'win' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-gray-300">{t.status.toUpperCase()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// 3. Coupon Management Component
const CouponManagement: React.FC<{ coupons: Coupon[], onCreate: () => void }> = ({ coupons, onCreate }) => (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
                <Tag className="w-6 h-6 mr-2 text-yellow-400" />
                Coupon & Referral Management
            </h3>
            <button
                onClick={onCreate}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 font-bold rounded-lg border border-yellow-500/50 hover:bg-yellow-500/30 transition-all"
            >
                <Plus className="w-5 h-5" />
                New Coupon
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4">Discount</th>
                        <th className="py-3 px-4">Applies To</th>
                        <th className="py-3 px-4">Usage</th>
                        <th className="py-3 px-4">Expiry</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {coupons.map(coupon => (
                        <tr key={coupon.id} className="hover:bg-gray-700/30 transition-colors">
                            <td className="py-4 px-4 font-mono text-yellow-300 font-bold">{coupon.code}</td>
                            <td className="py-4 px-4 text-white">{coupon.value}{coupon.discountType === 'percentage' ? '%' : '₹ Fixed'}</td>
                            <td className="py-4 px-4 text-gray-300 capitalize">{coupon.appliesTo.replace('_', ' ')} {coupon.targetId ? `(ID: ${coupon.targetId})` : ''}</td>
                            <td className="py-4 px-4 text-blue-300">{coupon.usedCount} / {coupon.usageLimit}</td>
                            <td className="py-4 px-4 text-gray-400">{coupon.expiryDate}</td>
                            <td className="py-4 px-4">
                                <button className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors" title="Edit">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors ml-2" title="Delete">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Placeholder for Referral Audit */}
        <h4 className="text-xl font-semibold text-white mb-4 mt-8">Referral Program Audit</h4>
        <div className="p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400">
            <p className="flex items-center"><TrendingUp className="w-4 h-4 mr-2" /> Total Referrals Tracked: **15** (Placeholder)</p>
            <p className="flex items-center"><DollarSign className="w-4 h-4 mr-2" /> Total Referral Value Distributed: **₹15,000** (Placeholder)</p>
        </div>
    </div>
);


// 4. Support Ticket Component
const SupportManagement: React.FC<{ tickets: SupportTicket[], users: User[] }> = ({ tickets, users }) => {
    const getUserName = (userId: number) => users.find(u => u.id === userId)?.name || `User ${userId}`;
    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center mb-6">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-400" />
                Customer Support Tickets
            </h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="text-left text-gray-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-4">Ticket ID</th>
                            <th className="py-3 px-4">User</th>
                            <th className="py-3 px-4">Subject</th>
                            <th className="py-3 px-4">Priority</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Last Update</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {tickets.map(ticket => (
                            <tr key={ticket.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="py-4 px-4 text-yellow-400 font-mono">{ticket.id}</td>
                                <td className="py-4 px-4 text-white">{getUserName(ticket.userId)}</td>
                                <td className="py-4 px-4 text-gray-300">{ticket.subject}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ticket.priority === 'high' ? 'bg-red-600/30 text-red-300' : ticket.priority === 'medium' ? 'bg-orange-600/30 text-orange-300' : 'bg-gray-600/30 text-gray-300'}`}>
                                        {ticket.priority.toUpperCase()}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ticket.status === 'open' ? 'bg-red-600/30 text-red-300' : 'bg-blue-600/30 text-blue-300'}`}>
                                        {ticket.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-gray-400 text-sm">{ticket.lastUpdated.split(' ')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Sidebar Navigation Component ---
const Sidebar: React.FC<{
    currentView: DashboardView;
    setView: (view: DashboardView) => void;
}> = ({ currentView, setView }) => {
    const navItems: { view: DashboardView; icon: React.ElementType; label: string }[] = [
        { view: 'home', icon: Home, label: 'Dashboard' },
        { view: 'pots', icon: Trophy, label: 'Pots Management' },
        { view: 'users', icon: Users, label: 'User Management' },
        { view: 'finance', icon: Wallet, label: 'Financials' },
        { view: 'coupons', icon: Tag, label: 'Coupons/Referrals' },
        { view: 'support', icon: MessageSquare, label: 'Support Tickets' },
    ];

    return (
        <nav className="p-4 space-y-2">
            {navItems.map(item => (
                <button
                    key={item.view}
                    onClick={() => setView(item.view)}
                    className={`flex items-center w-full p-3 rounded-xl transition-colors ${currentView === item.view
                        ? 'bg-yellow-500/30 text-yellow-400 font-bold'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }`}
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};


// Main Admin Dashboard Component
export default function AdminDashboard() {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [pots, setPots] = useState<PotItem[]>(MOCK_POTS);
    const [users] = useState<User[]>(MOCK_USERS);
    const [coupons] = useState<Coupon[]>(MOCK_COUPONS);
    const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [tickets] = useState<SupportTicket[]>(MOCK_TICKETS);
    const [currentView, setCurrentView] = useState<DashboardView>('home'); // State for navigation

    const [isPotFormOpen, setIsPotFormOpen] = useState(false);
    const [editingPot, setEditingPot] = useState<PotItem | undefined>();

    // Mock login
    useEffect(() => {
        setAdmin(MOCK_ADMIN);
    }, []);

    // Pot Handlers
    const handleCreatePot = () => {
        setEditingPot(undefined);
        setIsPotFormOpen(true);
    };

    const handleEditPot = (pot: PotItem) => {
        setEditingPot(pot);
        setIsPotFormOpen(true);
    };

    const handleSavePot = (potData: Partial<PotItem>) => {
        if (editingPot) {
            setPots(pots.map(p => p.id === editingPot.id ? { ...p, ...potData } : p));
        } else {
            // Extract only the properties you want from potData, excluding id
            const { id, ...safePotData } = potData;

            const newPot: PotItem = {
                id: pots.length > 0 ? Math.max(...pots.map(p => p.id)) + 1 : 1,
                totalEntries: 0,
                revenue: 0,
                createdDate: new Date().toISOString().split('T')[0],
                // Defaults for required fields
                category: 'macbook',
                type: 'Electronics',
                filled: 0,
                totalSlots: 1000,
                remaining: 1000,
                daysLeft: 30,
                endDate: new Date().toISOString().split('T')[0],
                ...safePotData
            } as PotItem;
            setPots([...pots, newPot]);
        }
        setIsPotFormOpen(false);
        setEditingPot(undefined);
    };

    const handleDeletePot = (id: number) => {
        if (confirm('Are you sure you want to delete this pot?')) {
            setPots(pots.filter(p => p.id !== id));
        }
    };

    const handleViewPot = (pot: PotItem) => {
        alert(`Viewing Pot Details: ${pot.name}`);
    };

    // User Handlers
    const handleViewUser = (user: User) => {
        alert(`Viewing User Profile for: ${user.name} (ID: ${user.id})\n\nWallet Balance: ₹${user.walletBalance}\nReferral Code: ${user.referralCode}\nStatus: ${user.status?.toUpperCase()}`);
    };

    // Coupon Handlers
    const handleCreateCoupon = () => {
        alert('Opening Coupon Creation Modal (Not fully implemented in this example)');
    };

    // --- Content Renderer based on currentView ---
    const renderContent = () => {
        switch (currentView) {
            case 'home':
                return (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Platform Overview</h2>
                        <DashboardStats pots={pots} />
                        {/* Quick Links/Summary Table Placeholder */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                <h4 className="text-xl font-semibold text-white mb-4">Latest Transactions</h4>
                                {/* Mock latest transactions list */}
                                <FinancialManagement transactions={transactions.slice(0, 3)} />
                            </div>
                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                <h4 className="text-xl font-semibold text-white mb-4">Open Support Tickets</h4>
                                {/* Mock open tickets list */}
                                <SupportManagement tickets={tickets.filter(t => t.status !== 'closed')} users={users} />
                            </div>
                        </div>
                    </div>
                );
            case 'pots':
                return (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-3xl font-bold text-white">Pots Management</h2>
                            <button
                                onClick={handleCreatePot}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40 transition-all"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Pot
                            </button>
                        </div>
                        <PotsTable
                            pots={pots}
                            onEdit={handleEditPot}
                            onDelete={handleDeletePot}
                            onView={handleViewPot}
                        />
                    </div>
                );
            case 'users':
                return (
                    <UserManagement users={users} onView={handleViewUser} />
                );
            case 'finance':
                return (
                    <FinancialManagement transactions={transactions} />
                );
            case 'coupons':
                return (
                    <CouponManagement coupons={coupons} onCreate={handleCreateCoupon} />
                );
            case 'support':
                return (
                    <SupportManagement tickets={tickets} users={users} />
                );
            default:
                return null;
        }
    };

    if (!admin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                                    Royal Escape
                                </h1>
                                <p className="text-xs text-gray-400">{currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/([A-Z])/g, ' $1')} Management</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setPots(MOCK_POTS)}
                                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
                                title="Refresh Data"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                                    {admin.email[0].toUpperCase()}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm text-white font-medium">{admin.email}</p>
                                    <p className="text-xs text-gray-400 capitalize">{admin.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <aside className="hidden lg:block w-64 mr-8 sticky top-20 h-fit bg-gray-800 rounded-xl border border-gray-700">
                    <Sidebar currentView={currentView} setView={setCurrentView} />
                </aside>

                <main className="flex-1">
                    {renderContent()}
                </main>
            </div>

            {/* --- NEW MOBILE NAVIGATION FOOTER --- */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-gray-900 border-t border-gray-800 shadow-2xl">
                <div className="flex justify-around items-center h-16">
                    {/* Replicate Sidebar items here for a mobile bottom bar */}
                    {/* You can map over the same navItems array from the Sidebar component */}
                    {[
                        { view: 'home', icon: Home, label: 'Home' },
                        { view: 'pots', icon: Trophy, label: 'Pots' },
                        { view: 'users', icon: Users, label: 'Users' },
                        { view: 'finance', icon: Wallet, label: 'Finance' },
                    ].map(item => (
                        <button
                            key={item.view}
                            onClick={() => setCurrentView(item.view as DashboardView)}
                            className={`flex flex-col items-center justify-center p-2 w-1/4 transition-colors ${currentView === item.view
                                ? 'text-yellow-400 font-bold'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    ))}
                    {/* Note: This example uses a subset of tabs for space */}
                </div>
            </nav>

            {/* Pot Form Modal */}
            <PotFormModal
                isOpen={isPotFormOpen}
                onClose={() => {
                    setIsPotFormOpen(false);
                    setEditingPot(undefined);
                }}
                pot={editingPot}
                onSave={handleSavePot}
            />
        </div>
    );
}
