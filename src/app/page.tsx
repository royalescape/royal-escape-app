"use client";

import React, { useState, useEffect, useCallback } from 'react';
import FAQSection from "@/components/FAQSection";

// Removed 'next/navigation' import to fix compilation error.
// We will use standard window.location for external navigation (pot page).
import {
    Crown, Sparkles, Trophy, Instagram, Facebook, MessageCircle, Menu, X, Wallet,
    User, ListOrdered, Link, Copy, Mail, Lock, Gift, Home, MapPin, Calendar, Globe,
    Building, Phone, RotateCcw, Pencil, Check
} from 'lucide-react';

// --- Type Definitions ---
type UserType = { name: string; email: string };
type View = 'home' | 'personalInfo' | 'myOrders' | 'myWallet' | 'myReferrals';

// --- Mock Utility Function ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Sub-Components for Different Views ---

/**
 * My Referrals Component (Unchanged)
 */
const MyReferrals: React.FC<{ user: UserType }> = ({ user }) => {
    const referralLink = `https://royalescape.club/join?ref=${user.name.replace(/\s/g, '-')}`;
    const [copyText, setCopyText] = useState('Copy Link');

    // Mock data for referrals
    const mockReferrals = [
        { name: 'Ravi Sharma', status: 'Entry Purchased', date: '2024-10-28', earnings: 50 },
        { name: 'Priya Verma', status: 'Signed Up', date: '2024-10-25', earnings: 0 },
        { name: 'Anil Kumar', status: 'Entry Purchased', date: '2024-09-15', earnings: 50 },
    ];

    const totalEarnings = mockReferrals.reduce((sum, ref) => sum + ref.earnings, 0);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy Link'), 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyText('Error');
            setTimeout(() => setCopyText('Copy Link'), 1500);
        });
    };

    return (
        <section className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-yellow-400/30 pb-3">
                <Link className="inline w-8 h-8 mr-3 text-yellow-400" /> My Referrals
            </h2>
            <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
                        Your Unique Referral Link
                    </h3>
                    <p className="text-gray-400 mb-3">Share this link to earn **₹50** when your friends sign up and purchase their first entry!</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-grow p-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-yellow-300 font-mono focus:outline-none focus:border-yellow-500"
                        />
                        <button
                            onClick={handleCopy}
                            className="shrink-0 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40 transition-all"
                        >
                            <Copy className="inline w-5 h-5 mr-1" /> {copyText}
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex justify-between items-center">
                        Referral Summary
                        <span className="text-lg text-yellow-400">Total Earned: ₹{totalEarnings}</span>
                    </h3>
                    <div className="space-y-3">
                        {mockReferrals.length > 0 ? (
                            mockReferrals.map((ref, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                                    <div className="flex flex-col text-sm">
                                        <span className="text-white font-medium">{ref.name}</span>
                                        <span className="text-xs text-gray-500">Joined: {ref.date}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${ref.status === 'Entry Purchased' ? 'bg-green-600/30 text-green-300' : 'bg-blue-600/30 text-blue-300'}`}>
                                            {ref.status}
                                        </span>
                                        {ref.earnings > 0 && (
                                            <p className="text-sm font-bold text-green-400 mt-1">+₹{ref.earnings}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-4">No referrals yet. Share your link to start earning!</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


/**
 * My Personal Info Component (Unchanged)
 */
const MyPersonalInfo: React.FC<{ user: UserType }> = ({ user }) => {
    // Mock user data state to simulate form fields (using user prop for initial values)
    const [formData, setFormData] = useState({
        fullName: user.name,
        userName: '+918212987362', // Mock value
        dob: 'DD/MM/YYYY', // Mock value
        address: '',
        currency: 'Indian Rupee',
        postalCode: '',
        country: 'India',
        state: 'Select Region',
        city: 'Select City',
        email: user.email,
        mobile: '+91 82372-19389', // Mock value
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Mock API call delay
        await delay(1000);
        setIsSaving(false);
        setIsSaved(true);
        // In a real app, update global user state here if needed
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleReset = () => {
        setFormData({
            fullName: user.name,
            userName: '+918212987362',
            dob: 'DD/MM/YYYY',
            address: '',
            currency: 'Indian Rupee',
            postalCode: '',
            country: 'India',
            state: 'Select Region',
            city: 'Select City',
            email: user.email,
            mobile: '+91 82372-19389',
        });
    };

    const inputClasses = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-500";
    const labelClasses = "block text-sm font-medium text-gray-400 mb-1";

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-yellow-400/30 pb-3">
                <User className="inline w-8 h-8 mr-3 text-yellow-400" /> My Personal Info
            </h2>
            <form onSubmit={handleSave} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column: Avatar */}
                    <div className="md:col-span-3 flex justify-center items-start pt-4">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                            <button
                                type="button"
                                className="absolute bottom-0 right-0 p-2 bg-yellow-500 rounded-full text-black hover:bg-yellow-400 transition-colors"
                                aria-label="Edit Profile Picture"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Top Fields (Full Name, Username, DOB) */}
                    <div className="md:col-span-9 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className={labelClasses} htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClasses} required />
                        </div>
                        {/* User Name */}
                        <div>
                            <label className={labelClasses} htmlFor="userName">User Name</label>
                            <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} className={inputClasses} readOnly />
                        </div>
                        {/* DOB */}
                        <div>
                            <label className={labelClasses} htmlFor="dob">DOB</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                                <input type="text" id="dob" name="dob" value={formData.dob} onChange={handleChange} placeholder="DD/MM/YYYY" className={`${inputClasses} pl-10`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row (Address, Currency, Postal Code) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Address */}
                    <div className="md:col-span-6">
                        <label className={labelClasses} htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" className={inputClasses} />
                    </div>
                    {/* Currency */}
                    <div className="md:col-span-3">
                        <label className={labelClasses} htmlFor="currency">Currency</label>
                        <div className="relative">
                            <select id="currency" name="currency" value={formData.currency} onChange={handleChange} className={`${inputClasses} appearance-none pr-10`}>
                                <option>Indian Rupee</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                    {/* Postal Code */}
                    <div className="md:col-span-3">
                        <label className={labelClasses} htmlFor="postalCode">Postal Code</label>
                        <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Enter Postal Code" className={inputClasses} />
                    </div>
                </div>

                {/* Third Row (Location and Contact Info) */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Country */}
                    <div className="md:col-span-2">
                        <label className={labelClasses} htmlFor="country">Country</label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                            <option>India</option>
                            <option>USA</option>
                        </select>
                    </div>
                    {/* State */}
                    <div className="md:col-span-2">
                        <label className={labelClasses} htmlFor="state">State</label>
                        <select id="state" name="state" value={formData.state} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                            <option>Select Region</option>
                            <option>Maharashtra</option>
                            <option>Delhi</option>
                        </select>
                    </div>
                    {/* City */}
                    <div className="md:col-span-2">
                        <label className={labelClasses} htmlFor="city">City</label>
                        <select id="city" name="city" value={formData.city} onChange={handleChange} className={`${inputClasses} appearance-none`}>
                            <option>Select City</option>
                            <option>Pune</option>
                            <option>Mumbai</option>
                        </select>
                    </div>
                    {/* Email */}
                    <div className="md:col-span-3">
                        <label className={labelClasses} htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} readOnly />
                    </div>
                    {/* Mobile Number */}
                    <div className="md:col-span-3">
                        <label className={labelClasses} htmlFor="mobile">Mobile Number</label>
                        <div className="flex items-center space-x-2">
                            <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClasses} readOnly />
                            <span className="text-sm font-semibold text-green-400 border border-green-500/50 px-3 py-1 rounded-full shrink-0">VERIFIED</span>
                        </div>
                    </div>
                </div>

                {/* Save and Reset Buttons */}
                <div className="mt-10 flex items-center space-x-6">
                    <button
                        type="submit"
                        className="flex items-center px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <svg className="animate-spin h-5 w-5 mr-3 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : 'SAVE CHANGES'}
                        {isSaved && !isSaving && <Check className="w-5 h-5 ml-2 text-green-700" />}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors font-medium"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" /> RESET
                    </button>
                </div>
            </form>
        </section>
    );
};

/**
 * My Dashboard Component - Comprehensive Overview (Unchanged)
 */
const MyDashboard: React.FC<{ user: UserType }> = ({ user }) => {
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


// --- User Dashboard Summary Component (Unchanged) ---
const UserDashboardSummary: React.FC<{ user: UserType, handleViewChange: (view: View) => void }> = ({ user, handleViewChange }) => {
    // Mock Data (consistent with MyDashboard component)
    const stats = {
        activeEntries: 5,
        walletBalance: 156,
        referralEarnings: 75,
        totalTickets: 8
    };

    return (
        <section className="relative py-12 px-4 overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-b border-gray-700">
            <div className="max-w-7xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <Crown className="inline w-10 h-10 mr-3 text-yellow-400" />
                    Welcome back, <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{user.name.split(' ')[0]}!</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-4xl mb-8">
                    Your Royal Escape overview at a glance. Get ready for the next draw.
                </p>

                {/* Summary Stats Grid - Added onClick and styling to each stat block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div
                        onClick={() => handleViewChange('myOrders')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Trophy className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-blue-400">{stats.activeEntries}</p>
                        <p className="text-xs text-gray-400">Active Entries</p>
                    </div>
                    <div
                        onClick={() => handleViewChange('myWallet')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Wallet className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-green-400">₹{stats.walletBalance}</p>
                        <p className="text-xs text-gray-400">Wallet Balance</p>
                    </div>
                    <div
                        onClick={() => handleViewChange('myReferrals')}
                        className="p-4 bg-gray-800/70 rounded-xl border border-yellow-400/30 cursor-pointer hover:bg-gray-700/70 transition-colors"
                    >
                        <Gift className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-purple-400">₹{stats.referralEarnings}</p>
                        <p className="text-xs text-gray-400">Referral Earnings</p>
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


// --- Auth Modal (Unchanged) ---
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'signin' | 'signup';
    onAuthSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onAuthSuccess }) => {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => { setMode(initialMode); }, [initialMode, isOpen]);
    useEffect(() => {
        setEmail(''); setPassword(''); setName(''); setError(''); setIsSuccess(false);
    }, [mode, isOpen]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSuccess(false);
        setIsLoading(true);

        await delay(1500);

        try {
            let authenticatedUser: UserType;
            if (mode === 'signup') {
                if (!email || !password || !name) { throw new Error('Please fill in all fields.'); }
                authenticatedUser = { name: name, email: email };
            } else {
                if (!email || !password) { throw new Error('Please enter your email and password.'); }
                const mockUserName = name || email.split('@')[0].split('.').join(' ').toUpperCase();
                authenticatedUser = { name: mockUserName, email: email };
            }

            setIsSuccess(true);
            setIsLoading(false);
            await delay(1000);
            onAuthSuccess(authenticatedUser);
            /* eslint-disable  @typescript-eslint/no-explicit-any */
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during authentication.');
            setIsLoading(false);
            setIsSuccess(false);
        }
    };

    if (!isOpen) return null;

    const isSignUp = mode === 'signup';
    const formTitle = isSignUp ? 'Create Royal Account' : 'Sign In to Your Kingdom';
    const submitButtonText = isSignUp ? 'Sign Up for Free Entry' : 'Sign In';

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-gray-900 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,193,7,0.3)] border border-yellow-500/20"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Close"> <X className="w-6 h-6" /> </button>
                <div className="text-center mb-8">
                    <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h2 className="text-3xl font-bold text-white mb-2">{formTitle}</h2>
                    <p className="text-gray-400 text-sm">{isSignUp ? "Join today and get your first entry to luxury rewards!" : "Welcome back, Your Majesty."}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150" disabled={isLoading || isSuccess} required />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150" disabled={isLoading || isSuccess} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150" disabled={isLoading || isSuccess} required />
                        </div>
                        {!isSignUp && (<div className="text-right mt-2"><a href="#" className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors">Forgot Password?</a></div>)}
                    </div>

                    {error && (<div className="p-3 bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-xl">{error}</div>)}
                    {isSuccess && (<div className="p-3 bg-green-900/50 border border-green-500 text-green-300 text-sm rounded-xl flex items-center gap-2"><Sparkles className="w-5 h-5" />{isSignUp ? 'Successfully signed up! Redirecting...' : 'Signed in successfully! Redirecting...'}</div>)}

                    <button type="submit" disabled={isLoading || isSuccess} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                        {isLoading && !isSuccess && (<svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
                        {isSuccess ? 'Success!' : submitButtonText}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400">
                    {isSignUp ? (
                        <span>Already have an account?{' '}<button onClick={() => setMode('signin')} className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">Sign In</button></span>
                    ) : (
                        <span>Don&apos;t have an account?{' '}<button onClick={() => setMode('signup')} className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">Sign Up</button></span>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Main Application Component ---
export default function RoyalEscapeHome() {
    // Note: Removed useRouter import due to environment constraints. Using window.location.href instead.

    const [user, setUser] = useState<UserType | null>(null);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // NEW STATE: For internal routing
    const [currentView, setCurrentView] = useState<View>('home');


    // 🚩 EFFECT: Load user state from local storage on mount (Persistence Fix)
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('royalEscapeUser');
            if (storedUser) {
                setUser(JSON.parse(storedUser) as UserType);
            }
        } catch (error) {
            console.error("Failed to load user from localStorage:", error);
            localStorage.removeItem('royalEscapeUser');
            setUser(null);
        }
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
            // Using window.location.href to simulate navigation back to the root if needed
            // window.location.href = '/'; 
        } else {
            console.log(`Navigating to ${view} view...`);
        }
    }, []);

    // UPDATED: Save user to localStorage on success
    const handleAuthSuccess = useCallback((authenticatedUser: UserType) => {
        setUser(authenticatedUser);
        localStorage.setItem('royalEscapeUser', JSON.stringify(authenticatedUser));
        closeAuthModal();

        if (redirectAfterAuth) {
            // Use standard window location redirection
            setTimeout(() => {
                window.location.href = redirectAfterAuth;
            }, 100);
        }
    }, [closeAuthModal, redirectAfterAuth]);

    // UPDATED: Clear persistence on sign out
    const handleSignOut = useCallback(() => {
        setUser(null);
        localStorage.removeItem('royalEscapeUser');
        console.log("User signed out.");
        setIsProfileDropdownOpen(false);
        setCurrentView('home'); // Go back to home view
        // window.location.href = '/'; 
    }, []);

    const COUPON_PRICE = 249;

    // FUNCTION: Handles click on a Pot, checks authentication, and redirects
    const handlePotClick = (potId: number) => {
        const potUrl = `/pot/${potId}`;

        if (user) {
            // Use standard window location redirection
            window.location.href = potUrl;
        } else {
            setRedirectAfterAuth(potUrl);
            openAuthModal('signin');
        }
    };

    // --- Data (only needed for home view) ---
    const livePots = [
        { id: 1, name: "MacBook Air M3", icon: "💻", value: "₹1,20,000", description: "Your entry ticket to win this dream machine." },
        { id: 2, name: "Gold Coin", icon: "🪙", value: "₹30,000-₹40,000", description: "A chance to win a valuable investment asset." },
        { id: 3, name: "Luxury Hotel Staycation", icon: "🏨", value: "₹25,000", description: "Unlock an amazing weekend getaway." },
        { id: 4, name: "Apple Watch Ultra 2", icon: "⌚", value: "₹70,000", description: "Enter to win the ultimate smartwatch." },
        { id: 5, name: "Royal Escape Maldives Trip", icon: "🏝️", value: "₹1,20,000", description: "A free entry to win an all-inclusive trip." }
    ];

    const comingSoonPots = [
        { id: 6, name: "iPhone 16 Pro", icon: "📱", value: "₹1,60,000", description: "Coming soon to Royal Escape draws!" },
        { id: 7, name: "Dubai Luxury Trip", icon: "✈️", value: "₹2,00,000", description: "An exclusive travel experience awaits." },
        { id: 8, name: "Swiss Watch Collection", icon: "⌚", value: "₹3,00,000", description: "Timeless elegance for the lucky winner." }
    ];

    // --- Conditional Rendering based on View State ---

    const renderContent = () => {
        if (!user) return <HomeViewContent user={null} handleViewChange={handleViewChange} />;

        switch (currentView) {
            case 'personalInfo':
                // NEW: Use the redesigned MyPersonalInfo component
                return <MyPersonalInfo user={user} />;
            case 'myReferrals':
                // NEW: Use the separate MyReferrals component
                return <MyReferrals user={user} />;
            case 'myOrders':
                // Passes user to MyDashboard
                return <MyDashboard user={user} />;
            case 'myWallet':
                return <section className="max-w-4xl mx-auto py-12 px-4 text-center text-white"><h2 className="text-4xl font-bold mb-4 text-yellow-400">My Wallet</h2><p className="text-lg text-gray-400">Manage your Royal Escape funds here. Current Balance: **₹0**</p><p className="mt-8 text-sm text-gray-500">Feature implementation pending. Click &apos;Add Money&apos; in the header to navigate here when developed.</p></section>;
            case 'home':
            default:
                // Home view content, which handles the Hero/Summary swap internally
                return <HomeViewContent user={user} handleViewChange={handleViewChange} />;
        }
    };

    // Helper component to keep the main return clean
    // 🚩 MODIFIED: HomeViewContent now includes the boast stats when user is null
    const HomeViewContent: React.FC<{ user: UserType | null, handleViewChange: (view: View) => void }> = ({ user, handleViewChange }) => (
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
                                <User className="w-8 h-8 text-blue-400 mb-2 mx-auto" />
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


            {/* Live Pots (UPDATED HANDLER) */}
            <section id="live-pots" className="py-16 px-4 bg-gray-900/40">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
                        Live <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Pots</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {livePots.map(pot => (
                            <div key={pot.id} className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                                <div className="text-6xl mb-4">{pot.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{pot.name}</h3>
                                <p className="text-gray-400 mb-3">{pot.description}</p>
                                <p className="text-yellow-400 font-semibold">{pot.value}</p>
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
                                <p className="text-yellow-400 font-semibold">{pot.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );

    // Determines if we are on an account-specific view (excluding 'home')
    const isAccountView = currentView !== 'home';

    // CORRECTED CONDITION: Only show promotional sections if the user is LOGGED OUT AND on the home view.
    const showPromotionalSections = currentView === 'home' && !user;


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header (Unchanged) */}
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

                                    {/* Profile Dropdown (UPDATED OPTIONS) */}
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
                                                    <User className="w-4 h-4 mr-2" /> My Personal Info
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