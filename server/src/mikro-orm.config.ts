import { production } from "./constants";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  entities: [User],
  dbName: "express-graphql",
  user: "root",
  password: "",
  type: "postgresql",
  debug: !production,
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    disableForeignKeys: false,
  },
} as Parameters<typeof MikroORM.init>[0];
