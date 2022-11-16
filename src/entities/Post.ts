import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  content: string

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({name: "userId"})
  user: User

  @Column()
  userId: number

}