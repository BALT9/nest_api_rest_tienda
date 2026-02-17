import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductoAlmacenSucursalTable1771342815898 implements MigrationInterface {
    name = 'CreateProductoAlmacenSucursalTable1771342815898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`almacenes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`codigo\` varchar(100) NULL, \`descripcion\` text NULL, \`sucursalId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sucursales\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(100) NOT NULL, \`direccion\` varchar(225) NOT NULL, \`ciudad\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`almacen_producto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidad_actual\` int NOT NULL, \`fecha_actualizacion\` date NOT NULL, \`almacenId\` int NULL, \`productoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`unidad_medida\` \`unidad_medida\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`marca\` \`marca\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`imagen\` \`imagen\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`categoriaId\` \`categoriaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` ADD CONSTRAINT \`FK_f925acc11f5654a6be6ba3855fa\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_696fa0d027c3bfd994ab1b8ecaa\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_87fdbb2b70a59565ceca5e2a428\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_87fdbb2b70a59565ceca5e2a428\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_696fa0d027c3bfd994ab1b8ecaa\``);
        await queryRunner.query(`ALTER TABLE \`almacenes\` DROP FOREIGN KEY \`FK_f925acc11f5654a6be6ba3855fa\``);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`categoriaId\` \`categoriaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`imagen\` \`imagen\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`marca\` \`marca\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`unidad_medida\` \`unidad_medida\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`almacen_producto\``);
        await queryRunner.query(`DROP TABLE \`sucursales\``);
        await queryRunner.query(`DROP TABLE \`almacenes\``);
    }

}
