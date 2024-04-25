import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Wallet } from "src/modules/wallet/entities/wallet.entity";

@Table({ tableName: "wallet_histories" })
export class WalletHistory extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.CHAR(32),
  })
  id: string;

  @IsUUID(4)
  @ForeignKey(() => Wallet)
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(32),
  })
  walletId: string;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  amount: number;

  @IsUUID(4)
  @Column({
    type: DataType.CHAR(32),
  })
  transactionId: string;

  @AllowNull(false)
  @Column({
    type: DataType.CHAR(15),
  })
  status: string;

  @Column({
    type: DataType.BLOB,
  })
  fileInfo: string;
}
