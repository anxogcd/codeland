import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IssueFindByCriteriaDto } from 'src/issues/application/dtos/issue-find-by-criteria.dto';
import { IssueFindByCriteriaUseCase } from 'src/issues/application/use-cases/issue-find-by-criteria.use-case';
import { UserGqlType } from 'src/user/infrastructure/graphql/types/user.gqltype';
import { IssueCriteriaFiltersGqlInput } from '../dtos/issue-criteria-filter.gqlinput';
import { IssueMapper } from '../mappers/issue.gql-mapper';
import { IssueCriteriaResultGqlType } from '../types/issue-criteria-result.gqltype';
import { IssueGqlType } from '../types/issue.gqltype';

@Resolver(() => IssueGqlType)
export class IssueResolver {
  constructor(
    private readonly issueFindByCriteriaUseCase: IssueFindByCriteriaUseCase,
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

  @ResolveField(() => UserGqlType)
  user(@Parent() post: IssueGqlType): any {
    return { __typename: 'User', id: post.assignedToId };
  }
}
