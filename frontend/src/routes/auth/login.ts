import express, { Request, Response } from 'express';
import { serialize } from 'cookie';

const _importDynamic = new Function('modulePath', 'return import(modulePath)');

export const fetch = async function (...args: any) {
    const {default: fetch} = await _importDynamic('node-fetch');
    return fetch(...args);
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const router = express.Router();

router.post('/api/users/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const body = JSON.stringify({ email, password });
  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await apiRes.json();

    if (apiRes.status === 200) {
      const responseData = data as LoginResponse;

      res.setHeader('Set-Cookie', [
        serialize('access', responseData.access, {
          httpOnly: true,
          maxAge: 60 * 30,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
        serialize('refresh', responseData.refresh, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: '/api/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        }),
      ]);

      return res.status(200).json({ success: 'Logged in successfully' });
    } else {
      return res.status(apiRes.status).json(data);
    }
  } catch (err) {
    return res.status(500).json({
      error: 'Something went wrong when logging in',
    });
  }
});

export default router;