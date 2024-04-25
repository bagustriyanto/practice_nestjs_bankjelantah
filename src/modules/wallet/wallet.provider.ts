import { Wallet } from "./entities/wallet.entity";

export const walletProvider = [
  {
    provide: "WALLET_REPOSITORY",
    useValue: Wallet,
  },
];
