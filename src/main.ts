import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({
    keys: ['abshikyiopo']
  }));
  
  
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  
  await app.listen(3000);
}
bootstrap();
