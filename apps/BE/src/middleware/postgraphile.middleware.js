"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgraphileMiddleware = void 0;
const postgraphile_1 = require("postgraphile");
exports.postgraphileMiddleware = (0, postgraphile_1.postgraphile)(process.env.DATABASE_URL || "postgres://user:pass@host:5432/dbname", "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
});
