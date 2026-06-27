import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectDatabase() {
  try {
    console.log("URI:", JSON.stringify(process.env.MONGO_URI));

    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}
