import { PotInfo, PotInfoResponse, PotItem, PotType } from "@/types";
import { request } from "../core";

// Helper to map API response to PotItem
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapPot = (pot: any): PotItem => ({
    ...pot,
    id: pot._id || pot.id, // Fallback to existing id if _id is missing
});

const mapPotInfo = (pot: PotInfoResponse): PotInfo => ({
    id: pot.id,
    description: pot.description,
    name: pot.name,
    prizeValue: pot.prize_amount.toString(),
    type: pot.type as PotType
});

export const potService = {
    getAll: async (): Promise<PotItem[]> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pots = await request<any[]>('/pots/all');
        return pots.map(mapPot);
    },
    
    getActive: async (): Promise<PotInfo[]> => {
        const pots = await request<PotInfoResponse[]>('/pots?status=active');
        return pots.map(mapPotInfo);
    },

    getUpcoming: async (): Promise<PotInfo[]> => {
        const pots = await request<PotInfoResponse[]>('/pots?status=upcoming');
        return pots.map(mapPotInfo);
    },

    getById: async (id: string): Promise<PotItem | undefined> => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pot = await request<any>(`/pots/${id}`);
            return mapPot(pot);
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            // Return undefined if not found, to match previous behavior
            if (error.statusCode === 404) return undefined;
            throw error;
        }
    },

    getByType: async (type: PotType): Promise<PotInfo[]> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pots = await request<any[]>(`/pots`, { params: { type } });
        return pots.map(mapPotInfo);
    },
};
