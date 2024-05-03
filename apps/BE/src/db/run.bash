source .env
npx postgraphile -c "$DATABASE_URL" --watch --enhance-graphiql