import { request, response } from "express";
import { petService } from "./pet.service.js";

class PetController {

  async createPetsMocks(req = request, res = response) {
    try {
      const { amount } = req.params;
      const pets = await petService.createPetsMocks(amount);

      res.status(201).json(pets);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno de servidor" });
    }
  }

  async getAll(req = request, res = response) {
    try {
      const response = await petService.getAll();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Error interno de servidor" });
    }
  }

  async getById(req = request, res = response, next) {
    try {
      const { id } = req.params;
      const pet = await petService.getOne({ _id: id });

      res.status(200).json(pet);
    } catch (error) {
      next(error);
    }
  }
}

export const petController = new PetController();
