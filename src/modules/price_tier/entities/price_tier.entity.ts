import { UUIDV4 } from "sequelize";
import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({ tableName: "price_tiers", paranoid: true })
export class PriceTier extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(UUIDV4())
  @Column({
    type: DataType.CHAR(32),
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(20),
  })
  userType: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  tier: number;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  maxAmount: number;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(50),
  })
  resetEvery: string;

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
