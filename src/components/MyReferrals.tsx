"use client";

import React, { useState } from 'react';
import { Link, Copy } from 'lucide-react';
import { User } from '@/types';

interface MyReferralsProps {
    user: User;
}

const MyReferrals: React.FC<MyReferralsProps> = ({ user }) => {
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

export default MyReferrals;
