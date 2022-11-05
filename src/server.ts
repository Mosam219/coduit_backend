import express from "express";
import { AppDataSource } from "./dbconnection";
import { articleRoute } from "./routes/articles";
import { userRoute } from "./routes/user";
import { usersRoute } from "./routes/users";
const app = express();

app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/user", userRoute);
app.use("/api/articles", articleRoute);

app.get("/", (req, res) => {
  res.send("hello mosam here");
});

async function start() {
  await AppDataSource.initialize().then(() => {
    console.log("connection is created with database");
  });
  app.listen(5000, () => {
    console.log("server is running on http://localhost:5000/");
  });
}

start();
