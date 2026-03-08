"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { User } from '@/types'; // Import User type

// Define props for FAQSection
interface FAQSectionProps {
    user: User | null;
    openAuthModal: (mode: 'signin' | 'signup') => void;
}

const faqs = [
    {
        question: "1. Is Royal Escape legal?",
        answer: "Yes. Royal Escape operates as a **promotional contest model** where participants enter by purchasing an entry pass. It is not a lottery or betting platform."
    },
    {
        question: "2. Is this gambling or betting?",
        answer: "No.\nThere are **no odds, predictions, or betting mechanics involved**. Participants simply purchase an entry pass to participate in a promotional draw."
    },
    {
        question: "3. How does the pot system work?",
        answer: "Each contest pot has a **fixed number of entry slots.**\nParticipants buy entry passes to fill the pot. Once all slots are filled, a **live draw is conducted to select the winner.**"
    },
    {
        question: "4. What happens if I don’t win?",
        answer: "The entry pass fee is a **participation fee**, similar to entering a contest or event.\nIt does not guarantee winning."
    },
    {
        question: "5. How is the winner selected?",
        answer: "The winner is selected through a **transparent live draw** conducted after the pot is completely filled."
    },
    {
        question: "6. What does the Goa trip include?",
        answer: "The winner receives a **Goa travel package**, which includes travel arrangements and accommodation stay.\nComplete details will be shared with the winner after the draw."
    },
    {
        question: "7. What does the Iphone dream include?",
        answer: "The winner receives the latest Iphone 17 Pro from Apple."
    },
    {
        question: "8. Are the winners real?",
        answer: "Yes. Previous winners and draw highlights are shared on the Royal Escape social channels"
    },
    {
        question: "9. Is my payment secure?",
        answer: "Yes.\nAll payments are processed through a **secure payment gateway** on the official platform.\nRoyal Escape does not accept payments through WhatsApp or unofficial channels."
    },
    {
        question: "10. Can I participate multiple times?",
        answer: "Yes. Participants may purchase multiple entry passes if available in the pot.\nEach entry pass counts as one participation slot."
    },
    {
        question: "11. Can Royal Escape cancel a pot?",
        answer: "In rare operational situations, Royal Escape reserves the right to cancel or modify a pot.\nParticipants will be notified accordingly."
    },
];
export default function FAQSection({ user, openAuthModal }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleFAQ = (index: number) => {
        if (!user) {
            openAuthModal('signin');
            return;
        }
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleViewAllClick = () => {
        if (!user) {
            openAuthModal('signin');
        } else {
            setIsModalOpen(true);
        }
    };

    // Show only first 4 FAQs on homepage
    const previewFaqs = faqs.slice(0, 4);

    // Helper function to parse markdown-style bold (**text**) and apply styling
    const parseAnswer = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the asterisks and apply the highlight class
                const content = part.slice(2, -2);
                return (
                    <span key={index} className="font-semibold">
                        {content}
                    </span>
                );
            }
            return (
                <span key={index}>
                    {part.split('\n').map((line, i, arr) => (
                        <span key={i}>
                            {line}
                            {i < arr.length - 1 && <br />}
                        </span>
                    ))}
                </span>
            );
        });
    };

    return (
        <>
            {/* Compact FAQ Section on Homepage */}
            <section
                className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-16 px-4 md:px-12"
                id="faq"
            >
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
                        Frequently asked{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>

                    <div className="space-y-5">
                        {previewFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                layout
                                transition={{ layout: { duration: 0.4, type: "spring" } }}
                                className={`border border-gray-700 rounded-2xl transition-all duration-300 shadow-md hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${openIndex === index ? "bg-white/5" : "bg-transparent"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 py-5 flex justify-between items-center"
                                >
                                    <span className="font-semibold text-lg">{faq.question}</span>
                                    <motion.span
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-yellow-400 text-2xl font-bold"
                                    >
                                        ▼
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed">
                                                {parseAnswer(faq.answer)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={handleViewAllClick}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 text-lg"
                        >
                            <span>View All FAQs</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Full-Screen Modal */}
            <AnimatePresence>
                {isModalOpen && user && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-gray-900 via-gray-950 to-black rounded-3xl shadow-2xl border border-yellow-500/30 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-900/95 to-gray-950/95 backdrop-blur-xl border-b border-gray-700/50 px-8 py-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                        All FAQs
                                    </h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="group p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-yellow-500/50 transition-all duration-300"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-6 h-6 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="overflow-y-auto max-h-[calc(90vh-100px)] px-8 py-6">
                                <div className="space-y-5">
                                    {faqs.map((faq, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            layout
                                            className={`border border-gray-700 rounded-2xl transition-all duration-300 shadow-md hover:shadow-yellow-500/10 hover:border-yellow-500/50 ${openIndex === index ? "bg-white/5" : "bg-transparent"
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleFAQ(index)}
                                                className="w-full text-left px-6 py-5 flex justify-between items-center"
                                            >
                                                <span className="font-semibold text-lg text-white pr-4">
                                                    {faq.question}
                                                </span>
                                                <motion.span
                                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-yellow-400 text-2xl font-bold flex-shrink-0"
                                                >
                                                    ▼
                                                </motion.span>
                                            </button>

                                            <AnimatePresence>
                                                {openIndex === index && (
                                                    <motion.div
                                                        key="content"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                    >
                                                        <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed">
                                                            {parseAnswer(faq.answer)}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Modal Footer */}
                                <div className="text-center mt-8 pb-4">
                                    <p className="text-gray-400 text-sm mb-4">Still have questions?</p>
                                    <a
                                        href="mailto:supportgroup@royalescape.club"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/30 rounded-xl text-yellow-400 font-semibold hover:bg-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300"
                                    >
                                        Contact Support
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}