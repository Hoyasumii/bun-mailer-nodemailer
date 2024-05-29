import nodemailer from "nodemailer";
import { z } from "zod";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { ServiceResponse } from "@/types";
import { responseError } from "./responseError";
import { render } from "@react-email/render";

interface MailerAuth {
  user: string;
  pass: string;
}

export class Mailer {
  private service: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private authUser: string;
  private emailValidator = z.string().email();

  public constructor(host: string, port: number, auth: MailerAuth) {
    const userAuthValidate = this.emailValidator.safeParse(auth.user);
    if (!userAuthValidate.success)
      throw new Error(
        "The email provided by Bun.env.SMTP_AUTH_USER is not valid."
      );

    this.service = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth,
    });

    this.authUser = auth.user;
  }

  public async send(
    fromTitle: string,
    to: string | Array<string>,
    subject: string,
    content: React.ReactElement
  ): Promise<ServiceResponse> {
    if (!(typeof to == "string" || Array.isArray(to)))
      return responseError(
        `The "to" Argument is neither a string nor an Array.`
      );

    if (typeof to == "string") to = [to];

    to.forEach((email) => {
      const emailValidate = this.emailValidator.safeParse(email);

      if (!emailValidate.success)
        return responseError(
          `One of the emails provided (${email}) is not valid.`
        );
    });

    const mail = await this.service.sendMail({
      from: `${fromTitle} "<${this.authUser}>"`,
      to,
      subject,
      html: render(content),
    });

    const status = mail.rejected.length == 0 ? 200 : 406;

    return {
      status,
      data: {
        success: status === 200,
      },
    };
  }
}