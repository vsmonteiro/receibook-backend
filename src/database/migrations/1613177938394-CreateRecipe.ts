import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecipe1613177938394 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recipe",
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
            name: "name",
            type: "nvarchar",
          },
          {
            name: "description",
            type: "nvarchar",
          },
          {
            name: "prepare",
            type: "nvarchar",
          },
          {
            name: "externalLink",
            type: "nvarchar",
          },
          {
            name: "userId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "recipeUser",
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recipe");
  }
}
