import { pool } from '../db';

export interface User {
    userId: number;
    userName: string;
}

export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<User[]>('SELECT user_id, user_name from users');
    return rows;
}