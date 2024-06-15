import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { appErrorMessage } from "../shared/constants/app-error-message.constant";
import { Product } from "./entities/product.entity";
import { FilterProduct } from "./dto/filter-product";
import { FindOptions } from "sequelize";

@Injectable()
export class ProductService {
  constructor(
    @Inject("PRODUCT_REPOSITORY") private productRepository: typeof Product,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    createdBy: string,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      await this.productRepository.create({
        name: createProductDto.name,
        unit: createProductDto.unit,
        price: createProductDto.price,
        createdBy,
      });

      response.statusCode = HttpStatus.OK;
      response.message = "Create product success";
    } catch (error) {
      logger.error(`${ProductService.name}.create`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async findAll(filter: FilterProduct) {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const opt: FindOptions = {};
      opt.where = {};
      opt.attributes = { exclude: ["deletedAt", "deletedBy"] };
      if (filter.name) opt.where.fullname = filter.name;
      opt.limit = filter.limit;
      opt.offset = (filter.page - 1) * filter.limit;

      const { rows, count } = await this.productRepository.findAndCountAll(opt);

      response.data = {
        recordsTotal: count,
        recordsFilter: count,
        items: rows,
      };

      response.statusCode = 200;
      response.message = "Find data successfull";
    } catch (error) {
      logger.error(`${ProductService.name}.findAll`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async findOne(id: string): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const product = await this.productRepository.findByPk(id);
      if (!product) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = "Product not found";
        return response;
      }

      response.data = product;
      response.statusCode = HttpStatus.OK;
      response.message = "Update product success";
    } catch (error) {
      logger.error(`${ProductService.name}.update`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    updatedBy: string,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const product = await this.productRepository.findByPk(id);
      if (!product) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = "Product not found";
        return response;
      }
      product.name = updateProductDto.name;
      product.unit = updateProductDto.unit;
      product.price = updateProductDto.price;
      product.updatedBy = updatedBy;

      await product.save();

      response.statusCode = HttpStatus.OK;
      response.message = "Update product success";
    } catch (error) {
      logger.error(`${ProductService.name}.update`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async remove(id: string, deletedBy: string): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const product = await this.productRepository.findByPk(id);
      if (!product) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = "Product not found";
        return response;
      }

      product.deletedBy = deletedBy;
      await product.save();
      await product.destroy();

      response.statusCode = HttpStatus.OK;
      response.message = "Delete product success";
    } catch (error) {
      logger.error(`${ProductService.name}.remove`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }
}
