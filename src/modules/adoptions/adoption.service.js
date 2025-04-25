import { petDao } from "../pets/pet.dao.js";
import { userDao } from "../users/user.dao.js";
import { adoptionDao } from "./adoption.dao.js";

class AdoptionService {
  async getAll() {
    const adoptions = await adoptionDao.getAll();
    return adoptions;
  }

  async getOne(id) {
    const adoption = await adoptionDao.getOne(id);
    return adoption;
  }

  async create(ownerId, petId) {
    const pet = await petDao.getOne({ _id: petId });
    if (!pet) {
      const error = new Error("Mascota no encontrada");
      error.statusCode = 404; 
      throw error; 
    }
    if (pet.adopted) {
      const error = new Error("Mascota ya adoptada");
      error.statusCode = 404; 
      throw error; 
    }

    const user = await userDao.getOne({ _id: ownerId });
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404; 
      throw error; 
    }

    const adoption = await adoptionDao.create({ owner: ownerId, pet: petId });

    await petDao.update(pet._id, { adopted: true, owner: user._id });

    const updatePets = [...user.pets, { _id: pet._id }];
    await userDao.update(user._id, { pets: updatePets });

    return adoption;
  }
}

export const adoptionService = new AdoptionService();
