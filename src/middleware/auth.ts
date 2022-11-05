import { NextFunction, Request, Response } from "express";
import { decode } from "../utils/jwt";

export async function authByToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //getting auth header
  const authHeader = req.header("Authorization")?.split(" ")!;

  //checking authheader exists
  if (!authHeader) {
    return res.status(400).json({
      errors: { body: ["Authorization failed", "No Authorization header"] },
    });
  }

  //checking token exists
  if (authHeader[0] != "Token") {
    return res.status(401).json({
      errors: { body: ["Authorization failed", "Token missing"] },
    });
  }

  //checking token is valid
  const token = authHeader[1];
  try {
    const user = await decode(token);
    if (!user) throw new Error("No user found in token");
    (req as any).user = user;
    return next();
  } catch (e) {
    res.status(400).json({
      errors: { body: ["Authorization failed", (e as any).message] },
    });
  }
}
