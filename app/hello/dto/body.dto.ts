import { t } from "elysia";
import type { TObject } from "@sinclair/typebox";

export default class {
  public static hello: TObject = t.Object({
    target: t.String({ format: 'email' }),
    name: t.String({ minLength: 3 }),
  });
}
