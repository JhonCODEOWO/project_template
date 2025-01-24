<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Template NestJs Project
Plantilla de NestJs que incluye ya configuradas las funcionalidades principales y algunos ajustes generales:

- **Usuarios**: Contiene la configuración de entidades y endpoints para manipular a una entidad Usuario, con datos predefinidos que puedes editar para tus soluciones.

- **Autorización**: Incluye toda la configuración (Estrategia, registro de Jwt en el módulo y Passport) e instalación de paquetes para manejar el inicio de sesión de los usuarios mediante **bearer token** y un cierre de sesión de 8h, así como la regeneración de un token nuevo para extender sesiones.

- **Dockerización**: Incluye un archivo docker-compose para lanzar una imagen de mysql y tener inmediatamente una base de datos lista para usar.

## ¿Cómo utilizarla?
1. Clona este repositorio en tu dispositivo
2. Ejecuta el comando `npm install` para tener todos los paquetes listos
3. Ejecuta `docker-compose up -d` para correr la imagen incluida (Si no quieres usar mysql solo editala para adaptarla a tu base de datos)
4. Copia y pega el archivo `.env.example` o bien solo renombralo si no quieres mantener el ejemplo y coloca los datos correspondientes para las variables de entorno.
5. Ahora deberías poder utilizar los endpoints de la plantilla.
6. Prueba utilizando la ruta `api/seed` esto generará los permisosos (Por defecto 3: create, update y delete), crerá un rol llamado admin con todos los permisos y un usuario el cuál tendrá el rol de admin.
7. Si esa ruta se ejecutó correctamente y sin ningún error, ya tienes listo tu plantilla para iniciar a readaptarla para tus necesidades.

## Notas
Si deseas utilizar otro tipo de base de datos debes instalar igualmente el paquete que permite a TypeOrm utilizarlo, así como verificar que las credenciales esten correctamente colocadas para esa base de datos además de editar los decoradores de las entidades por los tipos que sean compatibles con ella.

Si deseas cambiar los datos de la entidad de un usuario solo añade las demás propiedades siempre verificando la compatibilidad de los tipos de dato con la base de datos.

