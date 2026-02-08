import React, { useState, useEffect } from 'react';
import { X, Crown, Sparkles, Phone, ArrowRight, Lock, User as UserIcon } from 'lucide-react';
import { User } from '@/types';
import { authService } from '@/services/modules/auth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'signin' | 'signup'; // Optional now, since we only have one flow
    onAuthSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
    // Steps: 1. Phone Input, 2. OTP Verification, 3. PIN Verification (if user exists) or PIN Set (if new), 4. Name Input (if new)
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [name, setName] = useState('');
    
    // Auth State
    const [isNewUser, setIsNewUser] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Reset state when modal opens
        if (isOpen) {
            setStep(1);
            setMobile('');
            setOtp('');
            setPin('');
            setName('');
            setError('');
            setIsSuccess(false);
            setIsNewUser(false);
            setIsOtpVerified(false);
        }
    }, [isOpen]);

    const handleMobileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!mobile || mobile.length < 10) {
                throw new Error("Please enter a valid mobile number.");
            }

            // Check if user exists
            const checkResult = await authService.checkMobile(mobile);
            setIsNewUser(!checkResult.exists);

            if (checkResult.pin_required) {
                // User exists and pin is set, move to PIN verification
                setStep(3);
            } else {
                // User needs OTP (new user or existing user fallback)
                // Only send OTP if we are strictly in the OTP flow logic?
                // The prompt says "else we show the OTP flow".
                // Usually check-user might just check. We still need to trigger send-otp if we go to step 2.
                // Assuming check-user does NOT send OTP automatically.
                await authService.sendOtp(mobile);
                setStep(2);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to verify mobile number.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!otp || otp.length < 4) {
                throw new Error("Please enter a valid OTP.");
            }

            await authService.validateOtp(mobile, otp);
            
            // If validation doesn't throw, it's successful
            setIsOtpVerified(true);
            setStep(3);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Invalid OTP.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!pin || pin.length !== 4) {
                throw new Error("Please enter a valid 4-digit PIN.");
            }

            if (isOtpVerified) {
                await authService.setPin(pin);
                
                if (isNewUser) {
                    setStep(4);
                    return;
                }

                const user = await authService.me();
                handleSuccess(user);
                return;
            }

            if (isNewUser) {
                // Should not reach here if coming from OTP flow,
                // but if manual flow handling exists:
                setStep(4);
            } else {
                // Existing user logging in
                await authService.loginWithPin(mobile, pin);
                const user = await authService.me();
                handleSuccess(user);
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Authentication failed.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleNameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!name) throw new Error("Please enter your name.");

            // Register new user
            const user = await authService.register(name, mobile, pin);
            handleSuccess(user);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Registration failed.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccess = async (user: User) => {
        setIsSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        onAuthSuccess(user);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md bg-gray-900 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,193,7,0.3)] border border-yellow-500/20"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Close"> <X className="w-6 h-6" /> </button>
                
                <div className="text-center mb-8">
                    <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {step === 1 && "Welcome to Royal Escape"}
                        {step === 2 && "Verify Your Number"}
                        {step === 3 && (isNewUser || isOtpVerified ? "Set Your Security PIN" : "Enter Security PIN")}
                        {step === 4 && "One Last Thing"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {step === 1 && "Enter your mobile number to continue."}
                        {step === 2 && `We've sent a code to +91 ${mobile}`}
                        {step === 3 && (isNewUser || isOtpVerified ? "Create a 4-digit PIN for your account." : "Enter your 4-digit PIN to access your account.")}
                        {step === 4 && "What should we call you?"}
                    </p>
                </div>

                <div className="space-y-6">
                    {step === 1 && (
                        <form onSubmit={handleMobileSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        <span className="text-gray-400 font-medium">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                                        placeholder="9876543210"
                                        maxLength={10}
                                        className="w-full p-3 pl-20 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <Button isLoading={isLoading} text="Continue" />
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                             <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Enter OTP</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        placeholder="123456"
                                        maxLength={6}
                                        className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 text-center tracking-[0.5em] font-mono text-lg"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <Button isLoading={isLoading} text="Verify OTP" />
                            <div className="mt-4 text-center">
                                <button type="button" onClick={() => setStep(1)} className="text-sm text-yellow-500 hover:text-yellow-400">Change Mobile Number</button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handlePinSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">{isNewUser || isOtpVerified ? 'Set PIN' : 'Enter PIN'}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                        placeholder="••••"
                                        maxLength={4}
                                        className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 text-center tracking-[0.5em] font-mono text-lg"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <Button isLoading={isLoading} text={isNewUser || isOtpVerified ? "Set PIN" : "Login"} />
                             <div className="mt-4 text-center">
                                <button type="button" onClick={() => setStep(1)} className="text-sm text-yellow-500 hover:text-yellow-400">Back</button>
                            </div>
                        </form>
                    )}

                    {step === 4 && (
                        <form onSubmit={handleNameSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150"
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <Button isLoading={isLoading} text="Complete Setup" />
                        </form>
                    )}

                    {error && (<div className="p-3 bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-xl text-center">{error}</div>)}
                    {isSuccess && (<div className="p-3 bg-green-900/50 border border-green-500 text-green-300 text-sm rounded-xl flex items-center justify-center gap-2"><Sparkles className="w-5 h-5" />Success! Redirecting...</div>)}
                </div>
            </div>
        </div>
    );
};

const Button = ({ isLoading, text }: { isLoading: boolean, text: string }) => (
    <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
    >
        {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : (
            <>
                {text} <ArrowRight className="w-4 h-4" />
            </>
        )}
    </button>
);

export default AuthModal;

