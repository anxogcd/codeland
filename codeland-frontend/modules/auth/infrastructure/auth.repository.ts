import client from "@/modules/apollo/client";
import {
  GetAllUsersQuery,
  LoginMutation,
  UserModel,
} from "@Modules/gql/generated/graphql";
import { GET_ALL_USERS_QUERY, LOGIN_MUTATION } from "../api/queries";
import { IAuthRepository } from "../domain/auth-repository.interface";

export class AuthRepository implements IAuthRepository {
  async getAllUsers(): Promise<Array<Partial<UserModel>>> {
    const { data } = await client.query<GetAllUsersQuery>({
      query: GET_ALL_USERS_QUERY,
    });
    return this.fromApi(data);
  }

  async login(username: string, password: string) {
    const res = await client.mutate<LoginMutation>({
      mutation: LOGIN_MUTATION,
      variables: {
        data: { username, password },
      },
    });

    return res.data?.login.access_token;
  }

  private fromApi(apiEntity: GetAllUsersQuery): Array<Partial<UserModel>> {
    return apiEntity.getAllUsers.map((user) => ({
      username: user.username,
      name: user.name,
    }));
  }
}
