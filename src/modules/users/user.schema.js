import { z } from "zod";

export const usersMocksSchema = {
    params: z.object({
        amount: z.coerce
        .number({ invalid_type_error: "El valor debe ser un número" })
        .int("Tiene que ser un número entero")
        .positive("El número tiene que ser positivo"),
    })
};

export const createSchema = {
    body: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    })
}

export const updateSchema = {
    params: z.object({
        id: z.string().regex(/^[a-fA-F0-9]{24}$/, "Debe ser del tipo -> ObjectId")
    }),
    body: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    })
}
