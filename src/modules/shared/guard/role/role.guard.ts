import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role.decorator";
import { AuthDto } from "../../dto/auth.dto";

@Injectable()
export class RoleGuard implements CanActivate {
  /**
   *
   */
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const auth = user as AuthDto;

    return requiredRoles.some((role) => auth.userType.includes(role));
  }
}
