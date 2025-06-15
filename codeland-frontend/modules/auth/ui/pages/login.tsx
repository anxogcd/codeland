import { AuthGetUsersUseCase } from "../../application/auth-get-users.use-case";
import { AuthRepository } from "../../infrastructure/auth.repository";
import { Login } from "../components/login-form";

export default async function LoginPage() {
  const useCase = new AuthGetUsersUseCase(new AuthRepository());
  const users = await useCase.execute();

  return <Login users={users} />;
}
