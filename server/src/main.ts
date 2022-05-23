import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {join} from 'path';
import {contentParser} from 'fastify-multer'
import {DocumentBuilder, OpenAPIObject, SwaggerDocumentOptions, SwaggerModule} from "@nestjs/swagger";
import {UsersModule} from "./users/users.module";

async function start() {
    const fAdapter = new FastifyAdapter()
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fAdapter);


    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix('api')
    app.enableCors()
    app.useStaticAssets({root: join(__dirname, '..', 'static')})

    const config = new DocumentBuilder().addBearerAuth().build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    await app.register(contentParser)
    await app.listen(5000, '0.0.0.0');
}

start();
