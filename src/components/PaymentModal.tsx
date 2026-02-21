import React, { useState } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSubmit: (upiId: string) => void;
    qrCodeSrc: string; // Path to the QR code image
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSubmit, qrCodeSrc }) => {
    const [upiTransactionId, setUpiTransactionId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!upiTransactionId || upiTransactionId.length !== 12 || !/^[a-zA-Z0-9]+$/.test(upiTransactionId)) {
            setError("Please enter a valid 12-digit UPI Transaction ID.");
            setIsLoading(false);
            return;
        }

        try {
            await onPaymentSubmit(upiTransactionId);
            // Optionally, clear the input and close the modal on success
            setUpiTransactionId('');
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to submit payment. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl bg-gray-900 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,193,7,0.3)] border border-yellow-500/20"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Close">
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2">Complete Your Payment</h2>
                    <p className="text-gray-400 text-md">Scan the QR code and enter your 12-digit UPI Transaction ID.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                        {/* QR Code Section */}
                        <div className="flex-shrink-0 bg-white p-4 rounded-xl shadow-lg">
                            <Image
                                src={qrCodeSrc}
                                alt="UPI QR Code"
                                width={200}
                                height={200}
                                className="rounded-md"
                            />
                        </div>

                        {/* Text and Input Section */}
                        <div className="flex-grow text-center md:text-left space-y-4">
                            <p className="text-lg text-white font-semibold">
                                Please pay via UPI using the QR code above.
                            </p>
                            <p className="text-md text-gray-300">
                                After successful payment, enter the 12-digit UPI Transaction ID in the field below.
                            </p>
                            
                            <div>
                                <label htmlFor="upiId" className="sr-only">UPI Transaction ID</label>
                                <input
                                    type="text"
                                    id="upiId"
                                    value={upiTransactionId}
                                    onChange={(e) => setUpiTransactionId(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12))}
                                    placeholder="Enter 12-digit UPI Transaction ID"
                                    maxLength={12}
                                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition duration-150 text-center font-mono text-lg"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-900/50 border border-red-500 text-red-300 text-sm rounded-xl text-center mb-4">
                            {error}
                        </div>
                    )}

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
                                Submit Payment <Check className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;
