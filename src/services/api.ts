// src/services/api.ts
import { potService } from './modules/pots';
import { userService } from './modules/user';
import { authService } from './modules/auth';

// --- API Service Aggregator ---
export const api = {
    pots: potService,
    user: userService,
    auth: authService,
};

// Re-export common types or utilities if needed
export * from './core';
