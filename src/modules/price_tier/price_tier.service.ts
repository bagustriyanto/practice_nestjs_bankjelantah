import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { CreatePriceTierDto } from "./dto/create-price_tier.dto";
import { UpdatePriceTierDto } from "./dto/update-price_tier.dto";
import { PriceTier } from "./entities/price_tier.entity";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { appErrorMessage } from "../shared/constants/app-error-message.constant";
import { FilterPriceTier } from "./dto/filter-price_tier.dto";
import { FindOptions } from "sequelize";

@Injectable()
export class PriceTierService {
  /**
   *
   */
  constructor(
    @Inject("PRICE_TIER_REPOSITORY") private priceTierRepo: typeof PriceTier,
  ) {}
  async create(
    createPriceTierDto: CreatePriceTierDto,
    createdBy: string,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      await this.priceTierRepo.create({
        userType: createPriceTierDto.userType,
        tier: createPriceTierDto.tier,
        price: createPriceTierDto.price,
        maxAmount: createPriceTierDto.maxAmount,
        resetEvery: createPriceTierDto.resetEvery,
        createdBy,
      });

      response.statusCode = HttpStatus.OK;
      response.message = "Create price tier success";
    } catch (error) {
      logger.error(`${PriceTierService.name}.create`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async findAll(filter: FilterPriceTier): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const opt: FindOptions = {};
      opt.where = {};
      opt.attributes = { exclude: ["deletedAt", "deletedBy"] };
      opt.limit = filter.limit;
      opt.offset = (filter.page - 1) * filter.limit;

      const { rows, count } = await this.priceTierRepo.findAndCountAll(opt);

      response.data = {
        recordsTotal: count,
        recordsFilter: count,
        items: rows,
      };

      response.statusCode = 200;
      response.message = "Find data successfull";
    } catch (error) {
      logger.error(`${PriceTierService.name}.findAll`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} priceTier`;
  }

  update(id: number, updatePriceTierDto: UpdatePriceTierDto) {
    return `This action updates a #${id} priceTier`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceTier`;
  }
}
