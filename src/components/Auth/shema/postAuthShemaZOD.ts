import z from "zod/v3";

export const postAuthShemaZOD = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
