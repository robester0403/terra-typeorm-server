import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../posts/Post";

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column("varchar", { length: 100 })
  tag_name: string;

  @ManyToMany(() => Post)
  posts: Post[];
}
