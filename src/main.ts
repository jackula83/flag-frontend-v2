import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const port = 4000;
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening on port ${port}`)
  }).catch(err => console.log(err));
}
bootstrap();
