"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/services/core";
import { authService } from "@/services/modules/auth";
import Loader from "@/components/Loader";

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          await authService.me();
          // Token is valid, continue
        } catch (error) {
          console.error("Token validation failed:", error);
          authService.logout();
          router.push("/"); // Redirect to home or login page
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [router]);

  if (loading) {
    return <Loader />; 
  }

  return <>{children}</>;
};

export default AuthInitializer;
