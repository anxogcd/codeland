import { EIssuePriority, EIssueStatus } from "@/modules/gql/generated/graphql";
import { IIssueRepository } from "../domain/issue-repository.interface";

export class IssueFindByCriteriaUseCase {
  constructor(private readonly issueRepository: IIssueRepository) {}

  async execute(
    page?: number,
    orderBy?: string,
    title?: string,
    status?: EIssueStatus,
    assignedToId?: number,
    priority?: EIssuePriority
  ) {
    return await this.issueRepository.findByCriteria(
      page,
      orderBy,
      title,
      status,
      assignedToId,
      priority
    );
  }
}
