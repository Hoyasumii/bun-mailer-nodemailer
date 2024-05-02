import { Resend } from "resend";

export const resender = async <T>(
  from: string,
  to: Array<string>,
  subject: string,
  Component: React.ReactElement
) => {
  const resend = new Resend(Bun.env.RESEND_API_KEY);
  const request = await resend.emails.send({
    from,
    to,
    subject,
    react: Component,
  });
  return {
    success: request.error === null,
  };
};
