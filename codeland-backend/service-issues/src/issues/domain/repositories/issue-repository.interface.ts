import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';
import { IIssueFiltersWithPagination } from '../interfaces/issue-filters.interface';
import { IssueModel } from '../models/issue.model';

export interface IIssuesRepository {
  findByCriteria(
    criteria: IIssueFiltersWithPagination,
  ): Promise<CriteriaResult<IssueModel>>;
}
