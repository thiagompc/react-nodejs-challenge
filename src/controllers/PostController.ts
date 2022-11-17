import { Request, Response } from "express";
import { PostException, UserException } from "../Exceptions";
import { PostService } from "../services/PostService";

export class PostController {

  async create(req: Request, res: Response) {
    const { content } = req.body;
    const userId = req.user.id;
    try {
      const postService = new PostService();
      const post = await postService.create({ content, userId });
      return res.status(201).json({ post });
    } catch (error) {
      if(error instanceof PostException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
    
  }

  async delete(req: Request, res: Response) {
    const userId = req.user.id;
    const { id } = req.params;
    const postId = Number(id);
    try {
      const postService = new PostService();
      await postService.delete({ postId, userId });
      return res.status(204).send();
    } catch (error) {
      if(error instanceof PostException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    const postService = new PostService();
    const posts = await postService.list();
    return res.status(200).json(posts)
  }
  
  async retrieve(req: Request, res: Response) {
    const { id } = req.params;
    const postId = Number(id);
    try {      
      const postService = new PostService();
      const post = await postService.retrieve({ postId });
      return res.status(200).json(post);
    } catch (error) {
      if(error instanceof PostException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const postId = Number(id);
    const userId = req.user.id;
    const { content } = req.body;
    try {
      const postService = new PostService();
      const post = await postService.update({postId, userId, content});
      return res.status(200).json(post);
    } catch (error) {
      if(error instanceof PostException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listByUser(req: Request, res: Response) {
    const { id } = req.params;
    const userId = Number(id);
    try {
      const postService = new PostService();
      const posts = await postService.listByUser(userId);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error)
      if(error instanceof PostException){
        return res.status(400).json({ message: error.message });
      }
      if(error instanceof UserException){
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

}