import { createHash, isValidPassword } from "../../common/utils/hashPassword.js";
import { createToken } from "../../common/utils/jwt.js";
import { logger } from "../../common/utils/logger.js";
import { userDao } from "../users/user.dao.js";

class AuthService {
  async registerUser(user) {
    const findUser = await userDao.getOne({ email: user.email });
    if (findUser) {
      const error = new Error("El usuario ya existe con ese email");
      error.statusCode = 404; 
      throw error; 
    }

    const newUserData = {
      ...user,
      password: createHash(user.password),
    };
    const newUser = await userDao.create(newUserData);

    return newUser;
  }

  async login(email, password) {
    logger.debug("Iniciando login en el servicio");
    const findUser = await userDao.getOne({ email });
    if (!findUser || !isValidPassword(findUser, password)) {
      const error = new Error("Email o password no válido");
      error.statusCode = 404; 
      throw error; 
    }

    const token = createToken(findUser);
    logger.debug(`Token: ${token}`);
    return { user: findUser, token };
  }
}

export const authService = new AuthService();
