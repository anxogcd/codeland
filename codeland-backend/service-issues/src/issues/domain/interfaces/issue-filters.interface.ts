import { EIssueCriteriaSort } from '../constants/issue-criteria-sort.enum';
import { EIssuePriority } from '../value-objects/issue-priority.value-object';
import { EIssueStatus } from '../value-objects/issue-status.value-object';

export interface IIssueFilters {
  title?: string;
  status?: EIssueStatus;
  assignedToId?: number;
  priority?: EIssuePriority;
}
export interface IIssueFiltersWithPagination {
  page?: number;
  limit?: number;
  filters?: IIssueFilters;
  orderBy?: EIssueCriteriaSort;
}
