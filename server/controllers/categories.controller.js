import prisma from '../config/prismaConfig.js';
import AppError from '../handlers/AppError.js';

/**
 * @desc Create a new category
 * @route POST /api/categories
 */
export const createCategory = async (req, res, next) => {
  const { name, description, img } = req.body;

  if (!name) {
    return next(new AppError('Category name is required', 400));
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
      img,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
};

/**
 * @desc Get all categories
 * @route GET /api/categories
 */
export const getAllCategories = async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json({
    success: true,
    results: categories.length,
    data: categories,
  });
};

/**
 * @desc Get category by ID
 * @route GET /api/categories/:id
 */
export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

/**
 * @desc Update category by ID
 * @route PUT /api/categories/:id
 */
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, img } = req.body;

  const category = await prisma.category.update({
    where: { id },
    data: {
      name,
      description,
      img,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
};

/**
 * @desc Delete category by ID
 * @route DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  await prisma.category.delete({
    where: { id },
  });

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
};
