import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
  })

  const options = new DocumentBuilder()
    .setTitle(`REST-API Gamificación.`)
    .setDescription(`Un servicio REST-API sobre gamificación.`)
    .setVersion(`1.0`)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`docs`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(80); // TODO-stabilization_of_environments -> port in Production
  // await app.listen(3000);// TODO-stabilization_of_environments -> port in Development
}
bootstrap();
