import { Router } from "express";
import { createUser, loginUser } from "../controllers/users";

const route = Router();

//POST /users/login  -->    LOGIN
route.post("/login", async (req, res) => {
  try {
    const user = await loginUser(req.body.user);
    return res.status(200).send(user);
  } catch (e) {
    res.status(422).json({
      errors: { body: ["login failed", (e as any).message] },
    });
  }
});

//POST /users/register -->  REGISTER a new USER
route.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body.user);
    res.status(200).send(user);
  } catch (e) {
    res.status(422).json({
      errors: { body: ["could not create user", (e as any).message] },
    });
  }
});

export const usersRoute = route;
