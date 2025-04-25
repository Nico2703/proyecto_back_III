import { Router } from "express";
import mocksRouter from "../mock/mocks.router.js";
import petsRouter from "../modules/pets/pet.router.js";
import usersRouter from "../modules/users/user.router.js";
import adoptionRouter from "../modules/adoptions/adoption.router.js";
import authRouter from "../modules/auth/auth.router.js";

const router = Router();

router.use('/mocks', mocksRouter);
router.use('/pets', petsRouter);
router.use('/users', usersRouter);
router.use("/adoptions", adoptionRouter);
router.use("/auth", authRouter);

export default router;
