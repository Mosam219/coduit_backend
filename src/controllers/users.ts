import { AppDataSource } from "../dbconnection";
import { User } from "../entities/User";
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password";
import { sanitizeFields } from "../utils/security";

interface UserSignupData {
  username: string;
  password: string;
  email: string;
  bio: string;
  image: string;
}
interface UserLoginData {
  email: string;
  password: string;
}
interface UserUpdateData {
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export async function createUser(data: UserSignupData): Promise<User> {
  //check for user validity
  if (!data.username) throw new Error("username is blank");
  if (!data.email) throw new Error("email is blank");
  if (!data.password) throw new Error("password is blank");

  try {
    let repo = await AppDataSource.getRepository(User);

    // checking for user exists
    let existing = await repo.findOne({ where: { email: data.email } });
    if (existing) throw new Error("User with this email address exists");

    //creating and inserting user in DB
    const user = new User(
      data.email,
      data.username,
      await hashPassword(data.password)
    );
    await repo.save(user);

    //creating jwt token
    user.token = await sign(user);

    //sanitizing password and returning user
    return sanitizeFields(user);
  } catch (e) {
    throw e;
  }
}

export async function loginUser(data: UserLoginData): Promise<User> {
  //check for user validity
  if (!data.email) throw new Error("email is blank");
  if (!data.password) throw new Error("password is blank");

  try {
    let repo = await AppDataSource.getRepository(User);

    //checking if email exists
    let user = await repo.findOne({ where: { email: data.email } });
    if (!user) throw new Error("no user with this email id");

    //checking is password matched
    let passMatch = await matchPassword(user.password!, data.password);
    if (!passMatch) throw new Error("password is incorrect");

    user.token = await sign(user);
    return sanitizeFields(user);
  } catch (e) {
    throw e;
  }
}

export async function getUserByEmail(email: string): Promise<User> {
  const repo = await AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { email: email } });
  if (!user) throw new Error("No user with this Email Id");
  return sanitizeFields(user);
}

export async function updateUserByEmail(
  data: UserUpdateData,
  email: string
): Promise<User> {
  const repo = await AppDataSource.getRepository(User);
  const user = await repo.findOne({ where: { email: email } });
  if (!user) throw new Error("No user with this Email Id");
  if (data.username) user.username = data.username;
  if (data.bio) user.bio = data.bio;
  if (data.image) user.image = data.image;
  if (data.password) user.password = await hashPassword(data.password);
  let updatedUser = await repo.save(user);
  return sanitizeFields(updatedUser);
}
