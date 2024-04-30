import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { UserFilter } from "./dto/user-filter.dto";

@Controller({
  path: "users",
  version: "1.0",
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const result = await this.userService.create(createUserDto);

    return response.status(parseInt(result.statusCode)).send(result);
  }

  @Get()
  async findAll(@Query() userFilter: UserFilter, @Res() response: Response) {
    const result = await this.userService.findAll(userFilter);

    return response.status(parseInt(result.statusCode)).send(result);
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() response: Response) {
    const result = await this.userService.findOne(id);

    return response.status(parseInt(result.statusCode)).send(result);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const result = await this.userService.update(id, updateUserDto);

    return response.status(parseInt(result.statusCode)).send(result);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
