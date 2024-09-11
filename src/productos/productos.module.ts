import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { UsuarioModule } from 'src/usuario/usuarios.module';

@Module({
  imports:[TypeOrmModule.forFeature([Producto]),UsuarioModule],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
