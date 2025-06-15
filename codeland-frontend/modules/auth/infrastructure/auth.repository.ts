import { query } from "@Modules/apollo/client";
import { GetAllUsersQuery, UserModel } from "@Modules/gql/generated/graphql";
import { getAllUsersQuery } from "../api/queries";
import { IAuthRepository } from "../domain/auth-repository.interface";

export class AuthRepository implements IAuthRepository {
  async login(username: string, password: string) {
    return "hola";
  }

  async getAllUsers(): Promise<Array<Partial<UserModel>>> {
    const { data } = await query<GetAllUsersQuery>({ query: getAllUsersQuery });
    return this.fromApi(data);
  }

  private fromApi(apiEntity: GetAllUsersQuery): Array<Partial<UserModel>> {
    return apiEntity.getAllUsers.map((user) => ({
      username: user.username,
      name: user.name,
    }));
  }
}
