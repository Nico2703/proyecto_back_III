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

  async create(data){
    const pet = await petDao.create(data);
    return pet;
  }

  async getAll() {
    const pets = await petDao.getAll();
    return pets;
  }
  
  async getOne(id) {
    const pet = await petDao.getOne(id);
    return pet;
  }

  async update(id, data){
    const pet = await petDao.getOne({ _id: id });
    if (!pet) {
      const error = new Error('Mascota no encontrada');
      error.statusCode = 404; 
      throw error; ;
    }
    return await petDao.update(id, data);
  }
  
  async delete(id){
    const pet = await petDao.getOne({ _id: id });
    if (!pet) {
      const error = new Error('Mascota no encontrada');
      error.statusCode = 404; 
      throw error; ;
    }
    return await petDao.remove(id);
  }

}

export const petService = new PetService();