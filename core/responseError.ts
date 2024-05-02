import { type ServiceResponse } from "@/types";

export const responseError = (
  message: string = "Os campos informados não estão de acordo com o esperado.",
  status: number = 400
): ServiceResponse => {
  return {
    status,
    data: {
      success: false,
      message,
    },
  };
};
