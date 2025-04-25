import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateSchema } from "../../common/middlewares/validateSchema.js";
import { createSchema, updateSchema } from "./user.schema.js";
import { objectIdSchema } from "../../common/schemas/objectId.schema.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", validateSchema(objectIdSchema), userController.getById);

router.post("/", validateSchema(createSchema), userController.create);

router.put("/:id", validateSchema(updateSchema), userController.update);

router.delete("/:id", validateSchema(objectIdSchema), userController.delete);

export default router;