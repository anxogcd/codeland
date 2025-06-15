import LoginPage from "@/modules/auth/ui/pages/login";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster />
      <LoginPage />
    </>
  );
}
