import { Injectable } from '@nestjs/common';
import { IUseCase } from '@Shared/application/interfaces/use-case.interface';
import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';
import { IssueModel } from 'src/issues/domain/models/issue.model';
import { InjectIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IIssuesRepository } from 'src/issues/domain/repositories/issue-repository.interface';

@Injectable()
export class IssueFindByAssignedUserIdUseCase
  implements IUseCase<number, CriteriaResult<IssueModel>>
{
  constructor(
    @InjectIIssueRepository()
    private readonly issuesRepository: IIssuesRepository,
  ) {}

  async execute(userId: number): Promise<CriteriaResult<IssueModel>> {
    return this.issuesRepository.findByAssingedUserId(userId);
  }
}
