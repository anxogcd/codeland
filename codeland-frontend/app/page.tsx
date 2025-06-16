"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tokenAtom } from "@/modules/auth/hooks/useLogin";
import { IssuesTable } from "@/modules/issues/components/issues-table";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const Home = () => {
  const router = useRouter();
  const storedToken = localStorage.getItem("token");
  const token = useAtomValue(tokenAtom);

  const checkAuth = useCallback(() => {
    if (!token && !storedToken) {
      router.push("/login");
    }
  }, [token, storedToken, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!token && !storedToken)
    return (
      <h2 className="w-fit h-fit text-3xl font-bold mx-auto my-20">
        Redirecting...
      </h2>
    );

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-center align-center h-screen bg-secondary">
      <Card className="w-4/5 h-10/12 m-auto p-2 overflow-y-auto">
        <CardHeader>
          <div
            className="text-right text-3xl cursor-pointer"
            onClick={() => logOut()}
          >
            ❌
          </div>
          <CardTitle>Issues</CardTitle>
          <CardDescription>Issues List</CardDescription>
        </CardHeader>
        <CardContent>
          <IssuesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
