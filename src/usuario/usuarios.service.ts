import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { actualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearDatosDto } from './dto/crear-datosUsuario.dto';
import { datosUsuario } from './datosUsuario.entity';
import { ActualizarDatosDto } from './dto/actualizar-datosUsuario.dto';

@Injectable()
export class UsuariosService {

    constructor(@InjectRepository(Usuario) private Repositorio_Usuario: Repository<Usuario>,
                @InjectRepository(datosUsuario) private Repositorio_Datos: Repository<datosUsuario>){}

    async CrearUsuario(usuario: CrearUsuarioDto){
        const encontrarUsuario = await this.Repositorio_Usuario.findOne({
            where:{
                user: usuario.user
            }
        })  

        if(encontrarUsuario){
            return new HttpException('Usuario ya registrado',HttpStatus.CONFLICT);
        }
        
        const nuevoUsuario = this.Repositorio_Usuario.create(usuario);
        return this.Repositorio_Usuario.save(nuevoUsuario);
    }

    listarUsuarios(){
        return this.Repositorio_Usuario.find({
            relations:['datos','productos'],
            where: { estado: 1 },
        });
    }

    async listarUsuario(id: number){
        const encontrarUsuario = await this.Repositorio_Usuario.findOne({
            where:{id}, relations:['datos','productos']
        })

        if(!encontrarUsuario){
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
        }

        return encontrarUsuario; 
    }

    async eliminarUsuario(id:number){
        const resultado = await this.Repositorio_Usuario.delete({id});

        if(resultado.affected===0){
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
        }

        return resultado;
    }

    async actualizarUsuario(id: number, usuario: actualizarUsuarioDto){
        const encontrarUsuario = await this.Repositorio_Usuario.findOne({
            where:{id}
        })
        if(!encontrarUsuario){
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
        }

        const actualizarUsuario = Object.assign(encontrarUsuario,usuario)
        return this.Repositorio_Usuario.save(actualizarUsuario);
    }

    //DATOS PERSONALES
    async crearDatosUsuario(id: number, datosPersonales: CrearDatosDto){
        const encontrarUsuario = await this.Repositorio_Usuario.findOne( { 
            where: { id }, relations: ['datos'] } ) 
        if(!encontrarUsuario){
            return new HttpException('Datos no encontrado',HttpStatus.NOT_FOUND);
        }

        const DatoNuevo = this.Repositorio_Datos.create(datosPersonales)
        const DatoGuardado = await this.Repositorio_Datos.save(DatoNuevo)
        
        encontrarUsuario.datos = DatoGuardado

        return this.Repositorio_Usuario.save(encontrarUsuario)
    }


    async listarDatosUsuario(id:number){
        const encontrarDatoUsuario = await this.Repositorio_Datos.findOne({
            where:{id, estado: 1}
        })

        if(!encontrarDatoUsuario){
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
        }

        return encontrarDatoUsuario;
    }

    async actualizarDatosUsuario(id:number, actualizarDato:ActualizarDatosDto){
        const encontrarUsuario = await this.Repositorio_Usuario.findOne( { where: { id } } ) 
        if(!encontrarUsuario){
            return new HttpException('Usuario no encontrado',HttpStatus.NOT_FOUND);
        }

        const datoActual = Object.assign(encontrarUsuario,actualizarDato);
        return this.Repositorio_Datos.save(datoActual);
    }

}
