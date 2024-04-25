import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "src/modules/user/entities/user.entity";

@Table({ tableName: "wallets" })
export class Wallet extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.CHAR(32),
  })
  id: string;

  @IsUUID(4)
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(32),
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  amount: number;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(50),
  })
  bankAccount: string;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(30),
  })
  bankName: string;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;
}
