export class BaseResponse {
  statusCode: string;
  data: object;
  message: object | string;
  error: object | string;
}
