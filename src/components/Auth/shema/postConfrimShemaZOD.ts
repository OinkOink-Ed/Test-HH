import z from "zod/v3";

export const postConfrimShemaZOD = z.object({
  confirm: z.string().min(6),
});
