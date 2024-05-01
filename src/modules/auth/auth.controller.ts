import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AllowAnonymous } from "../shared/guard/auth/auth.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnonymous()
  @Post("login")
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    const result = await this.authService.signIn(
      createAuthDto.username,
      createAuthDto.password,
    );

    return response.status(result.statusCode).send(result);
  }
}
