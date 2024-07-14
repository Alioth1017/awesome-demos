// pages/api/auth/[...auth].ts
import { NextApiRequest, NextApiResponse } from "next";
import passport from "@/middleware/passport";

const handleAuth = (req: NextApiRequest, res: NextApiResponse) => {
  const [strategy, callback] = req.query.auth as string[];
  switch (`${strategy}${callback?.length ? `-${callback}` : ""}`) {
    case "login": {
      passport.authenticate("local")(req, res, (err: any) => {
        if (err) {
          console.error(err.stack);
          // 处理认证失败的情况
          res.status(500).json({ error: err.message });
          return;
        }
        // 处理Google OAuth认证成功后的逻辑
        res.redirect("/");
      });
      break;
    }
    case "register": {
      passport.authenticate("local-register")(req, res, (err: any) => {
        if (err) {
          console.error(err.stack);
          // 处理认证失败的情况
          res.status(500).json({ error: err.message });
          return;
        }
        // 处理Google OAuth认证成功后的逻辑
        res.redirect("/");
      });
      break;
    }
    case "saml": {
      passport.authenticate("saml", { session: false })(req, res, () => {
        res.redirect("/");
      });
      break;
    }
    case "google": {
      passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res
      );
      break;
    }
    case "google-callback": {
      passport.authenticate("google", { failureRedirect: "/login" })(
        req,
        res,
        (err: any) => {
          if (err) {
            console.error(err.stack);
            // 处理认证失败的情况
            res.status(500).json({ error: err.message });
            return;
          }
          // 处理Google OAuth认证成功后的逻辑
          res.redirect("/");
        }
      );
      break;
    }
    case "facebook": {
      // passport.authenticate('facebook', { scope: ['email'] })(req, res);
      passport.authenticate("facebook")(req, res);
      break;
    }
    case "facebook-callback": {
      passport.authenticate("facebook", { failureRedirect: "/login" })(
        req,
        res,
        (err: any) => {
          if (err) {
            console.error(err.stack);
            // 处理认证失败的情况
            res.status(500).json({ error: err.message });
            return;
          }
          // 处理Google OAuth认证成功后的逻辑
          res.redirect("/");
        }
      );
      break;
    }
    default: {
      res.status(404).end();
    }
  }
};

export default handleAuth;
