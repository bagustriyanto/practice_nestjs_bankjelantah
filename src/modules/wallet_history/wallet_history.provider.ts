import { WalletHistory } from "./entities/wallet_history.entity";

export const walletHistoryProvider = [
  {
    provide: "WALLET_HISTORY_REPOSITORY",
    useValue: WalletHistory,
  },
];
