import { type BaseResponse } from "./BaseResponse";

export interface ServiceResponse {
  status: number;
  data: BaseResponse;
}
