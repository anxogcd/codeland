import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UserResolver, UsersService],
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
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
