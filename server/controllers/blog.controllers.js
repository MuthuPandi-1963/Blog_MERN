// controllers/blogController.js

import prisma from "../config/prismaConfig.js";


// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { tags: true, author: true, country: true, category: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      data: null,
    });
  }
};

// GET single blog by id
export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { tags: true, author: true, country: true, category: true, comments: true },
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
      data: null,
    });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, images, authorId, countryId, categoryId } = req.body;
  console.log(req.body);
  
  try {
    // 1. Validate required related records
    const author = await prisma.user.findUnique({ where: { id: authorId } });
    if (!author) return res.status(400).json({ success: false, message: "Author not found", data: null });

    const country = await prisma.country.findUnique({ where: { id: countryId } });
    if (!country) return res.status(400).json({ success: false, message: "Country not found", data: null });

    let category = null;
    if (categoryId) {
      category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) return res.status(400).json({ success: false, message: "Category not found", data: null });
    }
    const tagIds = req.body?.tagIds || []
    // 2. Validate tags (ignore any missing)
    let connectTags = [];
    if (tagIds?.length) {
      const existingTags = await prisma.tag.findMany({
        where: { id: { in: tagIds } },
      });
      connectTags = existingTags.map(tag => ({ id: tag.id }));
    }

    // 3. Create blog
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        coverImage : req.body?.coverImage || "",
        images,
        authorId,
        countryId,
        categoryId: categoryId || null,
        tags: { connect: connectTags },
      },
      include: { tags: true, author: true, country: true, category: true },
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      data: null,
    });
  }
};

// UPDATE a blog
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, coverImage, images, countryId, categoryId, tagIds } = req.body;

  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        coverImage,
        images,
        countryId,
        categoryId: categoryId || null,
        tags: tagIds
          ? {
              set: tagIds.map(id => ({ id })), // Replace all tags with new ones
            }
          : undefined,
      },
      include: { tags: true, author: true, country: true, category: true },
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      data: null,
    });
  }
};

// DELETE a blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.blog.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      data: null,
    });
  }
};
