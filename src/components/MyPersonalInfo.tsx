"use client";

import React, { useState } from 'react';
import { User as UserIcon, Pencil, Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import { User } from '@/types';

// Utility delay function (can be moved to a shared utility file if reused extensively)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface MyPersonalInfoProps {
    user: User;
}

const MyPersonalInfo: React.FC<MyPersonalInfoProps> = ({ user }) => {
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
                <UserIcon className="inline w-8 h-8 mr-3 text-yellow-400" /> My Personal Info
            </h2>
            <form onSubmit={handleSave} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Column: Avatar */}
                    <div className="md:col-span-3 flex justify-center items-start pt-4">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center border-4 border-gray-600">
                                <UserIcon className="w-16 h-16 text-gray-400" />
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

export default MyPersonalInfo;
