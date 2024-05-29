import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean(),
});

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});