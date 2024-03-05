// pages/api/auth/facebook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import passport from '../passport-config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('facebook')(req, res);
}
