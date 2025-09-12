// routes/tagRoutes.js
import { Router } from "express";
import {
  createManyTags,
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  updateTag,
} from "../controllers/tags.controllers.js";

const tagsRouter = Router();

tagsRouter.get("/", getAllTags);
tagsRouter.get("/:id", getTag);
tagsRouter.post("/", createTag);
tagsRouter.post("/many", createManyTags);
tagsRouter.put("/:id", updateTag);
tagsRouter.delete("/:id", deleteTag);

export default tagsRouter;
