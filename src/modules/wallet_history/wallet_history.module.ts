import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { walletHistoryProvider } from "./wallet_history.provider";

@Module({
  imports: [DatabaseModule],
  providers: [...walletHistoryProvider],
})
export class WalletHistoryModule {}
