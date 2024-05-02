import type { ServiceResponse } from "@/types";
import { HelloValidate } from "./hello.validate";
import { resender, responseError } from "@/core";
import { createElement } from "react";
import { Hello } from "@/mails";

export class HelloService {
  async hello(target: string, name: string): Promise<ServiceResponse> {
    if (!HelloValidate.hello({ name, target })) {
      return responseError();
    }
    const request = await resender(
      "Hub.me <onboarding@resend.dev>",
      [target],
      "Hello Elysia",
      createElement(Hello, { name })
    );

    if (request.success) {
      return {
        status: 200,
        data: {
          success: true,
          message: "Email enviado com sucesso!",
        },
      };
    }

    return {
      status: 500,
      data: {
        success: false,
      },
    };
  }
}
