import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { Response, response } from "express";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    const result = await this.authService.signIn(
      createAuthDto.username,
      createAuthDto.password,
    );

    return response.status(parseInt(result.statusCode)).send(result);
  }
}
