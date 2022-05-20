import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {join} from 'path';
import {contentParser} from 'fastify-multer'

async function start() {
    const fAdapter = new FastifyAdapter()
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fAdapter);
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api')
    app.enableCors()
    app.useStaticAssets({root: join(__dirname, '..', 'static')})
    await app.register(contentParser)
    await app.listen(5000, '0.0.0.0');

}

start();
