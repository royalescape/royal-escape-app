import { User, Transaction } from "@/types";
import { mockApiCall } from "../core";

export const userService = {
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
