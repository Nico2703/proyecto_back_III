import { generatePetsMocks } from "../../mock/pets.mocks.js";
import { petDao } from "./pet.dao.js";

class PetService{

  async createPetsMocks(amount) {
    const pets = generatePetsMocks(amount);
    await petDao.removeAll();
    for(const pet of pets){
      await petDao.create(pet);
    }
    return pets;
  }

  async getAll() {
    const pets = await petDao.getAll();
    return pets;
  }
  
  async getOne(id) {
    const pet = await petDao.getOne(id);
    return pet;
  }
}

export const petService = new PetService();