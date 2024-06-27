import { IsNotEmpty, Min } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty({ message: "price cannot be empty" })
  @Min(1, { message: "price cannot less than or equal to 0" })
  price: number;

  @IsNotEmpty({ message: "quantity cannot be empty" })
  @Min(1, { message: "quantity cannot less than or equal to 0" })
  qty: number;

  @IsNotEmpty({ message: "product cannot be empty" })
  productId: string;

  @IsNotEmpty({ message: "customer cannot be empty" })
  userId: string;
}
