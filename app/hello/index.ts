import Elysia from "elysia";
import DTO from "./dto";
import docs from './docs';
import { HelloService } from "./hello.service";

const service = new HelloService();
const route = new Elysia({ prefix: "/hello" });

route.post(
  "/",
  async ({ body, set }) => {
    const { target, name } = body as { target: string; name: string };
    const { data, status } = await service.hello(target, name);
    set.status = status;
    return data;
  },
  {
    body: DTO.Body.hello,
    detail: docs.hello
  }
);

export default route;
