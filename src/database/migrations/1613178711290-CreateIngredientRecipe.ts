import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIngredientRecipe1613178711290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recipe_ingredients",
        columns: [
          {
            name: "id",
            type: "integer",
            isGenerated: true,
            generationStrategy: "increment",
            isUnique: true,
            isPrimary: true,
          },
          {
            name: "recipeId",
            type: "integer",
            isNullable: false,
          },
          {
            name: "ingredientId",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "recipeFk",
            columnNames: ["recipeId"],
            referencedTableName: "recipe",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "ingredientFk",
            columnNames: ["ingredientId"],
            referencedTableName: "ingredient",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recipe_ingredients");
  }
}
