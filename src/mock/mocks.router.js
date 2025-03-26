import { Router } from "express";
import { petController } from "../modules/pets/pet.controller.js";
import { userController } from "../modules/users/user.controller.js";
import { petService } from "../modules/pets/pet.service.js";
import { userService } from "../modules/users/user.service.js";
import { validateSchema } from "../common/middlewares/validateSchema.js";
import { petsMocksSchema } from "../modules/pets/pet.schemas.js";
import { usersMocksSchema } from "../modules/users/user.schema.js";

const router = Router();

router.get('/mockingpets/:amount', validateSchema(petsMocksSchema), petController.createPetsMocks);

router.get('/mockingusers/:amount', validateSchema(usersMocksSchema), userController.createUsersMocks);

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;  

        if (isNaN(users) || isNaN(pets)) {
            return res.status(400).json({ message: 'Cantidad de usuarios o mascotas no válida' });
        }

        const [generatedUsers, generatedPets] = await Promise.all([
            userService.createUsersMocks(users),
            petService.createPetsMocks(pets)
        ]);

        res.status(201).json({
            users: generatedUsers,
            pets: generatedPets
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno de servidor' });
    }
});

export default router;