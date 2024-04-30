import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "email format not supported" })
  @IsNotEmpty({ message: "email cannot be empty" })
  email: string;

  @IsNotEmpty({ message: "fullname cannot be empty" })
  @MaxLength(100, { message: "email char exceeded limit" })
  fullname: string;

  @IsNotEmpty({ message: "phone cannot be empty" })
  @MaxLength(20, { message: "phone char exceeded limit" })
  phone: string;

  @IsNotEmpty({ message: "password cannot be empty" })
  password: string;
}
