"use client";

import { atom } from "jotai";
import { useState } from "react";
import { AuthLoginUseCase } from "../application/auth-login.use-case";
import { AuthRepository } from "../infrastructure/auth.repository";

export const tokenAtom = atom("");

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new AuthLoginUseCase(new AuthRepository());
      const result = await useCase.execute(username, password);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
