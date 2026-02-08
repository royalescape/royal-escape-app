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

export type PotCategory = "gold" | "luxury" | "maldives" | "macbook" | "watch";
export type PotType = "Electronics" | "Travel" | "Financial";
export type PotStatus = 'active' | 'upcoming' | 'completed' | 'cancelled' | 'ending-soon';

export interface PotItem {
    id: number;
    category: PotCategory;
    type: PotType;
    name: string;
    icon?: string; // Added to support admin/home view simpler objects
    description: string;
    prizeValue: string;
    totalSlots: number;
    filled: number;
    remaining: number;
    daysLeft: number;
    endDate: string;
    status: string; // Keeping string for flexibility or union PotStatus
    entryFee?: number; // Added from Admin Pot
    maxEntries?: number; // Added from Admin Pot
    revenue?: number; // Added from Admin Pot
    createdDate?: string; // Added from Admin Pot
    drawDate?: string; // Added from Admin Pot
    winner?: string; // Added from Admin Pot
    merchandiseId?: number; // Added from Admin Pot
    totalEntries?: number; // Added to support Admin view statistics
    
    // Detailed fields (optional for list views if needed, but required for detail views)
    prizeDetails?: string[];
    gallery?: string[];
    merchList?: MerchItem[];
    faqs?: FAQItem[];
    termsAndConditions?: string[];
    color?: string;
}

export interface User {
    id?: number; // Optional as it might not be present in simple UserType
    name?: string;
    email?: string;
    mobile: string;
    address?: string;
    walletBalance?: number;
    status?: 'active' | 'suspended' | 'pending';
    registrationDate?: string;
    totalEntries?: number;
    totalWinnings?: number;
    referralCode?: string;
    role?: 'user' | 'admin' | 'super-admin';
}

export type View = 'home' | 'personalInfo' | 'myOrders' | 'myReferrals';

export interface Coupon {
    id: number;
    code: string;
    discountType: 'percentage' | 'fixed';
    value: number;
    expiryDate: string;
    usageLimit: number;
    usedCount: number;
    appliesTo: 'global' | 'specific_pot' | 'specific_user';
    targetId?: number;
}

export interface Transaction {
    id: number;
    userId: number;
    type: 'deposit' | 'spend' | 'win' | 'refund' | 'coupon';
    amount: number;
    date: string;
    status: 'success' | 'failed';
    potId?: number;
    description?: string; // Added from MyDashboard
}

export interface SupportTicket {
    id: number;
    userId: number;
    subject: string;
    status: 'open' | 'in-progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    lastUpdated: string;
}
