import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string

export class TokenService {
  generate(id: number) {
    return jwt.sign({ id }, secret, { expiresIn: "2 days" });
  }

  validate(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) {
      return res.status(401).json({message: "Usuário não autenticado"});
    }

    jwt.verify(token, secret, (error: any, user: any) => {
      if(error) {
        console.log(error)
        return res.status(403).json({message: "Falha na autenticação"});
      }
      req.user = user;
      next();
    })
  }
}