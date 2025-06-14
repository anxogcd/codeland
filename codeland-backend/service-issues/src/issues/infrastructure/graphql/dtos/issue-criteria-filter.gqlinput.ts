import { Field, InputType, Int } from '@nestjs/graphql';
import { EIssueCriteriaSort } from 'src/issues/domain/constants/issue-criteria-sort.enum';
import {
  IIssueFilters,
  IIssueFiltersWithPagination,
} from 'src/issues/domain/interfaces/issue-filters.interface';
import { EIssuePriority } from 'src/issues/domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from 'src/issues/domain/value-objects/issue-status.value-object';

@InputType('IssueFiltersInput')
class IssueFiltersInput implements IIssueFilters {
  @Field({ nullable: true })
  title?: string;

  @Field(() => EIssueStatus, { nullable: true })
  status?: EIssueStatus;

  @Field(() => Int, { nullable: true })
  assignedToId?: number;

  @Field(() => EIssuePriority, { nullable: true })
  priority?: EIssuePriority;
}

@InputType('IssueCriteriaInput')
export class IssueCriteriaFiltersGqlInput
  implements IIssueFiltersWithPagination
{
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => IssueFiltersInput, { nullable: true })
  filters?: IssueFiltersInput;

  @Field(() => EIssueCriteriaSort, { nullable: true })
  orderBy?: EIssueCriteriaSort;
}
