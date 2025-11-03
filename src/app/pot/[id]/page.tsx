// src/app/pot/[id]/page.tsx
// This is a SERVER COMPONENT (no "use client" directive)
import React from 'react';
import { notFound } from 'next/navigation';
import { getPotData, potData, getPotsByType } from "@/lib/potData";
import PotClient from './PotClient'; // Import the Client Component

// 1. Static Generation Function (Server Only)
export async function generateStaticParams() {
    return potData.map((pot) => ({
        // IDs must be returned as strings
        id: String(pot.id),
    }));
}

// 2. Main Server Component
export default function PotPage({ params }: { params: { id: string } }) {
    // 1. Fetch current pot data
    const pot = getPotData(Number(params.id));

    if (!pot) {
        notFound();
    }

    // 2. Fetch all related pots based on the pot's new 'type'
    const relatedPots = getPotsByType(pot.type);

    // Render the Client Component and pass the fetched data as a prop
    return (
        <PotClient pot={pot} relatedPots={relatedPots} />
    );
}