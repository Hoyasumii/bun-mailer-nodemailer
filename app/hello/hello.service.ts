import type { ServiceResponse } from "@/types";
import { resender, responseError } from "@/core";
import { createElement } from "react";
import { Hello } from "@/mails";

export class HelloService {
  async hello(target: string, name: string): Promise<ServiceResponse> {
    const request = await resender(
      "Mailer <onboarding@resend.dev>",
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
