"use client";

import React, { useState } from 'react';
import { User as UserIcon, Pencil, Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import { User } from '@/types';

interface MyPersonalInfoProps {
    user: User;
}

const MyPersonalInfo: React.FC<MyPersonalInfoProps> = ({ user }) => {
    const formData = {
        fullName: user.name,
        email: user.email,
        mobile: user.phone,
        pinCode: user.pinCode
    };

    const inputClasses = "w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-500";
    const labelClasses = "block text-sm font-medium text-gray-400 mb-1";

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-yellow-400/30 pb-3">
                <UserIcon className="inline w-8 h-8 mr-3 text-yellow-400" /> My Personal Info
            </h2>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label className={labelClasses} htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} className={inputClasses} readOnly />
                    </div>
                    {/* Email */}
                    <div>
                        <label className={labelClasses} htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} className={inputClasses} readOnly />
                    </div>
                    {/* Mobile Number */}
                    <div>
                        <label className={labelClasses} htmlFor="mobile">Mobile Number</label>
                        <div className="flex items-center space-x-2">
                            <input type="tel" id="mobile" name="mobile" value={formData.mobile} className={inputClasses} readOnly />
                            <span className="text-sm font-semibold text-green-400 border border-green-500/50 px-3 py-1 rounded-full shrink-0">VERIFIED</span>
                        </div>
                    </div>
                    {/* Pin Code */}
                    <div>
                        <label className={labelClasses} htmlFor="pinCode">Pin Code</label>
                        <input type="text" id="pinCode" name="pinCode" value={formData.pinCode} className={inputClasses} readOnly />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyPersonalInfo;
