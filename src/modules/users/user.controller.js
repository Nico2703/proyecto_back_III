import { request, response } from "express";
import { userService } from "./user.service.js";

class UserController {

  async createUsersMocks(req = request, res = response) {
    try {
      const { amount } =  req.params;
      const users = await userService.createUsersMocks(amount);

      res.status(201).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno de servidor" });
    }
  }

  async getAll(req = request, res = response) {
    try {
      const response = await userService.getAll();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "Error interno de servidor" });
    }
  }

  async getById(req = request, res = response, next) {
      try {
        const { id } = req.params;
        const user = await userService.getOne({ _id: id });
  
        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    }

}

export const userController = new UserController();
