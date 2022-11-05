import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const JWT_SECRET = "some-secret-no-one-can-guess";

export async function sign(user: User): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      (err: any, encoded: string | undefined) => {
        if (err) return reject(err);
        else return resolve(encoded as string);
      }
    );
  });
}

export async function decode(token: string): Promise<User> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      else return resolve(decoded as User);
    });
  });
}
