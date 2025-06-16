"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "../../modules/auth/components/login-form";
import { useGetUsers } from "../../modules/auth/hooks/useGetUsers";

const LoginPage = () => {
  const { users } = useGetUsers();

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
};

export default LoginPage;
