import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { IssueModel } from './issue.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => IssueModel)
  issues?: IssueModel;
}
