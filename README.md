# API de Gestión de Usuarios y Productos

Este proyecto es una API construida con NestJS que gestiona usuarios y productos utilizando SQLite como base de datos. El proyecto incluye módulos para usuarios y productos, así como servicios y controladores para manejar la lógica de negocio.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Descripción de los Módulos](#descripción-de-los-módulos)
- [Endpoints](#endpoints)

## Requisitos

- Node.js v12.x o superior
- npm (v6 o superior) o yarn
- NestJS CLI

## Instalación

1. Clona el repositorio:

```bash
git clone <URL-del-repositorio>
cd <nombre-del-proyecto>
```

2. Instala las dependencias:

```bash
npm install
```

## Ejecución

Para ejecutar la aplicación en modo de desarrollo, usa el comando:

```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
src/
│
├── app.module.ts                  # Módulo principal
├── usuario/
│   ├── usuarios.module.ts         # Módulo de usuarios
│   ├── usuarios.controller.ts     # Controlador de usuarios
│   ├── usuarios.service.ts        # Servicio de usuarios
│   ├── usuario.entity.ts          # Entidad Usuario
│   ├── datosUsuario.entity.ts     # Entidad Datos Usuario
│   └── dto/                       # Data Transfer Objects (DTO) para usuarios
│       ├── crear-usuario.dto.ts
│       ├── actualizar-usuario.dto.ts
│       ├── crear-datosUsuario.dto.ts
│       └── actualizar-datosUsuario.dto.ts
│
├── productos/
│   ├── productos.module.ts        # Módulo de productos
│   ├── productos.controller.ts    # Controlador de productos
│   ├── productos.service.ts       # Servicio de productos
│   ├── producto.entity.ts         # Entidad Producto
│   └── dto/                       # Data Transfer Objects (DTO) para productos
│       ├── crear-Producto.dto.ts
│       └── actualizar-producto.dto.ts
│
└── main.ts                        # Punto de entrada de la aplicación
```

## Descripción de los Módulos

### Módulo de Usuarios

- **Entidad Usuario (`usuario.entity.ts`)**: Define la estructura del usuario en la base de datos.
- **Entidad Datos Usuario (`datosUsuario.entity.ts`)**: Define datos adicionales para un usuario.
- **Controlador Usuarios (`usuarios.controller.ts`)**: Maneja las solicitudes HTTP relacionadas con los usuarios.
- **Servicio Usuarios (`usuarios.service.ts`)**: Contiene la lógica de negocio para la gestión de usuarios.

### Módulo de Productos

- **Entidad Producto (`producto.entity.ts`)**: Define la estructura del producto en la base de datos.
- **Controlador Productos (`productos.controller.ts`)**: Maneja las solicitudes HTTP relacionadas con los productos.
- **Servicio Productos (`productos.service.ts`)**: Contiene la lógica de negocio para la gestión de productos.

## Endpoints

### Usuarios

- `GET /usuario`: Lista todos los usuarios.
- `GET /usuario/:id`: Obtiene un usuario por su ID.
- `POST /usuario`: Crea un nuevo usuario.
- `DELETE /usuario/:id`: Elimina un usuario por su ID.
- `PATCH /usuario/:id`: Actualiza un usuario por su ID.

#### Datos Personales de Usuarios

- `POST /usuario/:id/DatosPersonales`: Crea datos personales para un usuario.
- `GET /usuario/:id/DatosPersonales`: Lista los datos personales de un usuario.
- `PATCH /usuario/:id/DatosPersonales`: Actualiza los datos personales de un usuario.

### Productos

- `POST /productos`: Crea un nuevo producto.
- `GET /productos`: Lista todos los productos.
- `GET /productos/:id`: Obtiene un producto por su ID.
- `PATCH /productos/:id`: Actualiza un producto por su ID.
- `DELETE /productos/:id`: Elimina un producto por su ID.

## Configuración de la Base de Datos

El proyecto utiliza SQLite como base de datos y está configurado en `app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'API.db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
```


