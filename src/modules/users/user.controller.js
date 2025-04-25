import { request, response } from "express";
import { userService } from "./user.service.js";

class UserController {

  async createUsersMocks(req = request, res = response, next) {
    try {
      const { amount } =  req.params;
      const users = await userService.createUsersMocks(amount);

      res.status(201).json(users);
    } catch (error) {
      next(error);
    }
  }

  async create(req = request, res = response, next) {
    try {
      const body = req.body;
      const user = await userService.create(body);
        
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req = request, res = response, next) {
    try {
      const users = await userService.getAll();

      if (users.length === 0) {
        const error = new Error('Lista de usuarios vacía');
        error.statusCode = 400; 
        throw error; 
      }

      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req = request, res = response, next) {
    try {
      const { id } = req.params;
      const user = await userService.getOne({ _id: id });
        
      if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404; 
        throw error; 
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req = request, res = response, next){
    try {
      const { id } = req.params;
      const body = req.body;
          
      const updateUser = await userService.update(id, body);
      res.status(200).json(updateUser);
    
    } catch (error) {
      next(error)
    }
  }
    
  async delete(req = request, res = response, next){
    try {
      const { id } = req.params;
          
      const deleteUser = await userService.delete(id);
      res.status(200).json({message: `Usuario ${deleteUser} ha sido eliminado`});
    
    } catch (error) {
      next(error)
    }
  }

}

export const userController = new UserController();
