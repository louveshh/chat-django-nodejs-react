import express, { Request, Response } from 'express';
import { serialize } from 'cookie';

const router = express.Router();

router.get('/api/users/logout', (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', [
    serialize('access', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
    serialize('refresh', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
  ]);

  return res.status(200).json({ success: 'Logged out successfully' });
});

export default router;