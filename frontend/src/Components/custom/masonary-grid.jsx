import React from 'react';
import { cn } from '@/lib/utils';

export function MasonryGrid({ blogs, columns = 3 }) {
  // Split blogs into columns for masonry layout
  const columnWrapper = {};
  const result = [];

  // Create columns
  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // Split blogs into columns
  blogs.forEach((blog, index) => {
    const columnIndex = index % columns;
    columnWrapper[`column${columnIndex}`].push(blog);
  });

  for (let i = 0; i < columns; i++) {
    result.push(columnWrapper[`column${i}`]);
  }

  return (
    <div className={cn(
      "grid gap-6",
      columns === 2 && "grid-cols-1 md:grid-cols-2",
      columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    )}>
      {result.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-6">
          {column.map((blog) => (
            <MasonryCard key={blog.id} blog={blog} />
          ))}
        </div>
      ))}
    </div>
  );
}

function MasonryCard({ blog }) {
  return (
    <article className="group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {blog.category}
          </span>
        </div>

        {/* Featured Badge */}
        {blog.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="capitalize">{blog.country}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">By {blog.author}</span>
          </div>
          
          <button className="text-xs text-primary hover:underline transition-colors">
            Read More
          </button>
        </div>
      </div>
    </article>
  );
}