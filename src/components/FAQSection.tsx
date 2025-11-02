"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const faqs = [
    {
        question: "1. How does Royal Escape work?",
        answer: "Royal Escape is a luxury reward platform where you purchase an entry into a prize draw and receive a merchandise gift. The flow is simple: **1. Choose** one of the 10 Live Luxury Pots you wish to win. **2. Pay** the entry fee of **₹249**. **3. Select** your free or discounted merchandise gift to complete the purchase. You are then entered into the draw."
    },
    {
        question: "2. What is the fixed cost of an entry?",
        answer: "The entry fee for any single Live Luxury Pot is fixed at **₹249**. This payment covers your entry into the specific draw and doubles as a **₹249 coupon** to be used immediately towards your merchandise selection."
    },
    {
        question: "3. What do I receive with my ₹249 Entry Ticket?",
        answer: "Your ₹249 purchase secures two things: **1. One unique entry** into the specific Luxury Pot draw you selected. **2. A ₹249 coupon** that you must apply to a merch item. This makes our base merchandise items free, or provides a significant discount on premium items."
    },
    {
        question: "4. How does the Free/Discounted Merch Gift work?",
        answer: "Your ₹249 entry acts as a coupon applied instantly to the merchandise: **Free Items:** Merch priced at ₹249 or less is free (₹0 additional cost). **Discounted Items:** For premium merch (e.g., a hoodie priced at ₹1499), you only pay the additional amount above the coupon value (e.g., ₹1499 - ₹249 = ₹1250 additional cost)."
    },
    {
        question: "5. Can I buy entries for multiple pots?",
        answer: "Yes, absolutely! You can purchase multiple entry tickets by selecting different Live Pots. Each separate ₹249 entry ticket gives you one unique chance to win the corresponding prize, increasing your overall odds across the draws."
    },
    {
        question: "6. How are the winners of the luxury pots selected?",
        answer: "Winners are selected through a transparent and verifiable random draw system. Every entry is assigned a unique ticket number, and winners are drawn fairly using a verified selection process. All draws are conducted with complete transparency."
    },
    {
        question: "7. What prizes are currently available to win?",
        answer: "Our 10 Live Luxury Pots are prominently displayed on the homepage. Prizes typically include high-value items like MacBooks, all-inclusive luxury trips (Maldives, Dubai), Gold Coins, the latest iPhones, and other premium rewards. The value of each pot is clearly listed."
    },
    {
        question: "8. Is this legal and safe?",
        answer: "Yes, Royal Escape operates legally. The core transaction is the purchase of a product (the merchandise gift, acquired via the coupon/entry fee), and the entry into the luxury reward draw is given as an associated promotional offer. We adhere to all regulatory requirements and ensure complete transparency."
    },
    {
        question: "9. How will I know if I win?",
        answer: "Winners are notified immediately via **email, phone, and SMS**. We also announce winners publicly on our social media platforms and website. You will receive detailed, personal instructions on how to securely claim your prize within 24 hours of the draw."
    },
    {
        question: "10. What is the delivery time for the merchandise I select?",
        answer: "Merchandise is typically processed within 48 hours of your entry purchase and delivered within **5-7 business days** within India. You will receive a tracking number via email once your order has been shipped."
    }
];
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Show only first 4 FAQs on homepage
    const previewFaqs = faqs.slice(0, 4);

    return (
        <>
            {/* Compact FAQ Section on Homepage */}
            <section
                className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white py-16 px-4 md:px-12"
                id="faq"
            >
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>

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
                                            <div
                                                className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
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
                            onClick={() => setIsModalOpen(true)}
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
                {isModalOpen && (
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
                                                        <div
                                                            className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed"
                                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                        />
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
                                        href="mailto:support@royalescape.club"
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