import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIngredient1613178271090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ingredient",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "increment",
            type: "integer",
          },
          {
            name: "name",
            type: "nvarchar",
          },
          {
            name: "quantity",
            type: "nvarchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ingredient");
  }
}
