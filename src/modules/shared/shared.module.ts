import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PriceTierModule } from "../price_tier/price_tier.module";
import { ProductModule } from "../product/product.module";
import { TransactionModule } from "../transaction/transaction.module";
import { UserModule } from "../user/user.module";
import { WalletModule } from "../wallet/wallet.module";
import { WalletHistoryModule } from "../wallet_history/wallet_history.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    PriceTierModule,
    TransactionModule,
    WalletModule,
    WalletHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class SharedModule {}
