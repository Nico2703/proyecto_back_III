import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación de API",
      version: "1.0.0",
      description: "API para adopción de mascotas",
    },
  },
  apis: ["./src/docs/**/*.yaml"],
};

export const specs = swaggerJsDoc(swaggerOptions);