import { UserModel } from "@/modules/gql/generated/graphql";

export interface IAuthRepository {
  login(username: string, password: string): Promise<string>;
  getAllUsers(): Promise<Array<Partial<UserModel>>>;
}
