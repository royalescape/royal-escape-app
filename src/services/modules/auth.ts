import { User } from "@/types";
import { request, setAuthToken, clearAuthToken } from "../core";

export const authService = {
    checkMobile: async (mobile: string): Promise<{ exists: boolean; registeration_required: boolean }> => {
        return request<{ exists: boolean; registeration_required: boolean }>('/auth/check-user', {
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

    register: async (name: string, phone: string, pin: string): Promise<User> => {
        const response = await request<{ message: string; token: string }>('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
                phone: phone.startsWith('+91') ? phone : `+91${phone}`,
                pin
            }),
        });

        if (response.token) {
            setAuthToken(response.token);
        }

        return authService.me();
    },

    logout: async (): Promise<void> => {
        clearAuthToken();
        if (typeof window !== 'undefined') {
            localStorage.removeItem('royalEscapeUser');
        }
        return Promise.resolve();
    }
};
