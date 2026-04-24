import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: 'info' } }),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //   }),
  // );

  app.enableShutdownHooks();

  await app.init();
  const server = app.getHttpAdapter().getInstance();
  console.log(server.printRoutes());

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
bootstrap();
