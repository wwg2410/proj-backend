import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Этот файл запускает приложение.
  // Сюда подключается NestJS, глобальная валидация и Swagger.
  const app = await NestFactory.create(AppModule);

  // Включаем CORS, чтобы frontend мог обращаться к API с другого домена.
  app.enableCors();

  // Глобальная валидация преобразует и проверяет входные данные по DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger нужен для красивой документации API.
  const config = new DocumentBuilder()
    .setTitle('Phone Store API')
    .setDescription('Простой backend для интернет-магазина телефонов на NestJS')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Запускаем сервер на порту 3000 по умолчанию.
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server started on http://localhost:3000');
  console.log('Swagger docs: http://localhost:3000/api/docs');
}

bootstrap().catch((error) => {
  console.error('Application startup failed', error);
  process.exit(1);
});
