import {
  EIssueCriteriaSort,
  EIssuePriority,
  EIssueStatus,
  Issue,
} from "@/modules/gql/generated/graphql";

export interface IIssueRepository {
  findByCriteria(
    page?: number,
    orderBy?: EIssueCriteriaSort,
    title?: string,
    status?: EIssueStatus,
    assignedToId?: number,
    priority?: EIssuePriority
  ): Promise<{ data: Partial<Issue>[]; total: number }>;
}
