import { Sequelize } from "sequelize-typescript";
import { PriceTier } from "src/modules/price_tier/entities/price_tier.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Wallet } from "src/modules/wallet/entities/wallet.entity";
import { WalletHistory } from "src/modules/wallet_history/entities/wallet_history.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        logging: process.env.DATABASE_DEBUG === "1" ? true : false,
        timezone: "+07:00",
        dialectOptions: {
          "timezone": "+07:00",
          "dateStrings": true,
          "typeCast": true,
        },
      });

      sequelize.addModels([
        User,
        Product,
        Wallet,
        WalletHistory,
        Transaction,
        PriceTier,
      ]);

      // await sequelize.sync();

      return sequelize;
    },
  },
];
