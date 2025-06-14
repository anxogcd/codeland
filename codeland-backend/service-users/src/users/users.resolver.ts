import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UsersService) {}

  @Query(() => UserModel)
  async getUserById(@Args('input') id: number): Promise<UserModel> {
    return await this.userService.findById(id);
  }

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  helloProtegido(@Context() context) {
    const user = context.req.user;
    return `Hola, ${user.username}`;
  }
}
