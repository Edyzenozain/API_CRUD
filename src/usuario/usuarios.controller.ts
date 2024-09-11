import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { actualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearDatosDto } from './dto/crear-datosUsuario.dto';
import { ActualizarDatosDto } from './dto/actualizar-datosUsuario.dto';

@Controller('usuario')
export class UsuariosController {

    constructor(private Servicio_Usuario:UsuariosService){}

    @Get()
    listarUsuarios(): Promise<Usuario[]>{
        return this.Servicio_Usuario.listarUsuarios();
    }

    @Get(':id')
    listarUsuario(@Param('id',ParseIntPipe) id: number){
        return this.Servicio_Usuario.listarUsuario(id);
    }

    @Post()
    crearUsuario(@Body() nuevoUsuario:CrearUsuarioDto){
        return this.Servicio_Usuario.CrearUsuario(nuevoUsuario);
    }

    @Delete(':id')
    eliminarUsuario(@Param('id',ParseIntPipe) id:number){
        return this.Servicio_Usuario.eliminarUsuario(id);
    }

    @Patch(':id')
    actualizarUsuario(@Param('id',ParseIntPipe) id: number, @Body() usuario: actualizarUsuarioDto){
        return this.Servicio_Usuario.actualizarUsuario(id,usuario)
    }


    //DATOS PERSONALES
    @Post(':id/DatosPersonales')
    crearDatosUsuario(@Param('id',ParseIntPipe) id:number, @Body() datosUsuario: CrearDatosDto){
        return this.Servicio_Usuario.crearDatosUsuario(id,datosUsuario);
    }

    @Get(':id/DatosPersonales')
    listarDatosUsuario(@Param('id',ParseIntPipe) id:number){
        return this.Servicio_Usuario.listarDatosUsuario(id);
    }

    @Patch(':id/DatosPersonales')
    actualizarDatosUsuario(@Param('id',ParseIntPipe) id: number,@Body() actualizarDato:ActualizarDatosDto){
        return this.Servicio_Usuario.actualizarDatosUsuario(id,actualizarDato);
    }
}
