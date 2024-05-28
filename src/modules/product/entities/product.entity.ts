import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";

@Table({ tableName: "products", paranoid: true })
export class Product extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4())
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

  @Column({
    type: DataType.CHAR,
  })
  deletedBy: string;
}
