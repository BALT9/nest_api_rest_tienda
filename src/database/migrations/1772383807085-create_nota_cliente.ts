import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotaCliente1772383807085 implements MigrationInterface {
    name = 'CreateNotaCliente1772383807085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cliente_proveedor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tipo\` varchar(255) NOT NULL, \`razon_social\` varchar(225) NOT NULL, \`identificacion\` varchar(100) NULL, \`telefono\` varchar(20) NULL, \`direccion\` varchar(225) NULL, \`correo\` varchar(200) NULL, \`stado\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movimientos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidad\` int NOT NULL, \`tipo_movimiento\` varchar(20) NOT NULL, \`precio_unitario_compra\` decimal(12,2) NOT NULL, \`precio_unitario_venta\` decimal(12,2) NOT NULL, \`observaciones\` text NULL, \`notaId\` int NULL, \`productoId\` int NULL, \`almacenId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` datetime NOT NULL, \`tipo_nota\` varchar(255) NOT NULL, \`estado_nota\` varchar(50) NOT NULL, \`observaciones\` varchar(50) NOT NULL, \`clienteId\` int NULL, \`userId\` varchar(36) NULL, UNIQUE INDEX \`IDX_b96326a7b67dcea6caea376982\` (\`fecha\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_7ac706d1ad541e840a22fbf480b\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_f67bf385e4972c663b4b3dfbe46\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_5e018fcddfeb91abab238e7c756\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`sucursalId\` \`sucursalId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`roleId\` \`roleId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` DROP FOREIGN KEY \`FK_f925acc11f5654a6be6ba3855fa\``);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`codigo\` \`codigo\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`descripcion\` \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`sucursalId\` \`sucursalId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_7ac706d1ad541e840a22fbf480b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_f67bf385e4972c663b4b3dfbe46\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_5e018fcddfeb91abab238e7c756\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` ADD CONSTRAINT \`FK_f925acc11f5654a6be6ba3855fa\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_696fa0d027c3bfd994ab1b8ecaa\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` ADD CONSTRAINT \`FK_87fdbb2b70a59565ceca5e2a428\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`productos\` ADD CONSTRAINT \`FK_aee00189e42dd8880cdfe1bb1e7\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_6b86c0b2260b156dab7e1da872b\` FOREIGN KEY (\`notaId\`) REFERENCES \`notas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_bb83d42e45a0025561edbf6652a\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_f0715d29735042ca1b992a550ab\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notas\` ADD CONSTRAINT \`FK_d5012b51542e1b0f08ecbb112ef\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente_proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notas\` ADD CONSTRAINT \`FK_4037433a40a6d913c18a9ea6948\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notas\` DROP FOREIGN KEY \`FK_4037433a40a6d913c18a9ea6948\``);
        await queryRunner.query(`ALTER TABLE \`notas\` DROP FOREIGN KEY \`FK_d5012b51542e1b0f08ecbb112ef\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_f0715d29735042ca1b992a550ab\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_bb83d42e45a0025561edbf6652a\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_6b86c0b2260b156dab7e1da872b\``);
        await queryRunner.query(`ALTER TABLE \`productos\` DROP FOREIGN KEY \`FK_aee00189e42dd8880cdfe1bb1e7\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_87fdbb2b70a59565ceca5e2a428\``);
        await queryRunner.query(`ALTER TABLE \`almacen_producto\` DROP FOREIGN KEY \`FK_696fa0d027c3bfd994ab1b8ecaa\``);
        await queryRunner.query(`ALTER TABLE \`almacenes\` DROP FOREIGN KEY \`FK_f925acc11f5654a6be6ba3855fa\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_5e018fcddfeb91abab238e7c756\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_f67bf385e4972c663b4b3dfbe46\``);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` DROP FOREIGN KEY \`FK_7ac706d1ad541e840a22fbf480b\``);
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
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`sucursalId\` \`sucursalId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` CHANGE \`codigo\` \`codigo\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`almacenes\` ADD CONSTRAINT \`FK_f925acc11f5654a6be6ba3855fa\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`roleId\` \`roleId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`sucursalId\` \`sucursalId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_5e018fcddfeb91abab238e7c756\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_f67bf385e4972c663b4b3dfbe46\` FOREIGN KEY (\`sucursalId\`) REFERENCES \`sucursales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sucursal_user\` ADD CONSTRAINT \`FK_7ac706d1ad541e840a22fbf480b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categoria\` CHANGE \`descripcion\` \`descripcion\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_b96326a7b67dcea6caea376982\` ON \`notas\``);
        await queryRunner.query(`DROP TABLE \`notas\``);
        await queryRunner.query(`DROP TABLE \`movimientos\``);
        await queryRunner.query(`DROP TABLE \`cliente_proveedor\``);
    }

}
