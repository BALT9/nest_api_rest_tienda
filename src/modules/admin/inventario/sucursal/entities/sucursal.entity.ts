import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Almacen } from "../../almacen/entities/almacen.entity";

@Entity('sucursales')
export class Sucursal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 225 })
    direccion: string;

    @Column({ length: 100 })
    ciudad: string;

    @OneToMany(()=> Almacen, almacen => almacen.sucursal)
    almacenes: Almacen[];
}
