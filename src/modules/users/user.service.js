import { generateUsersMocks } from "../../mock/user.mock.js";
import { userDao } from "./user.dao.js";
import { createHash } from "../../common/utils/hashPassword.js";

class UserService{
  async createUsersMocks(amount){
    const users = generateUsersMocks(amount);

    await userDao.removeAll();

    for( const user of users) {
      await userDao.create(user);
    }

    return users;
  }

  async create(user) {
      const findUser = await userDao.getOne({ email: user.email });

      if (findUser) {
        const error = new Error("El usuario ya existe con ese email");
        error.statusCode = 400; 
        throw error; 
      }

      const newUserData = {
        ...user,
        password: createHash(user.password),
      };

      const newUser = await userDao.create(newUserData);
  
      return newUser;
  }

  async getAll() {
      const users = await userDao.getAll();
      return users;
    }
    
  async getOne(id) {
    const user = await userDao.getOne(id);
    return user;
  }

  async update(id, data){
    const user = await userDao.getOne({ _id: id });
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404; 
      throw error; ;
    }
    return await userDao.update(id, data);
  }
  
  async delete(id){
    const user = await userDao.getOne({ _id: id });
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404; 
      throw error; ;
    }
    return await userDao.remove(id);
  }

}

export const userService = new UserService();