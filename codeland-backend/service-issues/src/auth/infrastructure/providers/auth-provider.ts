import { Provider } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';

const Services: Provider[] = [JwtStrategy];

export const AUTH_PROVIDERS = [...Services];
