import { Provider } from '@nestjs/common';
import { IssueFindByCriteriaUseCase } from 'src/issues/application/use-cases/issue-find-by-criteria.use-case';
import { DITokenIIssueRepository } from 'src/issues/domain/repositories/issue-repository.di-token';
import { IssueResolver } from '../graphql/resolvers/issue.resolver';
import { IssueRepository } from '../repositories/issue.repository';

const Repositories: Provider[] = [
  {
    provide: DITokenIIssueRepository,
    useClass: IssueRepository,
  },
];

const UseCases: Provider[] = [IssueFindByCriteriaUseCase];

const Resolvers: Provider[] = [IssueResolver];

export const ISSUE_PROVIDERS = [...Repositories, ...UseCases, ...Resolvers];
