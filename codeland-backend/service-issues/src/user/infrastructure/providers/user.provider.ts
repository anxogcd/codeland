import { Provider } from '@nestjs/common';
import { UserResolver } from '../graphql/resolvers/user.resolver';

const Resolvers: Provider[] = [UserResolver];

export const USER_PROVIDERS = [...Resolvers];
