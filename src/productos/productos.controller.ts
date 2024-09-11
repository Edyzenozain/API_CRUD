import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-Producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {
    
    constructor(private Servicio_Producto:ProductosService){}

    @Post()
    crearProducto(@Body() nuevoProducto: CrearProductoDto){
        return this.Servicio_Producto.crearProducto(nuevoProducto);
    }

    @Get()
    listarProductos(){
        return this.Servicio_Producto.listarProductos();
    }

    @Get(':id')
    listarProducto(@Param('id',ParseIntPipe) id:number){
        return this.Servicio_Producto.listarProducto(id);
    }

    @Patch(':id')
    actualizarProducto(@Param('id',ParseIntPipe) id:number, @Body() actualizarProducto:ActualizarProductoDto){
        return this.Servicio_Producto.actualizarProducto(id,actualizarProducto);
    }

    @Delete(':id')
    eliminarProducto(@Param('id',ParseIntPipe) id:number){
        return this.Servicio_Producto.eliminarProducto(id);
    }

}
