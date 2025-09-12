// routes/blogRoutes.js
import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blog.controllers.js";

const blogRouter = Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.post("/", createBlog);
blogRouter.put("/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
