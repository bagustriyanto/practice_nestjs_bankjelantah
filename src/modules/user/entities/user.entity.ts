import { DataTypes } from "sequelize";
import {
  AllowNull,
  Column,
  Default,
  HasOne,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Wallet } from "src/modules/wallet/entities/wallet.entity";

@Table({ tableName: "users" })
export class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Length({ max: 100 })
  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(100),
  })
  email: string;

  @Length({ max: 100 })
  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(100),
  })
  fullname: string;

  @Length({ max: 20 })
  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(20),
  })
  phone: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(20),
  })
  userType: string;

  @Default(0)
  @Column
  wrongPasswordCount: number;

  @Default(false)
  @Column
  locked: boolean;

  @Column
  lastLoginTime: Date;

  @Length({ max: 32 })
  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(32),
  })
  password: string;

  @Length({ max: 10 })
  @AllowNull(false)
  @Column({
    type: DataTypes.CHAR(10),
  })
  salt: string;

  @HasOne(() => Wallet)
  wallet: Wallet;

  @Default(true)
  @AllowNull(false)
  @Column
  isCustomer: boolean;
}
