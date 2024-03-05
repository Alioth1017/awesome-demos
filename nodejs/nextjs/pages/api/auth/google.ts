// pages/api/auth/google.ts
import { NextApiRequest, NextApiResponse } from 'next';
import passport from '../passport-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
}
