import { Inject, Injectable, Logger } from "@nestjs/common";
import { appErrorMessage } from "../shared/constants/app-error-message.constant";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { genSalt, hash } from "bcrypt";
import { userType } from "../shared/constants/user-type.constant.ts";

@Injectable()
export class UserService {
  /** */
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: typeof User,
  ) {
  }

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
        response.statusCode = "400";
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

      response.statusCode = "200";
      response.message = "successfully";
    } catch (error: unknown) {
      logger.error(UserService.name + ".create", error);

      response.statusCode = "500";
      response.message = appErrorMessage.internal_server_error;
    }

    return response;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
