import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tag } from "../tags/Tag";
import { User } from "../users/User";

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({
    name: "user_id", // name of the primary key for join
  })
  user: User; // specifying the alternate table we are referring to

  @ManyToMany(() => Tag)
  @JoinTable({
    name: "posts_tags",
    joinColumn: {
      name: "post",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
  })
  tags: Tag[];
}
