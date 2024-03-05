// pages/api/auth/facebook/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import passport from '../../passport-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('facebook', { failureRedirect: '/login' })(req, res, function() {
    // 处理Facebook OAuth认证成功后的逻辑
    res.redirect('/');
  });
}
