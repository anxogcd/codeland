"use client";

import { tokenAtom } from "@/modules/auth/hooks/useLogin";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const Home = () => {
  const router = useRouter();

  const token = useAtomValue(tokenAtom);

  const checkAuth = useCallback(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!token) return null;

  return (
    <>
      <h1>ISSUES</h1>
    </>
  );
};

export default Home;
