import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '../../services/Test';
import { useEffect } from 'react';

export function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: newsData = [], isLoading, isError } = useNews();

  // Find the specific blog post by ID
  const blogPost = newsData.find((news) => news.article_id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="text-center">
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (isError || !blogPost) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="text-muted-foreground">
            {isError ? 'Error loading article' : 'The requested article could not be found'}
          </p>
          <Button onClick={() => navigate('/news')}>
            Back to News
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Category */}
        {blogPost.category && blogPost.category.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.category.map((cat, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                <Tag className="h-3 w-3 mr-1" />
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {blogPost.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
          {/* Author */}
          {blogPost.creator && blogPost.creator.length > 0 && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blogPost.creator.join(', ')}</span>
            </div>
          )}

          {/* Publication Date */}
          {blogPost.pubDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={blogPost.pubDate}>
                {formatDate(blogPost.pubDate)}
              </time>
            </div>
          )}

          {/* Source */}
          {blogPost.source_name && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{blogPost.source_name}</span>
            </div>
          )}

          {/* Country */}
          {blogPost.country && blogPost.country.length > 0 && (
            <div className="flex items-center gap-2">
              <span>📍 {blogPost.country.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {blogPost.image_url && (
          <div className="mb-8">
            <img
              src={blogPost.image_url}
              alt={blogPost.title}
              className="w-full h-auto rounded-lg object-cover max-h-96"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Description */}
        {blogPost.description && blogPost.description !== "ONLY AVAILABLE IN PAID PLANS" && (
          <div className="mb-8">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {blogPost.description}
            </p>
          </div>
        )}

        {/* Content */}
        {/* <div className="prose prose-lg max-w-none">
          {blogPost.content ? (
            <div className="whitespace-pre-line leading-relaxed text-justify">
              {blogPost.content}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-2">Full Content Available in Paid Plans</h3>
                <p className="text-muted-foreground text-sm">
                  The complete article content is only available to subscribers with paid plans.
                </p>
              </div>
            </div>
          )}
        </div> */}

        {/* Keywords */}
        {blogPost.keywords && blogPost.keywords.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-sm font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source Link */}
        {blogPost.link && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Original source: {blogPost.source_name}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(blogPost.link, '_blank')}
            >
              Read on {blogPost.source_name}
            </Button>
          </div>
        )}
      </article>

      {/* Related Articles Section - You can implement this later */}
      <div className="container mx-auto px-4 max-w-4xl mt-16">
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">More News</h2>
          <Button onClick={() => navigate('/news')}>
            Browse All Articles
          </Button>
        </div>
      </div>
    </div>
  );
}