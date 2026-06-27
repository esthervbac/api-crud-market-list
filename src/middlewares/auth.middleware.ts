import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sua_chave_secreta_aqui";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Erro no formato do token." });
  }

  const [scheme, token] = parts as [string, string];

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatado." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
};
