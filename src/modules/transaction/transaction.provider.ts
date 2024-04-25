import { Transaction } from "./entities/transaction.entity";

export const transactionProvider = [
  {
    provide: "TRANSACTION_REPOSITORY",
    useValue: Transaction,
  },
];
