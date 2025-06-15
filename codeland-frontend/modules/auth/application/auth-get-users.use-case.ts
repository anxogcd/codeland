import { IAuthRepository } from "../domain/auth-repository.interface";

export class AuthGetUsersUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute() {
    return this.authRepository.getAllUsers();
  }
}
