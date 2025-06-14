import { Injectable } from '@nestjs/common';
import { IUseCase } from '@Shared/application/interfaces/use-case.interface';
import { IssueModel } from 'src/issues/domain/models/issue.model';
import { InjectIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IIssuesRepository } from 'src/issues/domain/repositories/issue-repository.interface';

@Injectable()
export class IssueFindByIdUseCase implements IUseCase<string, IssueModel> {
  constructor(
    @InjectIIssueRepository()
    private readonly issuesRepository: IIssuesRepository,
  ) {}

  async execute(id: string): Promise<IssueModel | null> {
    return this.issuesRepository.findById(id);
  }
}
