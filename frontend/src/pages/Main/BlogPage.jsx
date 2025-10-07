import { useState } from 'react';
import { Grid3X3, List, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../Components/custom/BlogCard';
import { cn } from '@/lib/utils';
import { useNews } from '../../services/Test';

export function BlogPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');
  const nav = useNavigate();
  const { data: newsData = [], isError, isLoading } = useNews();

  // Transform the API data to match your BlogCard expected format
  const transformedBlogs = newsData.map((newsItem, index) => ({
    id: newsItem.article_id || `news-${index}`,
    title: newsItem.title,
    description: newsItem.description,
    content: newsItem.content,
    imageUrl: newsItem.image_url,
    category: newsItem.category?.[0] || 'news',
    author: newsItem.creator?.[0] || 'Unknown',
    publishedAt: newsItem.pubDate,
    source: newsItem.source_name,
    link: newsItem.link,
    keywords: newsItem.keywords || [],
    country: newsItem.country?.[0] || '',
    language: newsItem.language,
    // Add any other fields your BlogCard might need
  }));

  // Sort blogs
  const sortedBlogs = [...transformedBlogs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    return a.id.localeCompare(b.id);
  });

  // Add loading state
  if (isLoading) {
    return (
      <div className="space-y-6 mt-20 mx-10">
        <div className="flex justify-center items-center h-64">
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  // Add error state
  if (isError) {
    return (
      <div className="space-y-6 mt-20 mx-10">
        <div className="flex justify-center items-center h-64">
          <p>Error loading news. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-20 mx-10">
      {/* Header */}
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