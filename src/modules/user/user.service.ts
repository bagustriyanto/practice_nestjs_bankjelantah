import { Inject, Injectable, Logger } from "@nestjs/common";
import { appErrorMessage } from "../shared/constants/app-error-message.constant";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { genSalt, hash } from "bcrypt";
import { userType } from "../shared/constants/user-type.constant.ts";
import { FindOptions } from "sequelize";

interface UserFilter {
  fullname: string;
  userType: string;
  email: string;
}

@Injectable()
export class UserService {
  /** */
  constructor(@Inject("USER_REPOSITORY") private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const isUserExists = await this.userRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
      if (isUserExists) {
        response.statusCode = 400;
        response.message = "email already exists";
        return response;
      }

      const salt = await genSalt(1);
      const hashPassword = await hash(createUserDto.password, salt);

      await this.userRepository.create({
        salt,
        password: hashPassword,
        email: createUserDto.email,
        fullname: createUserDto.fullname,
        phone: createUserDto.phone,
        userType: userType.personal,
      });

      response.statusCode = 200;
      response.message = "successfully";
    } catch (error: unknown) {
      logger.error(UserService.name + ".create", error);

      response.statusCode = 500;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async findAll(filter: UserFilter): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const opt: FindOptions = {};
      opt.where = {};
      opt.attributes = {
        exclude: ["password", "salt"],
      };
      if (filter.fullname) opt.where.fullname = filter.fullname;
      if (filter.email) opt.where.email = filter.email;
      if (filter.userType) opt.where.userType = filter.userType;

      const { rows, count } = await this.userRepository.findAndCountAll(opt);

      response.data = {
        recordsTotal: count,
        recordsFilter: count,
        items: rows,
      };

      response.statusCode = 200;
      response.message = "Find data successfull";
    } catch (error: unknown) {
      logger.error(UserService.name + ".findAll", error);

      response.statusCode = 500;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async findOne(id: string): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const data = await this.userRepository.findByPk(id, {
        attributes: { exclude: ["password", "salt"] },
      });

      response.data = data;
      response.statusCode = 200;
      response.message = "Find data successfull";
    } catch (error: unknown) {
      logger.error(UserService.name + ".findOne", error);

      response.statusCode = 500;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const exists = await this.userRepository.findByPk(id);

      if (!exists) {
        response.statusCode = 400;
        response.message = "User not found";
        return response;
      }

      exists.fullname = updateUserDto.fullname;
      exists.phone = updateUserDto.phone;

      await exists.save();

      response.statusCode = 200;
      response.message = "Update data successfull";
    } catch (error: unknown) {
      logger.error(UserService.name + ".findOne", error);

      response.statusCode = 500;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  async remove(id: string): Promise<BaseResponse> {
    const response = new BaseResponse();
    const logger = new Logger();

    try {
      const exists = await this.userRepository.findByPk(id);

      if (!exists) {
        response.statusCode = 400;
        response.message = "User not found";
        return response;
      }

      await exists.destroy();

      response.statusCode = 200;
      response.message = "Delete data successfull";
    } catch (error: unknown) {
      logger.error(UserService.name + ".findOne", error);

      response.statusCode = 500;
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }
}
