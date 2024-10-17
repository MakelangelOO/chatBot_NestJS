
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //configuration for automatic generation of API documentation with Swagger
  const config = new DocumentBuilder()
  .setTitle('Chat Bot Nest')
  .setDescription('simple API endpoint for bot chat')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document)

  await app.listen(process.env.PORT ?? 3000); // initialize server
}
bootstrap();
