import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Ingredient from "./Ingredient";
import User from "./User";

@Entity("recipe")
export default class Recipe {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  prepare: string;

  @Column()
  externalLink: string;

  @ManyToMany(() => Ingredient)
  @JoinTable({ name: "recipe_ingredients" })
  ingredients: Ingredient[];

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: "userId" })
  user: string;
}
