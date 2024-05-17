import { RequestHandler } from 'express';
import { postgraphile } from 'postgraphile';

export const postgraphileMiddleware: RequestHandler = postgraphile(
  process.env.DATABASE_URL || 'postgres://user:pass@host:5432/dbname',
  'public',
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  },
);
