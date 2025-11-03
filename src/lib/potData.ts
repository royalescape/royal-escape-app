// lib/potData.ts (Refined Royal Escape Version)

import { Laptop, Coins, Plane, Watch, Hotel, Sparkles } from "lucide-react";

// --- Type Definitions ---
export interface FAQItem {
    question: string;
    answer: string;
}

export interface MerchItem {
    id: number;
    name: string;
    price: number;
    image: string;
    costAfterCoupon: number;
}

export interface PotItem {
    id: number;
    category: "gold" | "luxury" | "maldives" | "macbook" | "watch";
    type: "Electronics" | "Travel" | "Financial";
    name: string;
    description: string;
    prizeValue: string;
    totalSlots: number;
    filled: number;
    remaining: number;
    daysLeft: number;
    endDate: string;
    status: string;
    prizeDetails: string[];
    gallery: string[];
    merchList: MerchItem[];
    faqs: FAQItem[];
    termsAndConditions: string[];
    color: string;
}

// --- Constants ---
export const COUPON_PRICE = 499;

// --- Pots Data ---
export const potData: PotItem[] = [
    {
        id: 1,
        category: "macbook",
        type: "Electronics",
        name: "MacBook Air M3",
        description:
            "The newest MacBook Air M3 delivers exceptional performance, lightweight design, and all-day battery life — perfect for creators and professionals.",
        prizeValue: "₹1,24,900",
        totalSlots: 200,
        filled: 120,
        remaining: 80,
        daysLeft: 13,
        endDate: "2024-11-15",
        status: "Active",
        prizeDetails: [
            "13.6-inch Liquid Retina Display",
            "Apple M3 chip with 8-core CPU",
            "256GB SSD storage",
            "Midnight finish with MagSafe",
        ],
        gallery: [
            "/images/macbook_air_m3_1.png",
            "/images/macbook_air_m3_2.png",
            "/images/macbook_air_m3_3.png",
        ],
        merchList: [
            {
                id: 1,
                name: "Royal Key Chain",
                price: 249,
                image: "/images/key_chain.png",
                costAfterCoupon: 0,
            },
        ],
        faqs: [
            {
                question: "How many entries can I purchase?",
                answer:
                    "You can purchase up to 5 entries per user to ensure fair participation.",
            },
            {
                question: "When will the winner be announced?",
                answer:
                    "The draw for this pot closes on November 15, 2024, and the winner will be announced within 24 hours.",
            },
        ],
        termsAndConditions: [
            "Each entry purchased is non-refundable once confirmed.",
            "Winners will be contacted via their registered email within 24 hours of the draw.",
            "The MacBook Air M3 will be delivered within 15 business days.",
            "Royal Escape reserves the right to substitute an equivalent model if unavailable.",
        ],
        color: "#6366F1", // Indigo accent
    },
    {
        id: 4,
        category: "watch",
        type: "Electronics",
        name: "Apple Watch Ultra 2",
        description:
            "Engineered for adventure, endurance, and fitness. The Apple Watch Ultra 2 features a titanium case, precision dual-frequency GPS, and an ultra-bright display.",
        prizeValue: "₹89,900",
        totalSlots: 180,
        filled: 135,
        remaining: 45,
        daysLeft: 10,
        endDate: "2024-11-12",
        status: "Active",
        prizeDetails: [
            "49mm Titanium Case with Ocean Band",
            "S9 SiP chip for enhanced performance",
            "36-hour battery life",
            "Precision dual-frequency GPS",
        ],
        gallery: [
            "/images/apple_watch_ultra_2_1.png",
            "/images/apple_watch_ultra_2_2.png",
            "/images/apple_watch_ultra_2_3.png",
        ],
        merchList: [
            {
                id: 1,
                name: "Adventure Mug",
                price: 299,
                image: "/images/adventure_mug.png",
                costAfterCoupon: 0,
            },
        ],
        faqs: [
            {
                question: "Is this the latest model?",
                answer:
                    "Yes, this is the 2024 Apple Watch Ultra 2, the latest model available.",
            },
            {
                question: "Are the accessories included?",
                answer:
                    "Yes, the watch comes with the standard Apple accessories and the Ocean Band.",
            },
        ],
        termsAndConditions: [
            "Limited to 5 entries per user.",
            "Prize includes the official retail box and accessories.",
            "Winner must confirm delivery address within 3 days of announcement.",
            "In case of stock unavailability, a voucher of equal value will be provided.",
        ],
        color: "#4ADE80", // Emerald accent
    },
    {
        id: 2,
        category: "gold",
        type: "Financial",
        name: "Gold Coin 10g",
        description:
            "A 24K certified 10-gram gold coin — a timeless symbol of prosperity and luck.",
        prizeValue: "₹71,000",
        totalSlots: 150,
        filled: 90,
        remaining: 60,
        daysLeft: 8,
        endDate: "2024-11-10",
        status: "Active",
        prizeDetails: [
            "10g of 24K certified gold",
            "Hallmarked and BIS-certified",
            "Comes in a secure tamper-proof packaging",
        ],
        gallery: [
            "/images/gold_coin_1.png",
            "/images/gold_coin_2.png",
            "/images/gold_coin_3.png",
        ],
        merchList: [
            {
                id: 1,
                name: "Royal Pouch",
                price: 199,
                image: "/images/royal_pouch.png",
                costAfterCoupon: 0,
            },
        ],
        faqs: [
            {
                question: "Is the gold coin hallmarked?",
                answer:
                    "Yes, it is 24K BIS-certified gold with hallmark verification.",
            },
            {
                question: "How is the winner selected?",
                answer:
                    "A random draw is conducted transparently using certified draw software.",
            },
        ],
        termsAndConditions: [
            "Gold purity and hallmark certification are verified by BIS.",
            "Royal Escape is not responsible for market fluctuations in gold value.",
            "The coin will be delivered securely via insured courier.",
        ],
        color: "#FFD700", // Gold accent
    },
    {
        id: 3,
        category: "luxury",
        type: "Travel",
        name: "Luxury Staycation",
        description:
            "Enjoy a two-night stay at a 5-star resort with premium amenities, gourmet dining, and spa indulgence — perfect for a relaxing getaway.",
        prizeValue: "₹1,10,000",
        totalSlots: 220,
        filled: 160,
        remaining: 60,
        daysLeft: 18,
        endDate: "2024-11-20",
        status: "Active",
        prizeDetails: [
            "2-night stay at a 5-star resort",
            "Breakfast & dinner included",
            "Couple spa session & private pool access",
        ],
        gallery: [
            "/images/luxury_staycation_1.png",
            "/images/luxury_staycation_2.png",
            "/images/luxury_staycation_3.png",
        ],
        merchList: [
            {
                id: 1,
                name: "Travel Kit",
                price: 399,
                image: "/images/travel_kit.png",
                costAfterCoupon: 0,
            },
        ],
        faqs: [
            {
                question: "Which locations are available?",
                answer:
                    "The staycation is redeemable at select 5-star partner properties across India.",
            },
            {
                question: "Is travel included?",
                answer:
                    "Travel to the destination is not included in the prize. Accommodation and meals are covered.",
            },
        ],
        termsAndConditions: [
            "Stay must be availed within 6 months of winning.",
            "Reservation dates are subject to availability.",
            "Non-transferable and cannot be redeemed for cash.",
        ],
        color: "#F97316", // Orange accent
    },
    {
        id: 5,
        category: "maldives",
        type: "Travel",
        name: "Maldives Escape",
        description:
            "A 4-day, 3-night luxury escape to the Maldives — turquoise waters, private villas, and unforgettable experiences await.",
        prizeValue: "₹3,75,000",
        totalSlots: 300,
        filled: 210,
        remaining: 90,
        daysLeft: 25,
        endDate: "2024-11-27",
        status: "Active",
        prizeDetails: [
            "4D/3N stay in an overwater villa",
            "Round-trip airfare for two",
            "All-inclusive meals and activities",
            "Private sunset cruise experience",
        ],
        gallery: [
            "/images/maldives_escape_1.png",
            "/images/maldives_escape_2.png",
            "/images/maldives_escape_3.png",
        ],
        merchList: [
            {
                id: 1,
                name: "Beach Tote Bag",
                price: 299,
                image: "/images/beach_tote.png",
                costAfterCoupon: 0,
            },
        ],
        faqs: [
            {
                question: "Are flights included?",
                answer:
                    "Yes, round-trip airfare for two passengers from India is included in the prize.",
            },
            {
                question: "Can I extend my stay?",
                answer:
                    "Yes, winners can extend their stay at their own expense, subject to resort availability.",
            },
        ],
        termsAndConditions: [
            "Prize includes airfare, accommodation, and meals for two.",
            "Winner must hold a valid passport with at least 6 months validity.",
            "Travel must be completed within 12 months of winning.",
            "Royal Escape is not responsible for visa processing or travel restrictions.",
        ],
        color: "#22D3EE", // Cyan accent
    },
];

// --- Helper Functions ---

// Get a single pot by its ID
export const getPotData = (id: number) => {
    return potData.find((p) => p.id === id);
};

// Get pots filtered by type (Electronics, Travel, Financial)
export const getPotsByType = (type: PotItem["type"]) => {
    return potData.filter((p) => p.type === type);
};
