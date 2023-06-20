import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import "dotenv-safe/config";

export default {
  driver: PostgreSqlDriver,
  migrations: {
    pathTs: "src/migrations",
    path: "dist/migrations",
    disableForeignKeys: false,
  },
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB_NAME,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  entities: ["dist/entities/*.entity.js"],
  entitiesTs: ["src/entities/*.entity.ts"],
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0];
