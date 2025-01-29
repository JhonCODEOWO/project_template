import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //Habilitamos las transformaciones
      //Colocamos las optiones de transformación
      transformOptions: {
        enableImplicitConversion: true, //Se transformarán todos los datos hacia las reglas de los DTO
      },
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Plantilla NestJs')
    .setDescription('A api with some general settings')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT_PROJECT ?? 3000);
}
bootstrap();
