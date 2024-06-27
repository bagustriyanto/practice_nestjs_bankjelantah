import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Product } from "src/modules/product/entities/product.entity";

@Table({ tableName: "transactions" })
export class Transaction extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4())
  @Column({
    type: DataType.CHAR(32),
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  amount: number;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  finalAmount: number;

  @Column({
    type: DataType.CHAR(36),
  })
  priceTierId: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  transactionTime: Date;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(36),
  })
  userId: string;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.CHAR(36),
  })
  productId: string;

  @BelongsTo(() => Product)
  product: Product;
}
