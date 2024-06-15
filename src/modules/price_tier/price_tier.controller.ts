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
  Query,
} from "@nestjs/common";
import { PriceTierService } from "./price_tier.service";
import { CreatePriceTierDto } from "./dto/create-price_tier.dto";
import { UpdatePriceTierDto } from "./dto/update-price_tier.dto";
import { Request, Response, response } from "express";
import { AuthDto } from "../shared/dto/auth.dto";
import { FilterPriceTier } from "./dto/filter-price_tier.dto";

@Controller({ path: "price-tier", version: "1.0" })
export class PriceTierController {
  constructor(private readonly priceTierService: PriceTierService) {}

  @Post()
  async create(
    @Body() createPriceTierDto: CreatePriceTierDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const { user_auth }: { user_auth: AuthDto } = request.session as any;

    const result = await this.priceTierService.create(
      createPriceTierDto,
      user_auth.username,
    );

    return response.status(result.statusCode).send(result);
  }

  @Get()
  async findAll(@Query() filter: FilterPriceTier, @Res() response: Response) {
    const result = await this.priceTierService.findAll(filter);
    return response.status(result.statusCode).send(result);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.priceTierService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePriceTierDto: UpdatePriceTierDto,
  ) {
    return this.priceTierService.update(+id, updatePriceTierDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.priceTierService.remove(+id);
  }
}
