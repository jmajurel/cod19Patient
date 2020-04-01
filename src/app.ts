import express from "express";
import { Request, Response } from "express";
const app = express();

const PORT = process.env.PORT || 8082;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Cod19Patient is listenning on port: " + PORT);
});
