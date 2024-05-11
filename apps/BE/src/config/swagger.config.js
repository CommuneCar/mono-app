"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
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
exports.default = (0, swagger_jsdoc_1.default)(options);
