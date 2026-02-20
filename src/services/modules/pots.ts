import { PotItem } from "@/types";
import { request } from "../core";

// Helper to map API response to PotItem
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapPot = (pot: any): PotItem => ({
    ...pot,
    id: pot._id || pot.id, // Fallback to existing id if _id is missing
});

export const potService = {
    getAll: async (): Promise<PotItem[]> => {
        const pots = await request<any[]>('/pots/all');
        return pots.map(mapPot);
    },
    
    getActive: async (): Promise<PotItem[]> => {
        const pots = await request<any[]>('/pots?status=active');
        return pots.map(mapPot);
    },

    getUpcoming: async (): Promise<PotItem[]> => {
        const pots = await request<any[]>('/pots/status=upcoming');
        return pots.map(mapPot);
    },

    getById: async (id: string): Promise<PotItem | undefined> => {
        try {
            const pot = await request<any>(`/pots/${id}`);
            return mapPot(pot);
        } catch (error: any) {
            // Return undefined if not found, to match previous behavior
            if (error.statusCode === 404) return undefined;
            throw error;
        }
    },

    getByType: async (type: PotItem["type"]): Promise<PotItem[]> => {
        const pots = await request<any[]>(`/pots`, { params: { type } });
        return pots.map(mapPot);
    },
};
