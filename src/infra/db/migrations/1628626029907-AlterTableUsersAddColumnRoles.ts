import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUsersAddColumnRoles1628626029907
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "roles" character varying array;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles";`);
  }
}
