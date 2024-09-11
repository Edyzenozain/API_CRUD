import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrearProductoDto } from './dto/crear-Producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuario/usuarios.service';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductosService {

    constructor(@InjectRepository(Producto) private Repositorio_Producto: Repository<Producto>,
                private Servicio_Usuario: UsuariosService){}

    async crearProducto(producto: CrearProductoDto){
        const encontrarUsuario = await this.Servicio_Usuario.listarUsuario(producto.usuariosId);
        
        if(!encontrarUsuario){
            return new HttpException('Usuario no existe',HttpStatus.NOT_FOUND);
        }

        const encontrarProducto = await this.Repositorio_Producto.findOne({
            where:{
                nombre:producto.nombre}
        });
        
        if(encontrarProducto){
            return new HttpException('Producto ya registrado',HttpStatus.CONFLICT);
        }

        const nuevoProducto = this.Repositorio_Producto.create(producto); 
        return this.Repositorio_Producto.save(nuevoProducto);
    }

    listarProductos(){
        return this.Repositorio_Producto.find({
            where:{estado: 1}, relations: ['usuarios']
        });
    }

    async listarProducto(id:number){
        const encontrarProducto = await this.Repositorio_Producto.findOne({
            where:{id}, relations: ['usuarios','categorias']
        })

        if(!encontrarProducto){
            return new HttpException('Producto no existe',HttpStatus.NOT_FOUND);
        }
        
        return encontrarProducto;
    }

    async actualizarProducto(id: number, producto:ActualizarProductoDto){
        const encontrarProducto = await this.Repositorio_Producto.findOne({
            where: {id}
        })

        if(!encontrarProducto){
            return new HttpException('Producto no existe',HttpStatus.NOT_FOUND);
        }

        const actualizarProducto =  Object.assign(encontrarProducto,producto);
        return this.Repositorio_Producto.save(actualizarProducto);
        
    }

    async eliminarProducto(id:number){
        const resultado = await this.Repositorio_Producto.delete({id})
        if(resultado.affected===0){
            return new HttpException('Producto no existe',HttpStatus.NOT_FOUND);
        }
        return resultado;
    }

}
