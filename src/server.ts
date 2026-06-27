import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectDatabase } from "./database/mongodb.js";

const PORT = Number(process.env.PORT) || 3030;

async function start() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
