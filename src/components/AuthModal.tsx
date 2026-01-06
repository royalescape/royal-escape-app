import React, { useState, useEffect } from 'react';
import { X, Crown, Mail, Lock, User as UserIcon, Sparkles } from 'lucide-react';
import { User } from '@/types';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: 'signin' | 'signup';
    onAuthSuccess: (user: User) => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
            let authenticatedUser: User;
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
                                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
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
                        <span>Don't have an account?{' '}<button onClick={() => setMode('signup')} className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors">Sign Up</button></span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
