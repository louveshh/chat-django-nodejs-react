import express, { Request, Response } from "express";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

const router = express.Router();

router.get("/api/users/me", async (req: Request, res: Response) => {
  const { access } = req.cookies;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to retrieve user",
    });
  }
});

export default router;
