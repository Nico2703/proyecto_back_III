import { Router } from "express";
import mocksRouter from "../mock/mocks.router.js";
import petsRouter from "../modules/pets/pet.router.js";
import usersRouter from "../modules/users/user.router.js";

const router = Router();

router.use('/mocks', mocksRouter);
router.use('/pets', petsRouter);
router.use('/users', usersRouter);

export default router;
