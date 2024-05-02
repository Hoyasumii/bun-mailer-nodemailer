import * as React from "react";

interface HelloProps {
  name: string;
}

export const Hello: React.FC<HelloProps> = ({ name }) => (
  <div>
    <h1>Hello, {name}!</h1>
  </div>
);
