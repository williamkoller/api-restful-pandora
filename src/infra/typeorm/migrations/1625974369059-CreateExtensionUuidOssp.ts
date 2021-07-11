import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExtensionUuidOssp1625974369059
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENDIOSN IF EXISTS "uuid-ossp";`);
  }
}
