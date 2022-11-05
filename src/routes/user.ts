import { Router } from "express";
import { getUserByEmail } from "../controllers/users";
import { authByToken } from "../middleware/auth";

const route = Router();

//GET /user        -->     GET current USER
route.get("/", authByToken, async (req, res) => {
  try {
    const user = await getUserByEmail((req as any).user.email);
    if (!user) throw new Error("user not found");
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(404).json({
      errors: {
        body: [(e as any).message],
      },
    });
  }
});

export const userRoute = route;
