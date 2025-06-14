import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { UserGqlType } from 'src/user/infrastructure/graphql/types/user.gqltype';
import { EIssuePriority } from '../../../domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from '../../../domain/value-objects/issue-status.value-object';

@ObjectType('Issue')
@Directive('@key(fields: "id")')
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

  @Field(() => UserGqlType)
  user?: UserGqlType;
}
