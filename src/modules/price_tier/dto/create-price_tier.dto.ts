import { IsIn, IsNotEmpty, Min } from "class-validator";

export class CreatePriceTierDto {
  @IsNotEmpty({ message: "userType cannot be empty" })
  @IsIn(["PERSONAL", "FACTORY", "AFFILIATE", "RESTO"], {
    message: "userType not in the list",
  })
  userType: string;

  @IsNotEmpty({ message: "tier cannot be empty" })
  @Min(1, { message: "tier cannot less than or equal to 0" })
  tier: number;

  @IsNotEmpty({ message: "price cannot be empty" })
  @Min(1, { message: "price cannot less than or equal to 0" })
  price: number;

  @IsNotEmpty({ message: "maxAmount cannot be empty" })
  @Min(1, { message: "tier cannot less than or equal to 0" })
  maxAmount: number;

  @IsNotEmpty({ message: "resetEvery cannot be empty" })
  resetEvery: string;
}
