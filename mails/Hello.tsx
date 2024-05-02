import * as React from "react";
import { Tailwind, Button, Hr } from "@react-email/components";

interface HelloProps {
  name: string;
}

export const Hello: React.FC<HelloProps> = ({ name }) => (
  <Tailwind>
    <h1>Hello, {name}!</h1>
    <Hr />
    <p>Hello from Elysia 🦊</p>
  </Tailwind>
);
