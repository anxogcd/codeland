import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CriteriaResult } from '@Shared/domain/interfaces/criteria-result.interface';
import { IssueFindByAssignedUserIdUseCase } from 'src/issues/application/use-cases/issue-find-by-assigned-user-id.use-case';
import { IssueModel } from 'src/issues/domain/models/issue.model';
import { IssueGqlType } from 'src/issues/infrastructure/graphql/types/issue.gqltype';
import { UserGqlType } from '../types/user.gqltype';

@Resolver(() => UserGqlType)
export class UserResolver {
  constructor(
    private readonly issueFindByAssignedUserIdUseCase: IssueFindByAssignedUserIdUseCase,
  ) {}

  @ResolveField(() => [IssueGqlType])
  public async issues(
    @Parent() user: UserGqlType,
  ): Promise<CriteriaResult<IssueModel>> {
    return await this.issueFindByAssignedUserIdUseCase.execute(user.id);
  }
}
