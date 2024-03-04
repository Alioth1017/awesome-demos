// passport-config.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "./models/User"; // 假设有一个User模型

// 本地策略
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// Google OAuth策略
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
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
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 处理Facebook OAuth认证逻辑
    }
  )
);

export default passport;
