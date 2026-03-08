"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BaseLayout from "@/components/BaseLayout";
import MyPersonalInfo from "@/components/MyPersonalInfo";
import { User } from '@/types';
import { api } from '@/services/api';
import Loader from "@/components/Loader";

export default function PersonalInfoPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem('royalEscapeUser');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser) as User;
                    setUser(parsedUser);
                    // Optionally re-fetch user data to ensure it's up-to-date
                    const fetchedUser = await api.auth.me();
                    setUser(fetchedUser);
                } else {
                    router.push('/'); // Redirect to home if no user is logged in
                }
            } catch (error) {
                console.error("Failed to fetch or parse user from localStorage or API:", error);
                localStorage.removeItem('royalEscapeUser');
                router.push('/'); // Redirect to home on error
            } finally {
                setIsLoadingUser(false);
            }
        };

        fetchUser();
    }, [router]);

    if (isLoadingUser || !user) {
        return <Loader />;
    }

    return (
        <BaseLayout user={user} setUser={setUser} isNavigating={isNavigating} setIsNavigating={setIsNavigating}>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
                <MyPersonalInfo user={user} />
            </div>
        </BaseLayout>
    );
}
