import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "log", "error"],
  });
  const redisClient = createClient({
    socket: {
      host: "ap.loclx.io",
      port: 8379,
    },
    password: process.env.REDIS_PASSWORD,
  });
  redisClient.connect();

  const store = new RedisStore({
    client: redisClient,
    prefix: "bankjelantah_sess",
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1.0",
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: "session_jelantah",
      store: store,
    }),
  );
  await app.listen(3000);
}
bootstrap();
