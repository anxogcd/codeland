import { IAuthRepository } from "../domain/auth-repository.interface";

export class AuthRepository implements IAuthRepository {
  async login(username: string, password: string) {
    return "hola";
  }
}
