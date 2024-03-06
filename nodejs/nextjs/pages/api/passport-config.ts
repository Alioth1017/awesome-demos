// passport-config.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as SamlStrategy } from "passport-saml";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
// 本地策略
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      // 查找用户
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      // 验证密码
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Google OAuth策略
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 处理Google OAuth认证逻辑
    }
  )
);

// Facebook OAuth策略
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "/api/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 处理Facebook OAuth认证逻辑
    }
  )
);

const samlConfig = {
  entryPoint: 'YOUR_IDENTITY_PROVIDER_LOGIN_URL',
  issuer: 'YOUR_APP_IDENTIFIER',
  cert: `-----BEGIN CERTIFICATE-----
YOUR_IDENTITY_PROVIDER_CERTIFICATE
-----END CERTIFICATE-----`,
};

// saml策略
passport.use(
  new SamlStrategy(
    {
      entryPoint: "https://idp.example.com/saml2/idp/SSOService.php",
      issuer: "https://your-app.example.com",
      cert: "-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOC...-----END CERTIFICATE-----",
      callbackUrl: "https://your-app.example.com/api/auth/saml/callback",
    },
    function (profile, done) {
      return done(null, profile);
    }
  )
);

export default passport;
