import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getUser(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    return await this.userService.findById(id);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
