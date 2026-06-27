import type { Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler.js";

//POST CREATE JSON EXAMPLE

// {
//   "title": "Compras da semana",
//   "items": [
//     { "name": "Arroz", "quantity": 2 },
//     { "name": "Feijão", "quantity": 1 },
//     { "name": "Leite", "quantity": 3 }
//   ]
// }

let shoppingList: any[] = [];
let nextId = 1;

export const getItems = async (req: Request, res: Response) => {
  res.json(shoppingList);
};

export const getItemById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const item = shoppingList.find((i) => i.id === id);

  if (!item) {
    throw new AppError("Item não encontrado", 404);
  }

  res.json(item);
};

export const createItem = async (req: Request, res: Response) => {
  const { title, items } = req.body;

  if (!title || !items?.length) {
    throw new AppError("Título e itens são obrigatórios", 400);
  }

  const newItem = {
    id: nextId++,
    title,
    items,
    purchased: false,
  };

  shoppingList.push(newItem);

  res.status(201).json(newItem);
};

export const updateItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const item = shoppingList.find((i) => i.id === id);

  if (!item) {
    throw new AppError("Item não encontrado", 404);
  }

  const { title, purchased, items } = req.body;

  // Atualiza campos simples sem sobrescrever tudo
  item.title = title ?? item.title;
  item.purchased = purchased ?? item.purchased;

  // 👇 Merge inteligente dos itens (não apaga os antigos)
  if (items && Array.isArray(items)) {
    items.forEach((newItem) => {
      const existingItem = item.items.find(
        (i: { name: string }) => i.name === newItem.name,
      );

      // Se já existe, atualiza quantidade
      if (existingItem) {
        existingItem.quantity = newItem.quantity ?? existingItem.quantity;
      }
      // Se não existe, adiciona
      else {
        item.items.push(newItem);
      }
    });
  }

  res.json(item);
};

export const deleteItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const exists = shoppingList.some((i) => i.id === id);

  if (!exists) {
    throw new AppError("Item não encontrado", 404);
  }

  shoppingList = shoppingList.filter((i) => i.id !== id);

  res.status(204).send();
};
