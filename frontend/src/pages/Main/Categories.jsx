'use client';

import React, { useState, useEffect } from 'react';
import { CategorySlider } from '../../Components/custom/CategorySlider';
import { useCategories } from '../../hooks/useCategories'; // Custom hook to fetch categories
import { BlogGrid } from './BlogGrid';
import { useBlogs } from '../../hooks/useBlogs';

export default function Categories() {
  const { categories, isLoading: catLoading } = useCategories();
  const { blogs, isLoading: blogLoading } = useBlogs();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // 🔹 Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // 🔹 Filter blogs whenever blogs or selected category changes
  useEffect(() => {
    if (!blogLoading && blogs.length > 0) {
      if (selectedCategory === 'all') {
        setFilteredBlogs(blogs);
      } else {
        setFilteredBlogs(
          blogs.filter((blog) => blog.category?.id === selectedCategory)
        );
      }
    }
  }, [blogs, selectedCategory, blogLoading]);

  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold tracking-tight">News by Category</h1>
          <p className="text-muted-foreground mt-2">
            Explore articles by category
          </p>
        </div>
      </header>

      {/* Category Slider */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <CategorySlider
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedCategory === 'all'
                ? 'Latest News'
                : `Category: ${
                    categories.find((c) => c.id === selectedCategory)?.name
                  }`}
            </h2>
            <p className="text-muted-foreground mt-1">
              {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtered by:</span>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
                <span className="font-medium">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
                <button
                  onClick={() => handleCategorySelect('all')}
                  className="ml-2 hover:bg-primary-foreground/20 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <BlogGrid blogs={filteredBlogs} />
      </section>
    </div>
  );
}
