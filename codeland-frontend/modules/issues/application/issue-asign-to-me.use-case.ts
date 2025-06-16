import { IIssueRepository } from "../domain/issue-repository.interface";

export class IssueAssignToMeUseCase {
  constructor(private readonly issueRepository: IIssueRepository) {}

  async execute(id: string) {
    return await this.issueRepository.assignToMe(id);
  }
}
