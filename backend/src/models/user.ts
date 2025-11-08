import { error } from "console";
import { pool } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export interface User {
  userId: number;
  userName: string;
}

export async function getAllUsers(): Promise<User[]> {
  const [rows] = await pool.query<User[]>(
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

