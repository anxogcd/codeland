import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '@Shared/infrastructure/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/infrastructure/guards/gql-auth.guard';
import { IssueFindByCriteriaDto } from 'src/issues/application/dtos/issue-find-by-criteria.dto';
import { IssueAssignToUserIdUseCase } from 'src/issues/application/use-cases/issue-assign-to-user-id.use-case';
import { IssueFindByCriteriaUseCase } from 'src/issues/application/use-cases/issue-find-by-criteria.use-case';
import { UserGqlType } from 'src/user/infrastructure/graphql/types/user.gqltype';
import { IssueAssignUserIdGqlInput } from '../dtos/issue-assign-user.qqlinput';
import { IssueCriteriaFiltersGqlInput } from '../dtos/issue-criteria-filter.gqlinput';
import { IssueMapper } from '../mappers/issue.gql-mapper';
import { IssueCriteriaResultGqlType } from '../types/issue-criteria-result.gqltype';
import { IssueGqlType } from '../types/issue.gqltype';

@Resolver(() => IssueGqlType)
export class IssueResolver {
  constructor(
    private readonly issueFindByCriteriaUseCase: IssueFindByCriteriaUseCase,
    private readonly issueAssignToUserIdUseCase: IssueAssignToUserIdUseCase,
  ) {}

  @Query(() => IssueCriteriaResultGqlType)
  async issueFindByCriteria(
    @Args('input', {
      type: () => IssueCriteriaFiltersGqlInput,
      nullable: true,
    })
    input: IssueCriteriaFiltersGqlInput,
  ): Promise<IssueCriteriaResultGqlType> {
    const { data, total } = await this.issueFindByCriteriaUseCase.execute(
      new IssueFindByCriteriaDto(
        {
          title: input.filters?.title,
          status: input.filters?.status,
          priority: input.filters?.priority,
          assignedToId: input.filters?.assignedToId,
        },
        input.page,
        input.limit,
        input.orderBy,
      ),
    );

    return { data: data.map(IssueMapper.toGql), total };
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async assignIssueToMe(
    @Args('data') data: IssueAssignUserIdGqlInput,
    @CurrentUser() user: { userId: number },
  ): Promise<Boolean> {
    return this.issueAssignToUserIdUseCase.execute({
      issueId: data.issueId,
      userId: user.userId,
    });
  }

  @ResolveField(() => UserGqlType)
  user(@Parent() issue: IssueGqlType): any {
    return { __typename: 'User', id: issue.assignedToId };
  }
}
