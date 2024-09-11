import { IsInt, MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Datos_Personales')
export class datosUsuario{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
    
    @Column()
    apellido: string;
    
    @Column()
    @MinLength(8)
    @MaxLength(8)
    @IsInt()
    dni: number;
    
    @Column()
    @MaxLength(2)
    @IsInt()
    edad: number;

    @Column( { nullable: true } )
    @MinLength(9)
    @IsInt()
    telefono: number;

    @Column({ type: 'integer', default: 1 }) // 1: habilitado, 0: deshabilitado
    estado: number;

}