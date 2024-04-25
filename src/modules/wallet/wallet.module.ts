import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { walletProvider } from "./wallet.provider";

@Module({
  imports: [DatabaseModule],
  providers: [...walletProvider],
})
export class WalletModule {}
