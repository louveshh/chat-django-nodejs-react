import express, { Request, Response } from "express";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

const router = express.Router();

router.post("/api/users/remove", async (req: Request, res: Response) => {
  const { access } = req.cookies;
  const { email } = req.body;

  const body = JSON.stringify({
    email,
  });

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/remove`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body,
    });

    let data = null;
    try {
      data = await apiRes.json();
    } catch (e) {
      data = apiRes;
    }

    return res.status(apiRes.status).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong removing a city",
    });
  }
});

export default router;
