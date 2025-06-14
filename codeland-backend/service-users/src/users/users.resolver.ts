import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UserService } from './users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserModel)
  async getUserById(@Args('input') id: number): Promise<UserModel> {
    return await this.userService.findById(id);
  }

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<UserModel> {
    console.log('+++++++');
    return await this.userService.findById(reference.id);
  }
}
