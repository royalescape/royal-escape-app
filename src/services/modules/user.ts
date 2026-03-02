import { DashboardData, Transaction } from "@/types";
import { request, mockApiCall } from "../core";

export const userService = {
    getDashboardOverview: async (): Promise<DashboardData> => {
        const response = await request<DashboardData>('/auth/me/dashboard', { method: 'GET' });
        return response;
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
