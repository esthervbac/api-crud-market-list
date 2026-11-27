import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("A variável de ambiente MONGO_URI não está definida.");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}
