import { type BaseResponse } from "@/types";

export const response = (data: BaseResponse): any => {
  let properties: { [key: string]: any } = {};

  Object.entries(data).forEach((item: Array<string>) => {
    if (item.length < 2) throw new Error("isso não vai acontecer");

    properties[item[0]] = {
      type: typeof item[1],
      example: item[1],
    };
  });

  return {
    "application/json": {
      schema: {
        type: "object",
        properties,
      },
    },
  };
};
