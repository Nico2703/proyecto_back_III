import { z } from "zod";

export const loginSchema = {
  body: z.object(
    {
      email: z.string().email("Tiene que ser un email válido"),
      password: z.string().min(6, "El password debe contener al menos 6 caracteres")
    }
  )
}

export const registerSchema = {
  body: z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email("Tiene que ser un email válido"),
    password: z.string().min(6, "El password debe contener al menos 6 caracteres"),
    role: z.enum(["admin", "user"]).optional()
  })
}
