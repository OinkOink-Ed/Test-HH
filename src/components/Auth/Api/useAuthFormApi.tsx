import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAuth } from "./fetchAuth";

export const useAuthFormApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchAuth,
    onSuccess: async (data) => {
      await queryClient.setQueryData(["confirm"], {
        confirmCode: data.confirmCode,
      });
    },
  });
};
