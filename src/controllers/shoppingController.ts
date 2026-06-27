import type { Request, Response } from "express";
import mongoose from "mongoose";
import Shopping from "../models/Shopping.js";
import { AppError } from "../middlewares/errorHandler.js";

export const getItems = async (req: Request, res: Response) => {
  const shoppingLists = await Shopping.find();

  if (shoppingLists.length === 0) {
    throw new AppError("Nenhuma lista encontrada", 404);
  }

  res.status(200).json({
    message: "Listas carregadas com sucesso!",
    data: shoppingLists,
  });
};

export const getItemById = async (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Lista não encontrada", 404);
  }

  const item = await Shopping.findById(id);

  if (!item) {
    throw new AppError("Lista não encontrada", 404);
  }

  res.json(item);
};

export const createItem = async (req: Request, res: Response) => {
  const { title, items } = req.body;

  if (!title || !items?.length) {
    throw new AppError("Título e itens são obrigatórios", 400);
  }

  const shopping = await Shopping.create({
    title,
    items,
    purchased: false,
  });

  res.status(201).json({
    message: "Lista criada com sucesso!",
    data: shopping,
  });
};

export const updateItem = async (req: Request, res: Response) => {
  const { title, purchased, items } = req.body;
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Lista não encontrada para atualização", 404);
  }

  const shopping = await Shopping.findById(req.params.id);

  if (!shopping) {
    throw new AppError("Lista não encontrada", 404);
  }

  shopping.title = title ?? shopping.title;
  shopping.purchased = purchased ?? shopping.purchased;

  if (items && Array.isArray(items)) {
    shopping.set("items", items as any);
  }

  await shopping.save();

  res.json({
    message: "Lista atualizada com sucesso!",
    data: shopping,
  });
};

export const deleteItem = async (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Lista não encontrada para ser deletada", 404);
  }

  const deleted = await Shopping.findByIdAndDelete(req.params.id);

  if (!deleted) {
    throw new AppError("Lista não encontrada", 404);
  }

  res.status(200).json({
    message: "Item deletado com sucesso!",
  });
};
