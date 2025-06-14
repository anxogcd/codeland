import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { IssueModel } from './models/issue.model';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      plugins: [ApolloServerPluginInlineTrace()],
      buildSchemaOptions: {
        orphanedTypes: [IssueModel],
      },
    }),
  ],
})
export class UsersModule {}
