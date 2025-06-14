import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IssueGqlType } from './issue.gqltype';

@ObjectType('IssueCriteriaResult')
export class IssueCriteriaResultGqlType {
  @Field(() => [IssueGqlType])
  data: IssueGqlType[];

  @Field(() => Int)
  total: number;
}
