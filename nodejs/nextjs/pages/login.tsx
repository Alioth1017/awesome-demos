"use client";

import "@/app/globals.css";
import { useAuthLogin, useAuthRegister } from "@/lib/hooks";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { run: onLogin } = useAuthLogin(username, password);
  const { run: onRegister } = useAuthRegister(username, password);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <input
        className="dark:text-[black]"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        defaultValue={username}
      />
      <input
        className="dark:text-[black]"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={password}
      />
      <button onClick={onRegister}>本地注册</button>
      <button onClick={onLogin}>本地登录</button>
      <a href="/api/auth/google">Google登录</a>
      <a href="/api/auth/facebook">Facebook登录</a>
    </main>
  );
}
