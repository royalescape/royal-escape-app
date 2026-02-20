import { User, Transaction } from "@/types";
import { mockApiCall } from "../core";

export const userService = {
    getProfile: async (userId: string): Promise<User> => {
            // Mock user profile fetch
            const mockUser: User = {
            id: userId,
            name: "Rohan Doshi",
            email: "rohan@example.com",
            mobile: "9876543210", // Added mobile
            walletBalance: 156,
            totalEntries: 8,
            totalWinnings: 0,
            role: 'user',
            status: 'active',
            registrationDate: "2024-01-01"
        };
        return mockApiCall(mockUser);
    },
    
    updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
        // Mock update profile
        return mockApiCall({ ...data, id: userId } as User);
    },

    getDashboardStats: async (userId: string) => {
        // Mock dashboard stats
        const stats = {
            activeEntries: 5,
            totalSpent: 1245,
            totalWinnings: 0,
            walletBalance: 156,
            totalTickets: 8
        };
        return mockApiCall(stats);
    },

    getTransactions: async (userId: string): Promise<Transaction[]> => {
            // Mock transactions
            const transactions: Transaction[] = [
            { id: '5001', userId, type: 'spend', amount: -249, date: '2024-10-25', status: 'success', description: 'MacBook Air M3 Entry' },
            { id: '5003', userId, type: 'deposit', amount: 500, date: '2024-10-20', status: 'success', description: 'Added funds' },
            { id: '5004', userId, type: 'spend', amount: -249, date: '2024-10-20', status: 'success', description: 'Gold Coin Entry' },
        ];
        return mockApiCall(transactions);
    }
};
