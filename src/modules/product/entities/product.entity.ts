import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";

@Table({ tableName: "products" })
export class Product extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Length({ max: 100 })
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(100),
  })
  name: string;

  @Length({ max: 10 })
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(10),
  })
  unit: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @HasMany(() => Transaction)
  transaction: Transaction;

  @Column({
    type: DataType.CHAR,
  })
  createdBy: string;

  @Column({
    type: DataType.CHAR,
  })
  updatedBy: string;
}
