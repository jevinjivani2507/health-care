"use client";

import { useAuthStore } from "@/stores/auth-store";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const { user, isLoading, isAuthenticated } = useAuthStore();

  const logout = async () => {
    await signOut(auth);
    useAuthStore.getState().logout();
  };

  return { user, isLoading, isAuthenticated, logout };
}
