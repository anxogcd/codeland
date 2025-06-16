import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { AUTH_PROVIDERS } from 'src/auth/infrastructure/providers/auth-provider';
import { USER_PROVIDERS } from 'src/user/infrastructure/providers/user.provider';
import { EIssueCriteriaSort } from './domain/constants/issue-criteria-sort.enum';
import { EIssuePriority } from './domain/value-objects/issue-priority.value-object';
import { EIssueStatus } from './domain/value-objects/issue-status.value-object';
import { IssueEntity } from './infrastructure/entities/issue.entity';
import { ISSUE_PROVIDERS } from './infrastructure/providers/issue.provider';

const GQL_ENUMS: Array<[object, string]> = [
  [EIssueStatus, 'EIssueStatus'],
  [EIssuePriority, 'EIssuePriority'],
  [EIssueCriteriaSort, 'EIssueCriteriaSort'],
];

for (const gqlEnum of GQL_ENUMS) {
  registerEnumType(gqlEnum[0], { name: gqlEnum[1] });
}

@Module({
  providers: [...ISSUE_PROVIDERS, ...USER_PROVIDERS, ...AUTH_PROVIDERS],
  imports: [
    MikroOrmModule.forFeature({ entities: [IssueEntity] }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      plugins: [ApolloServerPluginInlineTrace()],
      context: ({ req }) => ({ req }),
      /*       buildSchemaOptions: {
        orphanedTypes: [UserGqlType],
      }, */
    }),
  ],
})
export class IssuesModule {}
