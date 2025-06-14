import { Field, InputType } from '@nestjs/graphql';

@InputType('IssueAssignUserIdInput')
export class IssueAssignUserIdGqlInput {
  @Field(() => String)
  issueId: string;
}
