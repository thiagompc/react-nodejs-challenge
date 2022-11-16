import { User } from "../../entities/User";

export interface DeletePostDTO {
  postId: number;
  userId: number;
}