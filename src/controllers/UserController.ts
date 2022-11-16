import { Request, Response } from "express";
import { AuthError, UserException } from "../Exceptions";
import { UserService } from "../services/UserService";


export class UserController {

  async register(req: Request, res: Response){
    const { name, email, password } = req.body;
    if(!name) {
      return res.status(400).json({ message: "O nome é obrigatório." })
    }
    if(!email) {
      return res.status(400).json({ message: "O email é obrigatório." })
    }
    if(!password) {
      return res.status(400).json({ message: "A senha é obrigatória." })
    }

    try {
      const userService = new UserService();
      const user = await userService.create({ name, email, password });
      return res.status(201).json({ user })
    } catch (error) {
      if(error instanceof UserException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }

  }

  async authenticate(req: Request, res: Response){
    const { email, password } = req.body;
    if(!email) {
      return res.status(400).json({ message: "O email é obrigatório." });
    }
    if(!password) {
      return res.status(400).json({ message: "A senha é obrigatória." });
    }
    try {
      const userService = new UserService();
      const authenticatedUser = await userService.validate({email, password });
      return res.status(201).json({ authenticatedUser });
    } catch (error) {
      console.log(error);
      if(error instanceof AuthError){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

}