import express, { Request, Response } from "express";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

export const fetch = async function (...args: any) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(...args);
};

const router = express.Router();

router.get("/api/users/biomes", async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const apiRes = await fetch(
      `${process.env.API_URL}/api/users/biomes?page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

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
      error: "Something went wrong when trying to retrieve biomes",
    });
  }
});

export default router;
