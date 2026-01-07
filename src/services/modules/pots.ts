import { PotItem } from "@/types";
import { potData } from "@/lib/potData";
import { mockApiCall } from "../core";

export const potService = {
    getAll: async (): Promise<PotItem[]> => {
        return mockApiCall(potData);
    },
    
    getActive: async (): Promise<PotItem[]> => {
        const activePots = potData.filter(p => p.status === 'Active');
        return mockApiCall(activePots);
    },

    getUpcoming: async (): Promise<PotItem[]> => {
        const upcomingPots = potData.filter(p => p.status === 'Upcoming');
        return mockApiCall(upcomingPots);
    },

    getById: async (id: number): Promise<PotItem | undefined> => {
        const pot = potData.find(p => p.id === id);
        return mockApiCall(pot);
    },

    getByType: async (type: PotItem["type"]): Promise<PotItem[]> => {
        const pots = potData.filter(p => p.type === type);
        return mockApiCall(pots);
    },
};
