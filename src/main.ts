import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "log", "error"],
  });
  app.use(cookieParser());
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
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
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
