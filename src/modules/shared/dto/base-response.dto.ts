export class BaseResponse {
  statusCode: number;
  data: object;
  message: object | string;
  error: object | string;
}
