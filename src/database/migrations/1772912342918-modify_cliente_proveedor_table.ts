import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyClienteProveedorTable1772912342918 implements MigrationInterface {
    name = 'ModifyClienteProveedorTable1772912342918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`stado\` \`estado\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`identificacion\` \`identificacion\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`telefono\` \`telefono\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`direccion\` \`direccion\` varchar(225) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`correo\` \`correo\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`estado\` \`estado\` tinyint NULL`);
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
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_6b86c0b2260b156dab7e1da872b\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_bb83d42e45a0025561edbf6652a\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` DROP FOREIGN KEY \`FK_f0715d29735042ca1b992a550ab\``);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`observaciones\` \`observaciones\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`notaId\` \`notaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`productoId\` \`productoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`almacenId\` \`almacenId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notas\` DROP FOREIGN KEY \`FK_d5012b51542e1b0f08ecbb112ef\``);
        await queryRunner.query(`ALTER TABLE \`notas\` DROP FOREIGN KEY \`FK_4037433a40a6d913c18a9ea6948\``);
        await queryRunner.query(`ALTER TABLE \`notas\` CHANGE \`clienteId\` \`clienteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notas\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`notas\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notas\` CHANGE \`clienteId\` \`clienteId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notas\` ADD CONSTRAINT \`FK_4037433a40a6d913c18a9ea6948\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notas\` ADD CONSTRAINT \`FK_d5012b51542e1b0f08ecbb112ef\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente_proveedor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`almacenId\` \`almacenId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`productoId\` \`productoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`notaId\` \`notaId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` CHANGE \`observaciones\` \`observaciones\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_f0715d29735042ca1b992a550ab\` FOREIGN KEY (\`almacenId\`) REFERENCES \`almacenes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_bb83d42e45a0025561edbf6652a\` FOREIGN KEY (\`productoId\`) REFERENCES \`productos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movimientos\` ADD CONSTRAINT \`FK_6b86c0b2260b156dab7e1da872b\` FOREIGN KEY (\`notaId\`) REFERENCES \`notas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`estado\` \`estado\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`correo\` \`correo\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`direccion\` \`direccion\` varchar(225) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`telefono\` \`telefono\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`identificacion\` \`identificacion\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`route\` \`route\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cliente_proveedor\` CHANGE \`estado\` \`stado\` tinyint NULL DEFAULT 'NULL'`);
    }

}
