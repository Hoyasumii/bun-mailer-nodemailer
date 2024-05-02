import { z } from "zod";

interface helloProps {
  target: string;
  name: string;
}

export class HelloValidate {

  public static hello(data: helloProps): boolean {
    const schema = z.object({
      target: z.string().email(),
      name: z.string()
    })
    return schema.safeParse(data).success;
  }
}
