import { IAuthRepository } from "../domain/auth-repository.interface";

export class AuthLoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(username: string, pass: string) {
    return await this.authRepository.login(username, pass);
  }
}
