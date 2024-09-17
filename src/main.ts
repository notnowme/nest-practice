import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http.exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 예외 처리 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter);

  // Swagger 설정
  const config = new DocumentBuilder()
  .setTitle('Board Test')
  .setDescription('Nestjs board practice')
  .setVersion('1.0')
  .addTag('Board')
  .build();

  // Swagger 등록
  const document = SwaggerModule.createDocument(app, config);

  // Swagger 주소 => localhost:3000/swagger
  // 인자를 받아서 원하는 주소로 설정할 수 있음 
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
