import cors from 'cors';
import express from 'express';
require('dotenv').config();  // Load environment variables
import { postgraphileMiddleware } from './middleware/postgraphile.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import router from './routes';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}));

// Middleware
app.use(postgraphileMiddleware);

// Routes
app.use('/api/v1', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});