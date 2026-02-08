import { User } from "@/types";
import { request, setAuthToken, clearAuthToken, mockApiCall } from "../core";

export const authService = {
    checkMobile: async (mobile: string): Promise<{ exists: boolean; pin_required: boolean; otp_required: boolean }> => {
        return request<{ exists: boolean; pin_required: boolean; otp_required: boolean }>('/auth/check-user', {
            method: 'POST',
            body: JSON.stringify({ phone: mobile.startsWith('+91') ? mobile : `+91${mobile}` }),
        });
    },

    loginWithPin: async (mobile: string, pin: string): Promise<{ access_token: string }> => {
        const response = await request<{ access_token: string }>('/auth/login-pin', {
            method: 'POST',
            body: JSON.stringify({ phone: mobile.startsWith('+91') ? mobile : `+91${mobile}`, pin }),
        });
        if (response.access_token) {
            setAuthToken(response.access_token);
        }
        return response;
    },

    sendOtp: async (mobile: string): Promise<{ success: boolean; message: string }> => {
        return request<{ success: boolean; message: string }>('/auth/otp/send', {
            method: 'POST',
            body: JSON.stringify({ phone: mobile.startsWith('+91') ? mobile : `+91${mobile}` }),
        });
    },

    validateOtp: async (mobile: string, otp: string): Promise<{ registration_token?: string }> => {
        const response = await request<{ registration_token?: string }>('/auth/otp/verify', {
            method: 'POST',
            body: JSON.stringify({ phone: mobile.startsWith('+91') ? mobile : `+91${mobile}`, otp }),
        });
        const token = response.registration_token;
        console.log('token', token);
        if (token) {
            setAuthToken(token);
        }
        return response;
    },

    me: async (): Promise<User> => {
        return request<User>('/auth/me', {
            method: 'GET',
        });
    },

    setPin: async (pin: string): Promise<{ success: boolean; message: string }> => {
        return request<{ success: boolean; message: string }>('/auth/set-pin', {
            method: 'POST',
            body: JSON.stringify({ pin }),
        });
    },

    register: async (name: string, mobile: string, pin: string): Promise<User> => {
        // Mock register response
        const mockUser: User = {
            id: Math.floor(Math.random() * 10000),
            name: name,
            mobile: mobile.startsWith('+91') ? mobile : `+91${mobile}`,
            email: "user@example.com",
            walletBalance: 0,
            status: 'active',
            role: 'user',
            registrationDate: new Date().toISOString()
        };
        return mockApiCall(mockUser);
    },

    logout: async (): Promise<void> => {
        clearAuthToken();
        if (typeof window !== 'undefined') {
            localStorage.removeItem('royalEscapeUser');
        }
        return Promise.resolve();
    }
};
