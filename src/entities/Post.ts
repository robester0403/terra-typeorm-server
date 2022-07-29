import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  picture_url: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date_created: Date;

  // @ManyToOne(
  //   () => User,
  //   user => user.post
  // )
  // @JoinColumn
}
