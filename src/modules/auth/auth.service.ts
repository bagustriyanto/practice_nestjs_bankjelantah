import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash } from "bcrypt";
import { BaseResponse } from "../shared/dto/base-response.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: typeof User,
    private jwtService: JwtService,
  ) {
  }

  async signIn(username: string, password: string): Promise<BaseResponse> {
    const response = new BaseResponse();
    const user = await this.userRepository.findOne({
      where: {
        email: username,
      },
    });

    if (!user) {
      response.statusCode = "400";
      response.message = "User not found";
      return response;
    }

    const hashInputPassword = await hash(password, user.salt);
    if (hashInputPassword != user.password) {
      response.statusCode = "400";
      response.message = "Wrong password";
      return response;
    }

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    response.data = { token };
    response.statusCode = "200";
    response.message = "Login success";

    return response;
  }
}
