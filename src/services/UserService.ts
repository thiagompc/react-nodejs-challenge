import { CreateUserDTO } from "../dtos/user/Create";
import { User } from "../entities/User";
import { PasswordService } from "./PasswordService";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AuthUserDTO } from "../dtos/user/Auth";
import { AuthError, UserException } from "../Exceptions";
import { TokenService } from "./TokenService";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private repository: UserRepository;
  private passwordService: PasswordService;
  private tokenService: TokenService;

  constructor() {
    this.repository = new UserRepository();
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  } 

  async create({ name, email, password }: CreateUserDTO) {
    const userExists = await this.repository.findByEmail(email);
    if(userExists) {
      throw new UserException("O e-mail já está cadastrado.");
    }
    const hashedPassword = await this.passwordService.encode(password);
    await this.repository.create({
      name,
      email,
      password:hashedPassword
    });
    return { name, email }
  }

  async validate({ email, password }: AuthUserDTO) {
    const user = await this.repository.findByEmail(email);
    if(!user) {
      throw new UserException("O usuário não existe.");
    }

    const validPassword = await this.passwordService.compare(password, user.password);
    if(!validPassword) {
      throw new AuthError("Falha na autenticação.");
    }
    const token = this.tokenService.generate(user.id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken: token
    }
  }
}