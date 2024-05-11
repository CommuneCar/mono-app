import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Communecar Swagger API Documentation',
            version: '1.0.0',
            description: "CommuneCar's API Documentation.",
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
