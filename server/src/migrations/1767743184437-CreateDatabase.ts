import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1767743184437 implements MigrationInterface {
    name = 'CreateDatabase1767743184437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`hashed_password\` varchar(255) NOT NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`is_2fa_enabled\` tinyint NOT NULL DEFAULT 0, \`is_admin\` tinyint NOT NULL DEFAULT 0, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_connected\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` (\`username\`, \`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f4ca2c1e7c96ae6e8a7cca9df8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
