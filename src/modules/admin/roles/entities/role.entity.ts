import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "../../permissions/entities/permission.entity";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string;

    @Column({nullable:true})
    description: string;

    @ManyToMany(()=> Permission, (permission)=> permission.roles, {eager:true})
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'rol_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[]
}
