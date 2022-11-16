import { CreateUserDTO } from "../dtos/user/Create";
import { User } from "../entities/User";
import { PasswordService } from "./PasswordService";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AuthUserDTO } from "../dtos/user/Auth";
import { AuthError } from "../Exceptions";
import { TokenService } from "./TokenService";

export class UserService {
  private repository: Repository<User>
  private passwordService: PasswordService;
  private tokenService: TokenService;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  } 

  async create({ name, email, password }: CreateUserDTO) {

    const hashedPassword = await this.passwordService.encode(password);
    const user = this.repository.create({
      name,
      email,
      password:hashedPassword
    });
    await this.repository.save(user);

    return { name, email }
  }

  async validate({ user, password }: AuthUserDTO) {
    const validPassword = await this.passwordService.compare(password, user.password);
    if(!validPassword) {
      throw new AuthError("Falha na autenticação.");
    }
    const token = this.tokenService.generate(user.email);
    return {
      email: user.email,
      name: user.name,
      accessToken: token
    }
  }
}