// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import passport from "../passport-config";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return res.status(500).json({ message: "An error occurred" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(500).json({ message: "An error occurred" });
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res);
}
