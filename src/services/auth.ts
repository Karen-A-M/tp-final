import Auth from "../models/auth";
import { v4 as uuidv4 } from "uuid";
import UserService from "./users";
import { authValidator } from "../schemas/auth";
import { createSaltAndHash, UUID } from "../utils/create-hash";
import { loginValidator } from "../schemas/auth";

class AuthService {
  static async register(data) {
    try {
      const result = authValidator(data)
      if (!result.success) {
        const error = new Error("Datos inválidos");
        error["statusCode"] = 400

        throw error
      }
      const { password, ...user } = result.data
      
      const findEmail = await UserService.getEmail(user.email)
      if (findEmail) {
        const error = new Error("El email ya existe");
        error["statusCode"] = 400

        throw error
      }

      const userId = await UserService.create(user)
      const id = uuidv4()
      const salt = UUID()
      const hashedPassword = createSaltAndHash(password, salt);
      await Auth.create({id: id, UserId: userId, password: hashedPassword})
     
    } catch (error) {
      throw error;
    }
  }
  static async login(data){
    try {
      const result = loginValidator(data)
      if (!result.success) {
        const error = new Error("Datos inválidos");
        error["statusCode"] = 400

        throw error
      }
      const { password, email } = result.data

      const user = await UserService.getEmail(email)
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 400

        throw error
      }
    
      const userId = user.id
      const userAuth = await this.getById(userId)
      const [salt, hash] = userAuth.password.split(":");
      if (createSaltAndHash(salt, password) == userAuth.password) { 
        
      }

    } catch (error) {
      throw error
      
    }
  }
  static async getById(userId) {
    try {
      const userAuth = await Auth.findOne({ where: { UserId: userId } });
      return userAuth.dataValues;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;