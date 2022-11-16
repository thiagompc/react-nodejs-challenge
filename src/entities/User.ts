import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Post } from "./Post";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Post, post => post.user)
  posts: Post[]
}