import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IssueGqlType } from 'src/issues/infrastructure/graphql/types/issue.gqltype';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserGqlType {
  @Field(() => ID)
  @Directive('@external')
  id: number;

  @Field(() => [IssueGqlType])
  issues?: IssueGqlType[];
}
