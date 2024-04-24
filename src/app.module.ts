import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./modules/shared/shared.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.development.local", ".env.development"],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
