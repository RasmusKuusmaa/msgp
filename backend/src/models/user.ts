import { error } from "console";
import { pool } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
export interface User {
  userId: number;
  userName: string;
}

export async function getAllUsers(): Promise<User[]> {
  const [rows] = await pool.query<RowDataPacket[] & User[]>(
    "SELECT user_id, user_name from users"
  );
  return rows;
}

export async function registerUser(userName: string, password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await pool.query("INSERT INTO users (user_name, password) values (?, ?)", [
    userName,
    hashedPassword,
  ]);
  return { message: "user registered" };
}

export async function loginUser(userName: string, password: string) {
  const [rows] = await pool.query<any[]>(
    "SELECT user_id, user_name, password from users where user_name = ?",
    [userName]
  );

  if (rows.length === 0) throw new Error("user not found");

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("invalid password");

  const token = jwt.sign(
    { userId: user.user_id, userName },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return { token };
}
