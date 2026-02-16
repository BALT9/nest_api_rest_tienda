import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductoCategoriaTable1771274192258 implements MigrationInterface {
    name = 'CreateProductoCategoriaTable1771274192258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`descripcion\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`productos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(200) NOT NULL, \`descripcion\` text NULL, \`unidad_medida\` varchar(255) NULL, \`marca\` varchar(200) NULL, \`precio_venta_actual\` decimal(12,2) NOT NULL, \`imagen\` varchar(255) NULL, \`estado\` tinyint NOT NULL, \`categoriaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`productos\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
    }

}
