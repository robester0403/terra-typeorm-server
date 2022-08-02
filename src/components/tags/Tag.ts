import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../posts/Post";

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @ManyToMany(() => Post)
  posts: Post[];
}
