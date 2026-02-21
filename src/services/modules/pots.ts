import { PotApiResponse, PotInfo, PotInfoResponse, PotItem, PotType } from "@/types";
import { request } from "../core";

const mapPotApiResponseToPotItem = (apiResponse: PotApiResponse): PotItem => {
    const closingDate = new Date(apiResponse.closing_date);
    const currentDate = new Date();
    const diffTime = closingDate.getTime() - currentDate.getTime();
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    return {
        id: apiResponse._id,
        name: apiResponse.name,
        description: apiResponse.description,
        type: apiResponse.type,
        icon: apiResponse.icon,
        prizeValue: apiResponse.prize_amount.toLocaleString('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
        totalSlots: apiResponse.max_entries,
        filled: apiResponse.current_entries,
        remaining: apiResponse.max_entries - apiResponse.current_entries,
        daysLeft: diffDays,
        endDate: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(closingDate),
        status: apiResponse.status,
        entryFee: apiResponse.entry_price,
        maxEntries: apiResponse.max_entries,
        faqs: apiResponse.faq.map(item => ({ question: item.q, answer: item.a })),
        termsAndConditions: apiResponse.terms_and_conditions,
    };
};

const mapPotInfo = (pot: PotInfoResponse): PotInfo => ({
    id: pot.id,
    description: pot.description,
    name: pot.name,
    prizeValue: pot.prize_amount.toLocaleString('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    type: pot.type as PotType
});

export const potService = {
    getAll: async (): Promise<PotItem[]> => {
        const pots = await request<PotApiResponse[]>('/pots/all');
        return pots.map(mapPotApiResponseToPotItem);
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
            const pot = await request<PotApiResponse>(`/pots/${id}`);
            return mapPotApiResponseToPotItem(pot);
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
