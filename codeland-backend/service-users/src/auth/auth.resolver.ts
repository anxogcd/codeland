// auth/auth.resolver.ts
import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dtos/auth.response';
import { LoginInput } from './dtos/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('data') data: LoginInput): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      data.username,
      data.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}
