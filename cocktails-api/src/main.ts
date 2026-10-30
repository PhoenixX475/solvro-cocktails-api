import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Data input validation
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, 
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    }),
  );

  //Swagger Config
  const config = new DocumentBuilder().setTitle('Cocktails API').build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
