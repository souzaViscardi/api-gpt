import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'kenlo API', 
      version: '1.0.0', 
      description: 'API para gerenciar usuários e interações com GPT', 
    },
    servers: [
      {
        url: `${process.env.APP_URL}`, 
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerSetup = swaggerUi.setup(swaggerSpec);
const swaggerDocs = swaggerUi.serve;

export {
  swaggerDocs,
  swaggerSetup,
};