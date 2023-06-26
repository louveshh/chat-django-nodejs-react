import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

import loginRoute from "./routes/auth/login";
import logoutRoute from "./routes/auth/logout";
import meRoute from "./routes/auth/me";
import registerRoute from "./routes/auth/register";
import verifyRoute from "./routes/auth/verify";
import addRoute from "./routes/map/add";
import mapRoute from "./routes/map/map";
import removeRoute from "./routes/map/remove";
import biomesRoute from "./routes/map/biomes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(registerRoute);
app.use(verifyRoute);
app.use(addRoute);
app.use(mapRoute);
app.use(removeRoute);
app.use(biomesRoute);

app.use(express.static("client/build"));
app.get("*", (req: Request, res: Response) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT: number = Number(process.env.PORT ?? 5000);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
