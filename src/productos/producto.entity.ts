import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( { unique:true } )
    nombre: string;
    
    @Column()
    stock: number;
    
    @Column( { type: 'float' } )
    precio: number;

    @Column({ type: 'integer', default: 1 }) // 1: habilitado, 0: deshabilitado
    estado: number;
    
    @Column({ type: 'datetime', default: ()=>'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column()
    usuariosId: number;

    @ManyToOne(()=> Usuario, usuario=>usuario.productos)
    usuarios: Usuario;
}