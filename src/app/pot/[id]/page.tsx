// src/app/pot/[id]/page.tsx
// This is a SERVER COMPONENT (no "use client" directive)
import React from 'react';
import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import PotClient from './PotClient'; // Import the Client Component

// 1. Static Generation Function (Server Only)
// Note: In a real dynamic API scenario with frequent updates, you might switch to dynamic rendering 
// or use revalidation. For now, we'll keep static generation but fetch from our "API".
export async function generateStaticParams() {
    const pots = await api.pots.getAll();
    return pots.map((pot) => ({
        // IDs must be returned as strings
        id: pot.id,
    }));
}

// 2. Main Server Component
export default async function PotPage({ params }: { params: { id: string } }) {
    // 1. Fetch current pot data
    const pot = await api.pots.getById(params.id);

    if (!pot) {
        notFound();
    }

    // 2. Fetch all related pots based on the pot's new 'type'
    const relatedPots = await api.pots.getByType(pot.type);

    // Render the Client Component and pass the fetched data as a prop
    return (
        <PotClient pot={pot} relatedPots={relatedPots} />
    );
}
