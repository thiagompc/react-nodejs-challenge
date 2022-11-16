import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string

export class TokenService {
  generate(email: string) {
    return jwt.sign({ email }, secret, { expiresIn: "1800" });
  }

  validate(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) {
      return res.status(401).json({message: "Usuário não autenticado"});
    }

    jwt.verify(token, secret, (error: any, user: any) => {
      if(error) {
        return res.status(403).json({message: "Falha na autenticação"});
      }
      req.user = user;
      next();
    })
  }
}