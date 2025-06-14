import { Injectable } from '@nestjs/common';
import { IUseCase } from '@Shared/application/interfaces/use-case.interface';
import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';
import { IIssueFiltersWithPagination } from 'src/issues/domain/interfaces/issue-filters.interface';
import { IssueModel } from 'src/issues/domain/models/issue.model';
import { InjectIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IIssuesRepository } from 'src/issues/domain/repositories/issue-repository.interface';
import { IssueFindByCriteriaDto } from '../dtos/issue-find-by-criteria.dto';

@Injectable()
export class IssueFindByCriteriaUseCase
  implements IUseCase<IIssueFiltersWithPagination, IssueModel>
{
  constructor(
    @InjectIIssueRepository()
    private readonly issuesRepository: IIssuesRepository,
  ) {}

  async execute(
    command: IssueFindByCriteriaDto,
  ): Promise<CriteriaResult<IssueModel>> {
    return this.issuesRepository.findByCriteria(command);
  }
}
