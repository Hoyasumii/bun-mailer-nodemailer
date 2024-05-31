import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { SwaggerConfig } from "./SwaggerConfig";
import hello from "./hello";
import { responseError } from "@/core";

const app = new Elysia()
  .use(
    cors({
      methods: ["POST"],
      exposedHeaders: undefined,
      origin: Bun.env.CORS_ORIGIN?.split(",") ?? [],
    })
  )

  .onError(({ code }) => {
    switch (code) {
      case "VALIDATION":
        return responseError();
      default:
        return {
          success: false,
          message: `Houve um problema na sua requisição: ${code}`,
        };
    }
  })

  .use(hello);

if (Bun.env.ENV == "dev") {
  app.use(swagger(SwaggerConfig));
}

app.listen(Bun.env.PORT ?? 8081);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${Bun.env.PORT}`
);
