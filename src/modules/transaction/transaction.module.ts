import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { DatabaseModule } from "src/database/database.module";
import { transactionProvider } from "./transaction.provider";
import { productProvider } from "../product/product.provider";
import { pricerTierProvider } from "../price_tier/price_tier.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    ...transactionProvider,
    ...productProvider,
    ...pricerTierProvider,
  ],
})
export class TransactionModule {}
