import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUsers1628604915760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "lastLogged" TIMESTAMP WITH TIME ZONE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogged";`);
  }
}
