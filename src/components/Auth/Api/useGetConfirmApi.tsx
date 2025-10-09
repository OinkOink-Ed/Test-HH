import { useQuery } from "@tanstack/react-query";
import { fetchConfirm } from "./fetchConfirm";

// Запрос выключен, чтобы отправлять его только через refetch
export const useGetConfirmApi = () =>
  useQuery({
    queryKey: ["confirm"],
    queryFn: fetchConfirm,
    enabled: false,
  });
