import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AllExceptionsFilter,
  ValidationExceptionFilter,
} from './all-exception.filters';
import { ResponseTransformInterceptor } from './interceptor/transform.response.interceptor';
import { AdminApiModule } from './admin-api.module';
import { UserApiModule } from './user-api.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'debug', 'error', 'verbose', 'warn'],
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        logger.error('exceptionFactory', errors);
        return new BadRequestException(errors);
      },
    }),
  );
  // app.useGlobalInterceptors(new TransformInterceptor());
  const options = new DocumentBuilder()
    .setTitle(`API ${process.env.NODE_ENV}`)
    .setDescription('API Admin <br> <a href="">유저 api로 이동</a>')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'Bearer ',
      in: 'header',
      name: 'Authorization',
      description: '로그인 후 받는 토큰 입력',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [AdminApiModule],
  });
  SwaggerModule.setup('api/admin', app, document);

  const options2 = new DocumentBuilder()
    .setTitle(`API ${process.env.NODE_ENV}`)
    .setDescription('API User <br> <a href="">어드민 api로 이동</a>')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'Bearer ',
      in: 'header',
      name: 'Authorization',
      description: '로그인 후 받는 토큰 입력',
    })
    .build();
  const document2 = SwaggerModule.createDocument(app, options2, {
    include: [UserApiModule],
  });
  SwaggerModule.setup('api/user', app, document2);
  const port = 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${port}`);
}
bootstrap();
