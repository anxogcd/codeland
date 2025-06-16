import { Provider } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { JwtStrategy } from '../strategies/jwt.strategy';

const Services: Provider[] = [JwtStrategy, GqlAuthGuard];

export const AUTH_PROVIDERS = [...Services];
