// middleware/passport.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as SamlStrategy } from "passport-saml";
import { samlConfig } from "../config/saml";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// 本地策略
passport.use(
  "local",
  new LocalStrategy(
    {
      // usernameField: "username",
      // passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async function (req, username, password, done) {
      try {
        if (req.method !== "POST") {
          return done(null, false, { message: "Method Not Allowed." });
        }
        if (!username || !password) {
          return done(null, false, { message: "Missing required fields." });
        }

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          return done(null, false, { message: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid credentials." });
        }

        // 返回用户信息（排除密码字段）
        const { password: _, ...userData } = user;
        // 登录成功，返回用户信息
        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth策略
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 处理Google OAuth认证逻辑
      return done(null, profile);
    }
  )
);

// Facebook OAuth策略
passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "/api/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 处理Facebook OAuth认证逻辑
      return done(null, profile);
    }
  )
);

// saml策略
passport.use(
  "saml",
  new SamlStrategy(
    {
      ...samlConfig,
      passReqToCallback: true,
    },
    (req, profile, done) => {
      // Here you can handle the user profile received from SAML IdP
      // For example, you can save the user to the database or create a session
      return done(null, profile);
    }
  )
);

export default passport;
