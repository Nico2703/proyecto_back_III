import { Router } from "express";
import { adoptionController } from "./adoption.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createSchema, getSchema } from "./adoption.schema.js";

const router = Router();

router.get("/", adoptionController.getAll);
router.get("/:id", validateSchema(getSchema), adoptionController.getById);
router.post("/", validateSchema(createSchema), adoptionController.create);

export default router;