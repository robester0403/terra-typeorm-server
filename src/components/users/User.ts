import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Post } from "../posts/Post";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  picture_url: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  date_joined: Date; // note this auto sets Date no value needed

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
