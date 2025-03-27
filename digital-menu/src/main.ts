import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ormconfig from './ormconfig';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
  console.log(ormconfig.options);

  const app = await NestFactory.create(AppModule);

  // Assure-toi que cookie-parser est utilisé avant la configuration du CORS et Swagger
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:8081', 
    credentials: true
  }); 

  const config = new DocumentBuilder()
    .setTitle('Digital Menu API')
    .setDescription('API documentation for Digital Menu')
    .setVersion('1.0')
    .addTag('menu')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
