"use client";

import {
  EIssueCriteriaSort,
  EIssuePriority,
  EIssueStatus,
  Issue,
} from "@/modules/gql/generated/graphql";
import { useEffect, useState } from "react";
import { IssueFindByCriteriaUseCase } from "../application/issue-find-by-criteria.use-case";
import { IssueRepository } from "../infrastructure/issue.repository";

export const useFindIssuesByCriteria = (
  page?: number,
  orderBy?: EIssueCriteriaSort,
  title?: string,
  status?: EIssueStatus,
  assignedToId?: number,
  priority?: EIssuePriority
) => {
  const [issues, setIssues] = useState<Partial<Issue>[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const useCase = new IssueFindByCriteriaUseCase(new IssueRepository());
        const { data, total } = await useCase.execute(
          page,
          orderBy,
          title,
          status,
          assignedToId,
          priority
        );
        setIssues(data);
        setTotalNumber(total);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [page, orderBy, title, status, assignedToId, priority]);

  return { issues, loading, error, total: totalNumber };
};
