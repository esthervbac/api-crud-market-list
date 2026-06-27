import express from "express";
import shoppingRoutes from "./routes/shoppingRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.use("/shopping-list", shoppingRoutes);

app.use(errorHandler);

export default app;
