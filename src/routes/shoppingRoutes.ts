import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/shoppingController.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(getItems));
router.get("/:id", authMiddleware, asyncHandler(getItemById));
router.post("/", authMiddleware, asyncHandler(createItem));
router.put("/:id", authMiddleware, asyncHandler(updateItem));
router.delete("/:id", authMiddleware, asyncHandler(deleteItem));

export default router;
