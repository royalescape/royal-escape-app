import { User } from "@/types";
import { mockApiCall } from "../core";

export const authService = {
    login: async (email: string): Promise<User> => {
        // Mock login - just return a user object
        const user: User = {
            id: 1,
            name: email.split('@')[0], // Derive name from email for mock
            email: email,
            walletBalance: 0,
            role: 'user',
            status: 'active'
        };
        return mockApiCall(user);
    },

    register: async (name: string, email: string): Promise<User> => {
            // Mock registration
            const user: User = {
            id: Math.floor(Math.random() * 10000),
            name,
            email,
            walletBalance: 0,
            role: 'user',
            status: 'active'
        };
        return mockApiCall(user);
    },

    logout: async (): Promise<void> => {
        return mockApiCall(undefined);
    }
};
