import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { CreatePostDTO } from "../dtos/post/Create";
import { UpdatePostDTO } from "../dtos/post/Update";
import { Post } from "../entities/Post";

export class PostRepository {
  private repository: Repository<Post>
  constructor(){
    this.repository = AppDataSource.getRepository(Post);
  }

  async create(body: CreatePostDTO){
    const post = this.repository.create(body);
    await this.repository.save(post);
    return post;
  }

  async update(id: number, content: string){
    const post = this.findById(id);
    if(!post){
      throw Error("Post não encontrado.")
    }
    return this.repository.save({
      id,
      content
    });
  }

  async delete(id: number){
    await this.repository.delete(id);
  }

  async findById(id: number){
    const post = await this.repository.findOne({
      where: {
        id: id
      }
    })
    return post;
  }

  async findAll(){
    const posts = await this.repository.find();
    return posts;
  }

}