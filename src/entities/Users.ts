import { Entity, BaseEntity, Column, CreateDateColumn } from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @Column({ unique: true })
  userId: string;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  date_joined: Date;
}
