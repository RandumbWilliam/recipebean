import { MikroORM } from "@mikro-orm/core";

export default {
  migrations: {
    path: "./src/migrations",
    tableName: "migrations",
    transactional: true,
  },
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  user: "postgres",
  password: "2701",
  dbName: "product",
  host: "localhost",
  port: 5432,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
