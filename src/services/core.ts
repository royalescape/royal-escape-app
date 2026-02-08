// Shared utilities for API services

export const MOCK_DELAY = 500; // Simulate network latency

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const AUTH_TOKEN_KEY = 'royal_escape_auth_token';

export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
};

export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
};

export const clearAuthToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    }
};

export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}

export const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { params, ...init } = options;
    
    // Ensure endpoint starts with / if not present
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${API_BASE_URL}${normalizedEndpoint}`;
    
    if (params) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }

    const token = getAuthToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...init.headers as Record<string, string>,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...init,
        headers,
    });

    if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
            // Ignore JSON parse error, use default message
            errorMessage = response.statusText || errorMessage;
        }
        throw new ApiError(response.status, errorMessage);
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
};

export const mockApiCall = <T>(data: T, delay = MOCK_DELAY): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};
