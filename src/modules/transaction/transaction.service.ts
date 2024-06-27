import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { appErrorMessage } from "../shared/constants/app-error-message.constant";
import { Transaction } from "./entities/transaction.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class TransactionService {
  /**
   *
   */
  constructor(
    @Inject("TRANSACTION_REPOSITORY")
    private transactionRepository: typeof Transaction,
    @Inject("PRODUCT_REPOSITORY") private productRepository: typeof Product,
  ) {}
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      /**
       * calcutate final amount on the fly and logging to a table
       * Create private function to calculate final amount based on price tier by user
       */
      const findUser = await this.transactionRepository.findOne({
        where: { id: createTransactionDto.userId },
      });

      if (!findUser) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = "User not found";
        return response;
      }

      const findProduct = await this.productRepository.findOne({
        where: { id: createTransactionDto.productId },
      });
      if (!findProduct) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = "Product not found";
        return response;
      }
    } catch (error) {
      logger.error(`${TransactionService.name}.create`, error);

      response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
