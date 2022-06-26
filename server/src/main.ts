import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { contentParser } from 'fastify-multer';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function start() {
  /*const httpsOptions = {
    key: fs.readFileSync(path.resolve('../server/certs/key.pem')),
    cert: fs.readFileSync(path.resolve('../server/certs/certificate.pem')),
  };*/
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(/*{ https: httpsOptions }*/)
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useStaticAssets({ root: join(__dirname, '..', 'static') });

  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.register(contentParser);
  await app.listen(5000, '0.0.0.0');
}

start();
