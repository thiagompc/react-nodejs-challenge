import { CreatePostDTO } from "../dtos/post/Create";
import { DeletePostDTO } from "../dtos/post/Delete";
import { RetrievePostDTO } from "../dtos/post/Retrieve";
import { UpdatePostDTO } from "../dtos/post/Update";
import { PostException } from "../Exceptions";
import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";

export class PostService {
  private repository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.repository = new PostRepository();
    this.userRepository = new UserRepository();
  }
  
  async create({ content, userId }: CreatePostDTO) {
    const user = await this.userRepository.findById(userId);
    if(!user) {
      throw new PostException("Usuário não encontrado");
    }
    const post =await this.repository.create({
      content,
      userId
    });
    return post;
  }

  async delete({ postId, userId }: DeletePostDTO) {
    const post = await this.repository.findById(postId);
    if(!post) {
      throw new PostException("Post não encontrado.");
    }
    if(post.userId  != userId) {
      console.log(post.userId, userId);
      throw new PostException("Não é possível deletar posts de outros usuários.");
    }

    await this.repository.delete(postId);
  }

  async update({ postId, userId, content }: UpdatePostDTO) {
    const post = await this.repository.findById(postId);
    if(!post) {
      throw new PostException("Post não encontrado.");
    }
    if(post.userId  != userId) {
      throw new PostException("Não é possível editar posts de outros usuários.");
    }

    return await this.repository.update(postId, content)
  }

  async list() {
    const posts = await this.repository.findAll();
    return posts;
  }

  async retrieve({ postId }: RetrievePostDTO) {
    const post = await this.repository.findById(postId);
    if(!post) {
      throw new PostException("Post não encontrado.")
    }
    return post;
  }

  async listByUser(userId: number) {
    const posts = await this.repository.findAllByUserId(userId);
    return posts;
  }

}
