import { DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "conduit",
  password: "conduit",
  database: "conduit",
  entities: [Article, User],
  synchronize: true,
  // dropSchema: true,
  logging: false,
  logger: "advanced-console",
});
