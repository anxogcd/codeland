import { EIssueCriteriaSort } from 'src/issues/domain/constants/issue-criteria-sort.enum';
import { EIssuePriority } from 'src/issues/domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from 'src/issues/domain/value-objects/issue-status.value-object';

export class IssueFindByCriteriaDto {
  constructor(
    public readonly filters?: {
      title?: string;
      status?: EIssueStatus;
      assignedToId?: number;
      priority?: EIssuePriority;
    },
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: EIssueCriteriaSort,
  ) {}
}
