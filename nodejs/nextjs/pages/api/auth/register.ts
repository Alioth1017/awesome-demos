// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10; // 设置哈希的盐轮数

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // 检查用户名是否已被注册
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // 使用 bcrypt 生成哈希密码
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 创建新用户，并存储哈希密码
      const newUser = await prisma.user.create({
        data: { username, password: hashedPassword },
      });

      // 返回用户信息（排除密码字段）
      const { password: _, ...userData } = newUser;
      return res
        .status(201)
        .json({ message: "User registered successfully", user: userData });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
