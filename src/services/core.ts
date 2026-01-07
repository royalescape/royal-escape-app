// Shared utilities for API services

export const MOCK_DELAY = 500; // Simulate network latency

export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

export const mockApiCall = <T>(data: T, delay = MOCK_DELAY): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};
