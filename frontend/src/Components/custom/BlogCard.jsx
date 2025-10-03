import { cn } from '@/lib/utils';
import {Calendar, User, Clock, MapPin} from 'lucide-react'
import { Button } from '@/components/ui/button';


export default function BlogCard({ blog, viewMode, nav }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <article
      className={cn(
        'group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg',
        viewMode === 'list' && 'flex flex-col md:flex-row',
        viewMode === 'compact' && 'aspect-square'
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden bg-muted',
          viewMode === 'list' ? 'md:w-64 md:h-48 h-48' : 'h-48',
          viewMode === 'compact' && 'h-32'
        )}
      >
        <img
          src={
            blog.imageUrl ||
            'https://res.cloudinary.com/dh2r2wxw0/image/upload/v1735572235/headphone-1_tb2hfp.png'
          }
          alt={blog.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
            viewMode === 'compact' && 'group-hover:scale-110'
          )}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Category */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {blog.category?.name || 'General'}
          </span>
        </div>

        {/* Featured */}
        {blog.featured && viewMode !== 'compact' && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium">
              Featured
            </span>
          </div>
        )}

        {/* Flag */}
        {blog.country?.flag && (
          <div className="absolute bottom-3 left-3">
            <img
              src={blog.country.flag}
              alt={blog.country?.name || ''}
              className="w-8 rounded-2xl object-cover"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn('p-4 flex-1', viewMode === 'list' && 'md:flex-1')}>
        {/* Compact Meta */}
        {viewMode === 'compact' && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              {formatDate(blog.createdAt)}
            </span>
            {blog.featured && (
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            )}
          </div>
        )}

        {/* Standard Meta */}
        {viewMode !== 'compact' && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="capitalize">{blog.country?.name || 'Global'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{blog.readTime || '10 min'}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            'font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2',
            viewMode === 'compact' && 'text-sm line-clamp-3',
            viewMode === 'list' && 'text-xl',
            viewMode === 'grid' && 'text-lg'
          )}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        {viewMode !== 'compact' && (
          <p
            className={cn(
              'text-muted-foreground line-clamp-2 mb-4',
              viewMode === 'list' && 'text-base line-clamp-3',
              viewMode === 'grid' && 'text-sm'
            )}
          >
            {blog.content}
          </p>
        )}

        {/* Footer */}
        <div
          className={cn(
            'flex items-center justify-between',
            viewMode === 'compact' && 'mt-auto pt-2 border-t border-border'
          )}
        >
          <div className="flex items-center gap-2">
            <User className="w-3 h-3 text-muted-foreground" />
            <span
              className={cn(
                'text-muted-foreground',
                viewMode === 'compact' ? 'text-xs' : 'text-sm'
              )}
            >
              {blog.author?.name || 'Unknown'}
            </span>
          </div>

          <Button
            onClick={() =>
              nav( `/blogs/${blog.id}`, {state: blog})
            }
            variant="ghost"
            size={viewMode === 'compact' ? 'sm' : 'default'}
            className={cn('text-xs', viewMode === 'compact' && 'h-7 px-2')}
          >
            Read
          </Button>
        </div>
      </div>
    </article>
  );
}