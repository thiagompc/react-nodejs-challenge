import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreateUserDTO } from "../dtos/user/Create";
import { User } from "../entities/User";

export class UserRepository {
  private repository: Repository<User>
  constructor(){
    this.repository = AppDataSource.getRepository(User);
  }

  async create(body: CreateUserDTO){
    const user = this.repository.create(body);
    await this.repository.save(user);
    return user;
  }

  async delete(id: number){
    await this.repository.delete(id);
  }

  async findById(id: number){
    const user = await this.repository.findOne({
      where: {
        id
      }
    })
    return user;
  }

  async findByEmail(email: string){
    const user = await this.repository.findOne({
      where: {
        email
      }
    })
    return user;
  }

  async findAll(){
    const users = await this.repository.find();
    return users;
  }

}