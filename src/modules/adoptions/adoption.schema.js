import { z } from "zod";

export const createSchema = {
  body: z.object({
    owner: z.string().regex(/^[a-f\d]{24}$/i, { message: "Debe ser del tipo -> ObjectId"}),
    pet: z.string().regex(/^[a-f\d]{24}$/i, { message: "Debe ser del tipo -> ObjectId"})
  })
}

export const getSchema = {
  params: z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, { message: "Debe ser del tipo -> ObjectId"})
  })
}