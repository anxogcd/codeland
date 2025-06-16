"use client";

import { UserModel } from "@/modules/gql/generated/graphql";
import { useEffect, useState } from "react";
import { AuthGetUsersUseCase } from "../application/auth-get-users.use-case";
import { AuthRepository } from "../infrastructure/auth.repository";

export const useGetUsers = () => {
  const [users, setUsers] = useState<Array<Partial<UserModel>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const useCase = new AuthGetUsersUseCase(new AuthRepository());
        const result = await useCase.execute();
        setUsers(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
