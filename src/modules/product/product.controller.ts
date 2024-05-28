import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Request, Response } from "express";
import { AuthDto } from "../shared/dto/auth.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { user_auth }: { user_auth: AuthDto } = request.session as any;

    const result = await this.productService.create(
      createProductDto,
      user_auth.username,
    );
    return response.status(result.statusCode).send(result);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string, @Res() response: Response) {
    const result = await this.productService.findOne(id);
    return response.status(result.statusCode).send(result);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const { user_auth }: { user_auth: AuthDto } = request.session as any;

    const result = await this.productService.update(
      id,
      updateProductDto,
      user_auth.username,
    );
    return response.status(result.statusCode).send(result);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const { user_auth }: { user_auth: AuthDto } = request.session as any;

    const result = await this.productService.remove(id, user_auth.username);
    return response.status(result.statusCode).send(result);
  }
}
