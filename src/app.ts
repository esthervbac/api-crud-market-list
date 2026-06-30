import express from "express";
import shoppingRoutes from "./routes/shoppingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API rodando");
});

app.use("/", authRoutes);

app.use("/shopping-list", shoppingRoutes);

app.use(errorHandler);

export default app;
