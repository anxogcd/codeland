"use client";

import { atom, useSetAtom } from "jotai";
import { useState } from "react";
import { AuthLoginUseCase } from "../application/auth-login.use-case";
import { AuthRepository } from "../infrastructure/auth.repository";

export const tokenAtom = atom<string | null>(null);

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setToken = useSetAtom(tokenAtom);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new AuthLoginUseCase(new AuthRepository());
      const result = await useCase.execute(username, password);
      setToken(result ?? null);
      result && localStorage.setItem("token", result);
      return result;
    } catch (err: any) {
      setError(err.message);
      setToken(null);
      localStorage.removeItem("token");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
