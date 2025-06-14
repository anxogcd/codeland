import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EIssuePriority } from '../../../domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from '../../../domain/value-objects/issue-status.value-object';

@ObjectType('Issue')
export class IssueGqlType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => EIssueStatus)
  status: EIssueStatus;

  @Field(() => Number)
  assignedToId: number;

  @Field(() => EIssuePriority)
  priority: EIssuePriority;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
