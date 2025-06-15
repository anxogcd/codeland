import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthGetUsersUseCase } from "../../application/auth-get-users.use-case";
import { AuthRepository } from "../../infrastructure/auth.repository";
import { LoginForm } from "../components/login-form";

export default async function LoginPage() {
  const useCase = new AuthGetUsersUseCase(new AuthRepository());
  const users = await useCase.execute();

  return (
    <div className="flex justify-center align-center h-screen bg-secondary">
      <Card className="h-fit w-1/5 m-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Access to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
