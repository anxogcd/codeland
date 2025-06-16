import client from "@/modules/apollo/client";
import {
  EIssueCriteriaSort,
  EIssuePriority,
  EIssueStatus,
  FindIssuesByCriteriaQuery,
  Issue,
} from "@Modules/gql/generated/graphql";
import { ISSUES_FIND_BY_CRITERIA_QUERY } from "../api/queries";
import { IIssueRepository } from "../domain/issue-repository.interface";

export class IssueRepository implements IIssueRepository {
  async findByCriteria(
    page?: number,
    orderBy?: EIssueCriteriaSort,
    title?: string,
    status?: EIssueStatus,
    assignedToId?: number,
    priority?: EIssuePriority
  ) {
    const { data } = await client.query<FindIssuesByCriteriaQuery>({
      query: ISSUES_FIND_BY_CRITERIA_QUERY,
      variables: { page, orderBy, title, status, assignedToId, priority },
    });
    return { data: this.fromApi(data), total: data.issueFindByCriteria.total };
  }

  private fromApi(apiEntity: FindIssuesByCriteriaQuery): Partial<Issue>[] {
    return apiEntity.issueFindByCriteria.data.map((issue) => ({
      id: issue.id,
      assignedToId: issue.assignedToId,
      createdAt: issue.createdAt,
      priority: issue.priority,
      status: issue.status,
      title: issue.title,
      updatedAt: issue.updatedAt,
    }));
  }
}
