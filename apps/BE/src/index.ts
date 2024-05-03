import express from "express";
import { Request, Response } from 'express';
import { postgraphile } from "postgraphile";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(
    postgraphile(
        process.env.DATABASE_URL || "postgres://user:pass@host:5432/dbname",
        "public",
        {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
        }
    )
);

app.get('/', (req: Request, res: Response) => {
    res.send('Application works!');
});

app.listen(process.env.PORT || 8001);