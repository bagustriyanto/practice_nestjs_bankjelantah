import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
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
    @Req() request: Request,
  ) {
    const result = await this.authService.signIn(
      createAuthDto.username,
      createAuthDto.password,
    );

    console.log(request.session);

    return response.status(result.statusCode).send(result);
  }
}
