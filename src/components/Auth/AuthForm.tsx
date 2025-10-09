import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postAuthShemaZOD } from "@/components/Auth/shema/postAuthShemaZOD";
import type { PostAuth } from "@/components/Auth/Api/types/PostAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Code, Exeptions } from "./types/types";
import { useAuthFormApi } from "./Api/useAuthFormApi";
import { useEffect } from "react";

interface AuthFormProps {
  setState: React.Dispatch<React.SetStateAction<Code>>;
}

export function AuthForm({ setState }: AuthFormProps) {
  const formAuth = useForm<PostAuth>({
    mode: "onChange",
    resolver: zodResolver(postAuthShemaZOD),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => console.log("AuthForm"));

  const { mutateAsync } = useAuthFormApi();

  async function onSubmit(data: PostAuth): Promise<void> {
    try {
      const res = await mutateAsync(data);
      setState({ code: res.confirmCode });
    } catch (error: unknown) {
      toast.error((error as Exeptions).message, {
        position: "top-center",
      });
      formAuth.reset();
    }
  }

  return (
    <div className="flex h-svh items-center justify-center">
      <Form {...formAuth}>
        <form
          onSubmit={(event) => void formAuth.handleSubmit(onSubmit)(event)}
          className="flex h-[372px] w-[440px] flex-col gap-6 rounded-[8px] bg-white p-8"
        >
          <div className="flex flex-col items-center">
            <div className="flex h-16 items-center">
              <img src="_Logo_Placeholder.svg" alt="" />
            </div>
            <h3 className="text-center text-3xl">
              Sign in to your account to continue
            </h3>
          </div>

          <FormField
            control={formAuth.control}
            name="username"
            render={({ field }) => (
              <FormItem className="h-10">
                <FormControl>
                  <Input
                    className="focus-visible:ring-ring-blue focus-visible:ring-[1.5px]"
                    placeholder="Email"
                    {...field}
                    autoComplete="username"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formAuth.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-10">
                <FormControl>
                  <Input
                    className="focus-visible:ring-ring-blue focus-visible:ring-[1.5px]"
                    type="password"
                    placeholder="Password"
                    {...field}
                    autoComplete="current-password"
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="bg-blue-button hover:bg-blue-button cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={!formAuth.formState.isValid}
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
