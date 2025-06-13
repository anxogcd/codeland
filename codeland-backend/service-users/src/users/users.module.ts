import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  providers: [UsersResolver, UserService],
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    MikroOrmModule.forFeature({
      entities: [UserEntity],
    }),
  ],
})
export class UsersModule {}
