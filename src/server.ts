import express from "express";
import { DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { User } from "./entities/User";
const app = express();

app.get("/", (req, res) => {
  res.send("hello mosam here");
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "conduit",
  password: "conduit",
  database: "conduit",
  entities: [Article, User],
  synchronize: true,
  logging: false,
  logger: "advanced-console",
});

async function start() {
  await AppDataSource.initialize().then(() => {
    console.log("connection is created with postgres");
  });
  app.listen(5000, () => {
    console.log("server is running on http://localhost:5000/");
  });
}

start();
