import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@Root/app.module';
import { HttpExceptionFilter } from '@Common/filters/http-exception.filter';
import { TransformInterceptor } from '@Common/interfaces/transform.interceptor';
import { BaseAPIDocument } from '@Root/config/swagger.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('SERVER_PORT') ?? 8000;
  await app.listen(port);
}
bootstrap();
