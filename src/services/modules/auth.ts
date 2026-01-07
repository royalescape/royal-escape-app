import { User } from "@/types";
import { mockApiCall } from "../core";

export const authService = {
    checkMobile: async (mobile: string): Promise<{ exists: boolean; name?: string }> => {
        // Mock check if mobile exists
        if (mobile === "9876543210") {
             return mockApiCall({ exists: true, name: "Rohan Doshi" });
        }
        return mockApiCall({ exists: false });
    },

    loginWithPin: async (mobile: string, pin: string): Promise<User> => {
        // Mock login with PIN
        if (pin === "1234") {
             const user: User = {
                id: 1,
                name: "Rohan Doshi",
                email: "rohan@example.com",
                mobile: mobile,
                walletBalance: 0,
                role: 'user',
                status: 'active'
            };
            return mockApiCall(user);
        }
        throw new Error("Invalid PIN");
    },

    sendOtp: async (mobile: string): Promise<{ success: boolean; message: string }> => {
        // Mock send OTP
        console.log(`Sending OTP to ${mobile}`);
        return mockApiCall({ success: true, message: "OTP sent successfully" });
    },

    validateOtp: async (mobile: string, otp: string): Promise<{ success: boolean }> => {
        // Mock validate OTP
        if (otp === "1234") {
            return mockApiCall({ success: true });
        }
        throw new Error("Invalid OTP");
    },

    register: async (name: string, mobile: string, pin: string): Promise<User> => {
            // Mock registration
            const user: User = {
            id: Math.floor(Math.random() * 10000),
            name,
            email: "", // Email is optional now, but initializing as empty string or undefined if needed
            mobile,
            walletBalance: 0,
            role: 'user',
            status: 'active'
        };
        // In a real app, you'd save the PIN here too
        console.log(`Registered ${name} with mobile ${mobile} and PIN ${pin}`);
        return mockApiCall(user);
    },

    logout: async (): Promise<void> => {
        return mockApiCall(undefined);
    }
};
