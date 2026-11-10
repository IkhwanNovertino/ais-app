import z from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Email tidak valid" }),
  password: z.string().min(8, { error: "Password minimal 8 karakter" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
