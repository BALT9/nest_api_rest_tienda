import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSucursalUserTable1771347152136 implements MigrationInterface {
    name = 'CreateSucursalUserTable1771347152136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sucursal_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(36) NULL, \`sucursalId\` int NULL, \`roleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` DROP FOREIGN KEY \`FK_f925acc11f5654a6be6ba3855fa\``);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`codigo\` \`codigo\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`sucursalId\` \`sucursalId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_696fa0d027c3bfd994ab1b8ecaa\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_87fdbb2b70a59565ceca5e2a428\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` CHANGE \`almacenId\` \`almacenId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` CHANGE \`productoId\` \`productoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`unidad_medida\` \`unidad_medida\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`marca\` \`marca\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`imagen\` \`imagen\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`categoriaId\` \`categoriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` ADD CONSTRAINT \`FK_f925acc11f5654a6be6ba3855fa\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_7ac706d1ad541e840a22fbf480b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_f67bf385e4972c663b4b3dfbe46\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_5e018fcddfeb91abab238e7c756\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_696fa0d027c3bfd994ab1b8ecaa\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_87fdbb2b70a59565ceca5e2a428\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_87fdbb2b70a59565ceca5e2a428\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_696fa0d027c3bfd994ab1b8ecaa\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_5e018fcddfeb91abab238e7c756\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_f67bf385e4972c663b4b3dfbe46\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_7ac706d1ad541e840a22fbf480b\``);
        await queryRunner.query(`ALTER TABLE \`almacenes\` DROP FOREIGN KEY \`FK_f925acc11f5654a6be6ba3855fa\``);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`categoriaId\` \`categoriaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`imagen\` \`imagen\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`marca\` \`marca\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`unidad_medida\` \`unidad_medida\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` CHANGE \`productoId\` \`productoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` CHANGE \`almacenId\` \`almacenId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_87fdbb2b70a59565ceca5e2a428\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_696fa0d027c3bfd994ab1b8ecaa\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`sucursalId\` \`sucursalId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`codigo\` \`codigo\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` ADD CONSTRAINT \`FK_f925acc11f5654a6be6ba3855fa\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`sucursal_user\``);
    }

}
