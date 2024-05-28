import { Body, Controller, Post, Res, Session } from "@nestjs/common";
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
    @Session() session: Record<string, any>,
  ) {
    const result = await this.authService.signIn(
      createAuthDto.username,
      createAuthDto.password,
    );

    const { token, payload } = result.data as any;
    session.user_auth = payload;

    response.cookie("access_token", token);
    result.data = {};

    return response.status(result.statusCode).send(result);
  }
}
