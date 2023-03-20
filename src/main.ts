import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as express from 'express';
import { ExpressAdapter } from "@nestjs/platform-express";
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(express()));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
}

bootstrap().then();
