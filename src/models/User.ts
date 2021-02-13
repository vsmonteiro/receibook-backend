import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import Recipe from "./Recipe";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "userId" })
  recipes: Recipe[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}
