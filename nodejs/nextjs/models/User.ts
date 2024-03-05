// models/User.ts
export interface User {
    id: string;
    username: string;
    password: string;
    // 其他用户信息
    validPassword(password: string): boolean; // 假设有一个验证密码的方法
  }
  