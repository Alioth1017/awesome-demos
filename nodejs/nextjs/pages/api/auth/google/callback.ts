// pages/api/auth/google/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import passport from '../../passport-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('google', { failureRedirect: '/login' })(req, res, function() {
    // 处理Google OAuth认证成功后的逻辑
    res.redirect('/');
  });
}
