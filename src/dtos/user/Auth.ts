import { User } from "../../entities/User"

export interface AuthUserDTO {
  user: User
  password: string
}