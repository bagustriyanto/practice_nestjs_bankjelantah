import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuthModule } from "../auth/auth.module";
import { PriceTierModule } from "../price_tier/price_tier.module";
import { ProductModule } from "../product/product.module";
import { TransactionModule } from "../transaction/transaction.module";
import { UserModule } from "../user/user.module";
import { WalletModule } from "../wallet/wallet.module";
import { WalletHistoryModule } from "../wallet_history/wallet_history.module";
import { authGuardProvider } from "./guard/auth/auth.guard.prodiver";
import { roleGuardProvider } from "./guard/role/role.guard.provider";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    PriceTierModule,
    TransactionModule,
    WalletModule,
    WalletHistoryModule,
    RouterModule.register([
      {
        path: "api",
        children: [
          {
            path: "/",
            module: AuthModule,
          },
          {
            path: "/",
            module: UserModule,
          },
          {
            path: "/",
            module: ProductModule,
          },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [...authGuardProvider, ...roleGuardProvider],
})
export class SharedModule {}
