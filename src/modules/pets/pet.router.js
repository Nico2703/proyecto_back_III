import { Router } from "express";
import { petController } from "./pet.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createSchema, updateSchema } from "./pet.schema.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", validateSchema(objectIdSchema), petController.getById);

router.post("/", validateSchema(createSchema), petController.create);

router.put("/:id", validateSchema(updateSchema), petController.update);

router.delete("/:id",validateSchema(objectIdSchema), petController.delete);

export default router;