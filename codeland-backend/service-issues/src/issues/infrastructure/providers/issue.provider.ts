import { Provider } from '@nestjs/common';
import { IssueAssignToUserIdUseCase } from 'src/issues/application/use-cases/issue-assign-to-user-id.use-case';
import { IssueFindByAssignedUserIdUseCase } from 'src/issues/application/use-cases/issue-find-by-assigned-user-id.use-case';
import { IssueFindByCriteriaUseCase } from 'src/issues/application/use-cases/issue-find-by-criteria.use-case';
import { IssueFindByIdUseCase } from 'src/issues/application/use-cases/issue-find-by-id.use-case';
import { DITokenIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IssueResolver } from '../graphql/resolvers/issue.resolver';
import { IssueRepository } from '../repositories/issue.repository';

const Repositories: Provider[] = [
  {
    provide: DITokenIIssueRepository,
    useClass: IssueRepository,
  },
];

const UseCases: Provider[] = [
  IssueFindByCriteriaUseCase,
  IssueFindByIdUseCase,
  IssueFindByAssignedUserIdUseCase,
  IssueAssignToUserIdUseCase,
];

const Resolvers: Provider[] = [IssueResolver];

export const ISSUE_PROVIDERS = [...Repositories, ...UseCases, ...Resolvers];
