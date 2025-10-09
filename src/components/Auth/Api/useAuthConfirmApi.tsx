import { useMutation } from "@tanstack/react-query";
import { fetchAuthFinaly } from "./fetchAuthFinaly";

export const useAuthConfirmApi = () => {
  return useMutation({
    mutationFn: fetchAuthFinaly,
  });
};
