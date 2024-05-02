import { resender } from "@/core";
import { Hello } from "@/mails";
import { createElement } from "react";
import Elysia from "elysia";

const route = new Elysia({ prefix: "/hello" });

route.get("/", async () => {
  const request = await resender("Hub.me <onboarding@resend.dev>", ["alanreisanjo@gmail.com"], "Teste", createElement(Hello, { name: "Alan" }));
  return request
})

export default route;
