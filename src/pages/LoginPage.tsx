import { useState } from "react";
import type { Code } from "@/components/Auth/types/types";
import { AuthForm } from "@/components/Auth/AuthForm";
import { ConfirmForm } from "@/components/Auth/ConfirmForm";

// если код получен отображаем форму подтверждения
export function LoginPage() {
  const [code, setCode] = useState<Code>({ code: undefined });

  return !code.code ? (
    <AuthForm setState={setCode}></AuthForm>
  ) : (
    <ConfirmForm setState={setCode}></ConfirmForm>
  );
}
