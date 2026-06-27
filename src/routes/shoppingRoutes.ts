import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/shoppingController.js";

const router = Router();

router.get("/", asyncHandler(getItems));
router.get("/:id", asyncHandler(getItemById));
router.post("/", asyncHandler(createItem));
router.put("/:id", asyncHandler(updateItem));
router.delete("/:id", asyncHandler(deleteItem));

export default router;
