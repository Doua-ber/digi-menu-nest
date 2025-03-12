import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ormconfig from './ormconfig';

async function bootstrap() {
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
  console.log(ormconfig.options);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Digital Menu API')
    .setDescription('API documentation for Digital Menu')
    .setVersion('1.0')
    .addTag('menu')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(/*process.env.PORT ?? */3000);
  
}
bootstrap();
 