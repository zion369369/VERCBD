import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors();

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('VERC API')
    .setDescription('The API documentation for Village Education Resource Center website')
    .setVersion('1.0')
    .addTag('programs')
    .addTag('news')
    .addTag('stories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
