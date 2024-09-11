import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'API.db',
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }), UsuarioModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
