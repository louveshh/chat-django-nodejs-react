import express, { Request, Response } from 'express';

const _importDynamic = new Function('modulePath', 'return import(modulePath)');

export const fetch = async function (...args: any) {
    const {default: fetch} = await _importDynamic('node-fetch');
    return fetch(...args);
}

const router = express.Router();

router.post('/api/users/register', async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
  });
  
  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: 'Something went wrong when registering account',
    });
  }
});

export default router;