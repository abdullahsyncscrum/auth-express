    const swaggerJsdoc = require('swagger-jsdoc');

    const options = {
      swaggerDefinition: {
        openapi: '3.0.0', 
        info: {
          title: 'Auth Module APIs',
          version: '1.0.0',
          // description: 'Swagger documentation',
        },
        servers: [
          {
            url: 'http://localhost:3000', 
          },
        ],
      },
      apis: ['./routes/*.js'], 
    };

    const swaggerSpec = swaggerJsdoc(options);
    module.exports = swaggerSpec;