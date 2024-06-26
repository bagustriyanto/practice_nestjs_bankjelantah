import { IsNotEmpty, MaxLength, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "name cannot be empty" })
  @MaxLength(100, { message: "name exceeded characters" })
  name: string;

  @IsNotEmpty({ message: "unit cannot be empty" })
  @MaxLength(10, { message: "unit exceeded characters" })
  unit: string;

  @IsNotEmpty({ message: "price cannot be empty" })
  @Min(1, { message: "price cannot less than or equal to 0" })
  price: number;
}
