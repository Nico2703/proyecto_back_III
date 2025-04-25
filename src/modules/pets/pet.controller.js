import { request, response } from "express";
import { petService } from "./pet.service.js";

class PetController {

  async createPetsMocks(req = request, res = response, next) {
    try {
      const { amount } = req.params;
      const pets = await petService.createPetsMocks(amount);

      res.status(201).json(pets);
    } catch (error) {
      next(error);
    }
  }

  async create(req = request, res = response, next) {
    try {
      const body = req.body;
      const pet = await petService.create(body);
      
      res.status(201).json(pet);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req = request, res = response, next) {
    try {
      const pets = await petService.getAll();

      if (pets.length === 0) {
        const error = new Error('Lista de mascotas vacía');
        error.statusCode = 400; 
        throw error; 
      }

      res.json(pets);
    } catch (error) {
      next(error);
    }
  }

  async getById(req = request, res = response, next) {
    try {
      const { id } = req.params;
      const pet = await petService.getOne({ _id: id });

      if (!pet) {
        const error = new Error('Mascota no encontrada');
        error.statusCode = 404; 
        throw error; ;
      }

      res.status(200).json(pet);
    } catch (error) {
      next(error);
    }
  }

  async update(req = request, res = response, next){
      try {
        const { id } = req.params;
        const body = req.body;
        
        const updatePet = await petService.updatePet(id, body);
        res.status(200).json(updatePet);
  
      } catch (error) {
        next(error)
      }
    }
  
    async delete(req = request, res = response, next){
      try {
        const { id } = req.params;
        
        const deletePet = await petService.deletePet(id);
        res.status(200).json({message: `Mascota con el id ${id} eliminada`});
  
      } catch (error) {
        next(error)
      }
    }
}

export const petController = new PetController();
