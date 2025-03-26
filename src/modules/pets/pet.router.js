import { Router } from "express";
import { petController } from "./pet.controller.js";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", petController.getById);

export default router;