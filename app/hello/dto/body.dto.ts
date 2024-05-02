import { t } from "elysia";
import type { TObject } from "@sinclair/typebox";

export default class {
  public static hello: TObject = t.Object({
    target: t.String(),
    name: t.String(),
  });
}
