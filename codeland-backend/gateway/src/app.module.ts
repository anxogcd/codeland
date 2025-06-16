import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => ({ req }),
      },
      gateway: {
        buildService: ({ name, url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }: any) {
              const auth = context.req?.headers?.authorization;
              if (auth) {
                request.http.headers.set('authorization', auth);
              }
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'users',
              url: `http://${process.env.DOCKER ? 'user_service' : 'localhost'}:4002/graphql`,
            },
            {
              name: 'issues',
              url: `http://${process.env.DOCKER ? 'issue_service' : 'localhost'}:4003/graphql`,
            },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
