"use client";

import { atom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { IssueAssignToMeUseCase } from "../application/issue-asign-to-me.use-case";
import { IssueRepository } from "../infrastructure/issue.repository";

export const tokenAtom = atom<string | null>(null);

export const useAssignIssueToMe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assign = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new IssueAssignToMeUseCase(new IssueRepository());
      await useCase.execute(id);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { assign, loading, error };
};
