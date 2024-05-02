import { paragraphList } from "@/core/html";
import { response } from "@/core/swagger";
import { type DocumentDecoration } from "elysia";

const doc: DocumentDecoration = {
  description: paragraphList("Rota responsável por enviar o email hello."),
  parameters: [
    {
      in: "header",
      name: "Authorization",
      required: true,
      schema: {
        type: "string",
      },
      description:
        "Aqui será enviado a Key de segurança definida no .env da API.",
    },
  ],
  responses: {
    "200": {
      description: "O Email foi enviado",
      content: response({
        success: true,
        message: "Email enviado com sucesso!",
      }),
    },
    "400": {
      description:
        "O Email não pôde ser enviado, devido a um erro na validação do body",
      content: response({
        success: false,
        message: "Os campos informados não estão de acordo com o esperado.",
      }),
    },
    "500": {
      description:
        "O Email não pôde ser enviado, devido a falhas internas: ex.: Email inexistente",
      content: response({
        success: false,
      }),
    },
  },
};

export default doc;
