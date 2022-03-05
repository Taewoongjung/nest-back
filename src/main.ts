import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {HttpExceptionFilter} from "../httpException.filter";
import {ValidationPipe} from "@nestjs/common";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
      .setTitle('Sleact API')
      .setDescription('Sleact 개발을 위한 API 문서입니다.')
      .setVersion('1.0')
      .addCookieAuth('connect.sid')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //  '/api 의 문서들을 만들어준다.

  app.use(cookieParser());
  app.use(
      session({
        resave: false,
        saveUinitialized: false,
        secret: process.env.SECRET,
        cookie: {
            httpOnly: true,
        },
      }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close);
  }
}
bootstrap();
