import prisma from "../config/prismaConfig.js";


// Get all tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      include: { blogs: true }, // optional, include related blogs
    });
    res.status(200).json({
      success: true,
      message: "Tags fetched successfully",
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
      data: null,
    });
  }
};

// Get single tag by id
export const getTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: { blogs: true },
    });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: "Tag not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tag fetched successfully",
      data: tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tag",
      data: null,
    });
  }
};

// Create a new tag
export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await prisma.tag.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      message: "Tag created successfully",
      data: tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tag",
      data: null,
    });
  }
};

// Update a tag by id
export const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const tag = await prisma.tag.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: "Tag updated successfully",
      data: tag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update tag",
      data: null,
    });
  }
};

// Delete a tag by id
export const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tag.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Tag deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete tag",
      data: null,
    });
  }
};

// Create multiple tags at once
export const createManyTags = async (req, res) => {
  const { tags } = req.body; // expect [{name: "tag1"}, {name: "tag2"}]

  try {
    const createdTags = await prisma.tag.createMany({
      data: tags,
      skipDuplicates: true, // ignores duplicates
    });

    res.status(201).json({
      success: true,
      message: "Tags created successfully",
      data: createdTags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tags",
      data: null,
    });
  }
};
