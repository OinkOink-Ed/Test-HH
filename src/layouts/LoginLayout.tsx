import { Toaster } from "@/components/ui/sonner";
import { LoginPage } from "@/pages/LoginPage";
// Toaster для сообщений об ошибках API
export default function LoginLayout() {
  return (
    <>
      <Toaster />
      <LoginPage />
    </>
  );
}
