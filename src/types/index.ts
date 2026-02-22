export interface FAQItem {
    question: string;
    answer: string;
}

export interface MerchItem {
    id: string;
    name: string;
    price: number;
    image: string;
    costAfterCoupon: number;
}

export type PotType = "electronics" | "travel" | "financial" | "default";
export type PotStatus = 'active' | 'upcoming' | 'completed' | 'cancelled' | 'ending-soon';

export interface PotInfoResponse {
    id: string;
    description: string;
    name: string;
    prize_amount: number;
    type: string;
}

export interface PotInfo {
    id: string;
    description: string;
    name: string;
    prizeValue: string;
    type: PotType;
}
export interface PotItem {
    id: string;
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
    totalEntries?: number; // Added to support Admin view statistics    
    // Detailed fields (optional for list views if needed, but required for detail views)
    prizeDetails?: string[];
    gallery?: string[];
    faqs?: FAQItem[];
    termsAndConditions?: string[];
}

export interface User {
    id?: string; // Optional as it might not be present in simple UserType
    name?: string;
    email?: string;
    phone: string;
    address?: string;
    walletBalance?: number;
    status?: 'active' | 'suspended' | 'pending';
    registrationDate?: string;
    totalEntries?: number;
    totalWinnings?: number;
    role?: 'user' | 'admin' | 'super-admin';
    pinCode?: string;
}

export type View = 'home' | 'personalInfo' | 'myOrders';

export interface Coupon {
    id: string;
    code: string;
    discountType: 'percentage' | 'fixed';
    value: number;
    expiryDate: string;
    usageLimit: number;
    usedCount: number;
    appliesTo: 'global' | 'specific_pot' | 'specific_user';
    targetId?: string;
}

export interface Transaction {
    id: string;
    userId: string;
    type: 'deposit' | 'spend' | 'win' | 'refund' | 'coupon';
    amount: number;
    date: string;
    status: 'success' | 'failed';
    potId?: string;
    description?: string; // Added from MyDashboard
}

export interface SupportTicket {
    id: string;
    userId: string;
    subject: string;
    status: 'open' | 'in-progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    lastUpdated: string;
}

export interface PotApiResponse {
    _id: string;
    name: string;
    description: string;
    entry_price: number;
    max_entries: number;
    prize_amount: number;
    icon: string;
    start_date: string;
    closing_date: string;
    faq: { q: string; a: string; }[];
    terms_and_conditions: string[];
    type: PotType;
    status: PotStatus;
    current_entries: number;
    winner_entry_id: string | null;
    created_at: string;
    updated_at: string;
}
