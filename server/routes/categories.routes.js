import { Router } from "express";
import asyncHandler from "../handlers/asynchandlers.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller.js";

const categoryRouter = Router();

categoryRouter.post("/", asyncHandler(createCategory)); // Create
categoryRouter.get("/", asyncHandler(getAllCategories));
categoryRouter.get("/:id", asyncHandler(getCategoryById));
categoryRouter.put("/:id", asyncHandler(updateCategory));
categoryRouter.delete("/:id", asyncHandler(deleteCategory));

export default categoryRouter;
