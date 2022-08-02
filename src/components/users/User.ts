import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { Post } from "../posts/Post";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column("varchar", { length: 100 })
  email: string;

  @Column("varchar", { length: 100 })
  password: string;

  @Column("varchar", { length: 100 })
  first_name: string;

  @Column("varchar", { length: 100 })
  last_name: string;

  @Column("varchar", { length: 500, nullable: true })
  profile_picture_url: string;

  @Column("varchar", { length: 255, nullable: true })
  address: string;

  @Column("varchar", { length: 25, nullable: true })
  zipcode: string;

  @Column("varchar", { length: 25, nullable: true })
  telephone: string;

  @CreateDateColumn()
  date_joined: Date; // note this auto sets Date no value needed

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
