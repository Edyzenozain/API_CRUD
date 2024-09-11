import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { datosUsuario } from "./datosUsuario.entity";
import { Producto } from "src/productos/producto.entity";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    user: string;
    
    @Column()
    password: string;
    
    @Column({type:'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({ type: 'integer', default: 1 }) // 1: habilitado, 0: deshabilitado
    estado: number;

    @OneToOne(()=>datosUsuario) //{cascade: true}
    @JoinColumn()
    datos:datosUsuario;

    @OneToMany(() => Producto, producto => producto.usuarios)
    productos: Producto[];

}