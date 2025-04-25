import { request, response } from "express";
import { adoptionService } from "./adoption.service.js";

class AdoptionController {

  async getAll(req = request, res = response, next) {
    try {
      const adoptions = await adoptionService.getAll();

      if (adoptions.length === 0) {
        const error = new Error('Lista de adopciones vacía');
        error.statusCode = 400; 
        throw error; 
      }

      res.json(adoptions);
    } catch (error) {
      next(error);
    }
  }

  async getById(req = request, res = response, next) {
    try {
      const { id } = req.params;
      const adoption = await adoptionService.getOne({ _id: id });

      if (!adoption) {
        const error = new Error('Adopción no encontrada');
        error.statusCode = 404; 
        throw error; 
      }

      res.status(200).json(adoption);
    } catch (error) {
      next(error);
    }
  }
  
  async create(req = request, res = response, next) {
    try {
      const { owner, pet } = req.body;
      const adoption = await adoptionService.create(owner, pet);

      res.status(201).json(adoption);
    } catch (error) {
      next(error);
    }
  }

  async delete(req = request, res = response, next){
    try {
      const { id } = req.params;
            
      const deleteAdoption = await adoptionService.delete(id);
      res.status(200).json({message: `Adopción ${deleteAdoption} ha sido eliminada`});
      
    } catch (error) {
      next(error)
    }
  }
}

export const adoptionController = new AdoptionController();
