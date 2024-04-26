import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "log", "error"],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1.0",
  });
  await app.listen(3000);
}
bootstrap();
