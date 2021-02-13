import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("ingredient")
export default class Ingredient {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  quantity?: number;
}
