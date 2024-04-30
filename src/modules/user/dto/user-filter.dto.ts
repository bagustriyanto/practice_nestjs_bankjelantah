import { BaseFilter } from "src/modules/shared/dto/base-filter.dto";

export class UserFilter extends BaseFilter {
  fullname: string;
  email: string;
  userType: string;
}
