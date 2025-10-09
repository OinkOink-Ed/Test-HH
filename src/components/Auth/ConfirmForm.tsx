import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { postConfrimShemaZOD } from "@/components/Auth/shema/postConfrimShemaZOD";
import type { PostConfirm } from "@/components/Auth/Api/types/PostConfirm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Code, Exeptions, Time } from "./types/types";
import { useGetConfirmApi } from "./Api/useGetConfirmApi";
import { useAuthConfirmApi } from "./Api/useAuthConfirmApi";

interface AuthFormProps {
  setState: React.Dispatch<React.SetStateAction<Code>>;
}

//Опущу моковую реализацию получения и сохранения токена после успешного ввода кода подтверждения
//Обычно я работал с zustand Store в связке с persist localstorage
export function ConfirmForm({ setState }: AuthFormProps) {
  const [datetime, setdateTime] = useState<Time>({ time: undefined });
  const [isTimePassed, setIsTimePassed] = useState(false);

  useEffect(() => console.log("ConfirmForm"));

  const {
    formState,
    handleSubmit,
    control,
    reset,
    watch,
    clearErrors,
    getFieldState,
    getValues,
    register,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    subscribe,
  } = useForm<PostConfirm>({
    mode: "onChange",
    resolver: zodResolver(postConfrimShemaZOD),
    defaultValues: {
      confirm: "",
    },
  });

  const { refetch } = useGetConfirmApi();
  const { mutateAsync: autnConfirmApi } = useAuthConfirmApi();

  async function onAuth(data: PostConfirm): Promise<void> {
    try {
      await autnConfirmApi(data);
      // Здесь можно использовать store для сохранения токена и дальнейшего редиректа на страницу приложения
      toast.success("Успех", {
        position: "top-center",
      });
    } catch (error: unknown) {
      toast.error((error as Exeptions).message, {
        position: "top-center",
      });
      setError("confirm", { message: "invalid code" });
    }
  }

  async function refetchCode() {
    try {
      const { data } = await refetch();
      setState({ code: data?.confirmCode });
      setdateTime({ time: new Date() });
      setIsTimePassed(false);
      reset();
    } catch (error) {
      toast.error((error as Exeptions).message, {
        position: "top-center",
      });
    }
  }

  //Имитация истекшего code
  useEffect(() => {
    if (!datetime.time) {
      setIsTimePassed(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsTimePassed(true);
    }, 30000); // 30 секунд

    return () => clearTimeout(timer);
  }, [datetime.time]);

  const watchedConfirm = watch("confirm");

  return (
    <div className="flex h-svh items-center justify-center" key="otp-form">
      <Form
        subscribe={subscribe}
        formState={formState}
        control={control}
        reset={reset}
        watch={watch}
        clearErrors={clearErrors}
        getFieldState={getFieldState}
        getValues={getValues}
        handleSubmit={handleSubmit}
        register={register}
        resetField={resetField}
        setError={setError}
        setFocus={setFocus}
        setValue={setValue}
        trigger={trigger}
        unregister={unregister}
      >
        <form
          onSubmit={(event) => void handleSubmit(onAuth)(event)}
          className="flex h-[372px] w-[440px] flex-col gap-6 rounded-[8px] bg-white p-8"
        >
          <div className="flex flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <Button
                variant="ghost"
                className="absolute top-0 left-0 cursor-pointer"
                onClick={() => setState({ code: undefined })}
              >
                <ArrowLeft />
              </Button>
              <div className="flex h-16 items-center">
                <img src="_Logo_Placeholder.svg" alt="Logo" />
              </div>
            </div>

            <h3 className="text-center text-3xl">Two-Factor Authentication</h3>
            <p className="text-center">
              Enter the 6-digit code from the Google Authenticator app
            </p>
          </div>
          <FormField
            control={control}
            name="confirm"
            render={({ field, fieldState }) => (
              <FormItem className="h-10">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="first: flex gap-3">
                      <InputOTPSlot
                        index={0}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                      <InputOTPSlot
                        index={1}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                      <InputOTPSlot
                        index={2}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                      <InputOTPSlot
                        index={3}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                      <InputOTPSlot
                        index={4}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                      <InputOTPSlot
                        index={5}
                        className={`h-[60px] w-[53px] rounded-[8px] border ${
                          fieldState.error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-gray-300 focus-visible:ring-blue-500"
                        }`}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isTimePassed && (
            <Button
              onClick={() => refetchCode()}
              className="bg-blue-button hover:bg-blue-button mt-8 cursor-pointer"
              type="button"
            >
              Get new
            </Button>
          )}
          {!(watchedConfirm.length < 6) && !isTimePassed && (
            <Button
              className="bg-blue-button hover:bg-blue-button mt-8 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
              type="submit"
              disabled={!formState.isValid || isTimePassed}
            >
              Continue
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
