import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation generated with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:8001',
                description: 'Development Server',
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};

export default swaggerJsdoc(options);
