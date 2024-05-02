import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { SwaggerConfig } from "./SwaggerConfig";
import hello from './hello';

const app = new Elysia();

app.use(
  cors({
    methods: ["POST"],
    exposedHeaders: undefined,
    origin: Bun.env.CORS_ORIGIN?.split(",") ?? [],
  })
);

if (Bun.env.ENV == "dev") {
  app.use(swagger(SwaggerConfig));
}

app.onError(({ code }) => ({
  success: false,
  message: `Houve um problema na sua requisição: ${code}`,
}));

app.onBeforeHandle(async ({ headers, set }) => {
  const { authorization } = headers;
  if (authorization != Bun.env.AUTHORIZATION_KEY) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
    };
  }
});

app.use(hello)

app.listen(Bun.env.PORT ?? 8081);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${Bun.env.PORT}`
);
