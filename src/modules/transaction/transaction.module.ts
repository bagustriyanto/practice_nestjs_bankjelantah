import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { DatabaseModule } from "src/database/database.module";
import { transactionProvider } from "./transaction.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProvider],
})
export class TransactionModule {}
