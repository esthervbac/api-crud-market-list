import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = "sua_chave_secreta_aqui";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email !== process.env.emailAuthorization ||
    password !== process.env.passwordAuthorization
  ) {
    return res.status(401).json({ message: "E-mail ou senha incorretos." });
  }

  const payload = {
    id: "id_do_usuario_123",
    email: email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h", // O token vai expirar em 1 hora (pode usar '1h', '2h', etc.)
  });

  return res.status(200).json({
    message: "Login realizado com sucesso!",
    token: token,
  });
};
