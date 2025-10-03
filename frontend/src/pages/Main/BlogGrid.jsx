import { useState } from 'react';
import {  Grid3X3, List, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../Components/custom/BlogCard';
import { cn } from '@/lib/utils';
export function BlogGrid({ blogs, showViewOptions = true }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const nav = useNavigate();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg">No articles found.</div>
        <Button variant="outline" className="mt-4">
          View All News
        </Button>
      </div>
    );
  }

  // Sort blogs
  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Popular mock sort (replace with real views/likes)
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="space-y-6 mt-20 mx-10">
      {/* Header */}
      {showViewOptions && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
            <p className="text-muted-foreground mt-1">
              {sortedBlogs.length} article{sortedBlogs.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex bg-secondary rounded-lg p-1">
                <Button
                  variant={sortBy === 'latest' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('latest')}
                  className="h-8 px-3 text-xs"
                >
                  Latest
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy('popular')}
                  className="h-8 px-3 text-xs"
                >
                  Popular
                </Button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'compact' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('compact')}
                className="h-8 w-8"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        className={cn(
          'grid gap-6',
          viewMode === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          viewMode === 'compact' &&
            'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          viewMode === 'list' && 'grid-cols-1'
        )}
      >
        {sortedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} viewMode={viewMode} nav={nav} />
        ))}
      </div>
    </div>
  );
}

// Blog Card

