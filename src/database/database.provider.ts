import { Sequelize } from "sequelize-typescript";
import { Product } from "src/modules/product/entities/product.entity";
import { User } from "src/modules/user/entities/user.entity";

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

      sequelize.addModels([User, Product]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
