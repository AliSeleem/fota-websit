import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth"); // Redirect to the auth page if not authenticated
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};