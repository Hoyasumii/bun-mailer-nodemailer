import type { ServiceResponse } from "@/types";
import { Mailer } from "@/core";
import { createElement } from "react";
import { Hello } from "@/mails";

export class HelloService {
  
  private service = new Mailer(
    Bun.env.SMTP_HOST ?? "",
    parseInt(Bun.env.SMTP_PORT ?? "0"),
    { user: Bun.env.SMTP_AUTH_USER ?? "", pass: Bun.env.SMTP_AUTH_PASS ?? "" }
  );

  async hello(target: string, name: string): Promise<ServiceResponse> {
    const request = await this.service.send(
      "Mailer",
      [target],
      "Hello Elysia",
      createElement(Hello, { name })
    );

    if (request.data.success) {
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
