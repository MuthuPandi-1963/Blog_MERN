import React, { useState } from 'react';
import { Bookmark, Search, Filter, Grid3X3, List, Trash2, FolderPlus, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {BlogGrid}  from './BlogGrid';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

// Mock bookmarked blogs with folders/categories
const bookmarkedBlogs = [
  {
    id: '101',
    title: 'The Future of Web Development in 2024',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: 'Sarah Johnson',
    date: 'Dec 10, 2023',
    readTime: '6 min',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: true,
    folder: 'technology',
    tags: ['webdev', 'trends', 'javascript'],
    savedAt: '2023-12-15'
  },
  {
    id: '102',
    title: 'Sustainable Architecture Trends',
    excerpt: 'How modern architecture is embracing sustainability and eco-friendly designs.',
    author: 'Mike Chen',
    date: 'Dec 8, 2023',
    readTime: '5 min',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'gb',
    featured: false,
    folder: 'design',
    tags: ['architecture', 'sustainability', 'design'],
    savedAt: '2023-12-14'
  },
  {
    id: '103',
    title: 'The Psychology of Color in Marketing',
    excerpt: 'Understanding how color choices impact consumer behavior and brand perception.',
    author: 'Emma Wilson',
    date: 'Dec 5, 2023',
    readTime: '4 min',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'ca',
    featured: true,
    folder: 'marketing',
    tags: ['psychology', 'color-theory', 'branding'],
    savedAt: '2023-12-12'
  },
  {
    id: '104',
    title: 'Machine Learning in Healthcare',
    excerpt: 'Revolutionizing patient care and medical research with artificial intelligence.',
    author: 'Dr. James Park',
    date: 'Dec 3, 2023',
    readTime: '7 min',
    category: 'Health',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: false,
    folder: 'technology',
    tags: ['ai', 'healthcare', 'machine-learning'],
    savedAt: '2023-12-10'
  },
  {
    id: '105',
    title: 'The Rise of Remote Work Culture',
    excerpt: 'How companies are adapting to permanent remote work arrangements.',
    author: 'Lisa Rodriguez',
    date: 'Dec 1, 2023',
    readTime: '6 min',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: true,
    folder: 'business',
    tags: ['remote-work', 'culture', 'productivity'],
    savedAt: '2023-12-08'
  },
  {
    id: '106',
    title: 'Renewable Energy Breakthroughs',
    excerpt: 'Latest innovations in solar and wind energy technology that could change the world.',
    author: 'David Kim',
    date: 'Nov 28, 2023',
    readTime: '8 min',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'de',
    featured: false,
    folder: 'technology',
    tags: ['energy', 'sustainability', 'innovation'],
    savedAt: '2023-12-05'
  }
];

// Mock folders/categories
const folders = [
  { id: 'all', name: 'All Bookmarks', count: 6, icon: '📁' },
  { id: 'technology', name: 'Technology', count: 3, icon: '💻' },
  { id: 'design', name: 'Design', count: 1, icon: '🎨' },
  { id: 'marketing', name: 'Marketing', count: 1, icon: '📈' },
  { id: 'business', name: 'Business', count: 1, icon: '💼' },
  { id: 'reading-list', name: 'Reading List', count: 0, icon: '📚' }
];

export function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedBookmarks, setSelectedBookmarks] = useState(new Set());

  // Filter bookmarks based on search and folder
  const filteredBookmarks = bookmarkedBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFolder = selectedFolder === 'all' || blog.folder === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });

  // Sort bookmarks
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.savedAt) - new Date(a.savedAt);
      case 'oldest':
        return new Date(a.savedAt) - new Date(b.savedAt);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const toggleBookmarkSelection = (bookmarkId) => {
    const newSelection = new Set(selectedBookmarks);
    if (newSelection.has(bookmarkId)) {
      newSelection.delete(bookmarkId);
    } else {
      newSelection.add(bookmarkId);
    }
    setSelectedBookmarks(newSelection);
  };

  const deleteSelectedBookmarks = () => {
    // In a real app, you would make an API call here
    console.log('Deleting bookmarks:', Array.from(selectedBookmarks));
    setSelectedBookmarks(new Set());
  };

  const selectedFolderName = folders.find(f => f.id === selectedFolder)?.name;

  return (
    <div className="min-h-screen bg-background mt-16">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Bookmark className="h-8 w-8 text-primary" />
                Bookmarks
              </h1>
              <p className="text-muted-foreground mt-2">
                Your saved articles and reading list
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedBookmarks.size > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deleteSelectedBookmarks}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedBookmarks.size})
                </Button>
              )}
              <Button variant="outline" size="sm">
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Folders */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
                      selectedFolder === folder.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{folder.icon}</span>
                      <span className="font-medium">{folder.name}</span>
                    </div>
                    <span className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      selectedFolder === folder.id
                        ? "bg-primary-foreground/20"
                        : "bg-secondary"
                    )}>
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tags Section */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['webdev', 'ai', 'design', 'marketing', 'business'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Controls */}
            <div className="bg-card rounded-xl border border-border p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 w-full lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search in bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                  </select>

                  {/* View Mode */}
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

              {/* Results Info */}
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {filteredBookmarks.length} of {bookmarkedBlogs.length} bookmarks
                    {selectedFolder !== 'all' && ` in ${selectedFolderName}`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={selectedBookmarks.size === filteredBookmarks.length && filteredBookmarks.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBookmarks(new Set(filteredBookmarks.map(b => b.id)));
                        } else {
                          setSelectedBookmarks(new Set());
                        }
                      }}
                      className="rounded border-border"
                    />
                    Select all
                  </label>
                </div>
              </div>
            </div>

            {/* Bookmarks Grid */}
            {sortedBookmarks.length > 0 ? (
              <div className={cn(
                "grid gap-6",
                viewMode === 'grid' && "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
                viewMode === 'list' && "grid-cols-1"
              )}>
                {sortedBookmarks.map((blog) => (
                  <BookmarkCard
                    key={blog.id}
                    blog={blog}
                    viewMode={viewMode}
                    isSelected={selectedBookmarks.has(blog.id)}
                    onSelect={() => toggleBookmarkSelection(blog.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No bookmarks found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedFolder !== 'all'
                    ? 'Try adjusting your search or filter to find what you are looking for.'
                    : 'Start saving articles to see them here.'}
                </p>
                {!searchQuery && selectedFolder === 'all' && (
                  <Button>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Browse Articles
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Bookmark Card Component
function BookmarkCard({ blog, viewMode, isSelected, onSelect }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleRemoveBookmark = () => {
    // In a real app, you would make an API call here
    console.log('Removing bookmark:', blog.id);
    setShowMenu(false);
  };

  const handleMoveToFolder = (folderId) => {
    // In a real app, you would make an API call here
    console.log(`Moving bookmark ${blog.id} to folder ${folderId}`);
    setShowMenu(false);
  };

  return (
    <article
      className={cn(
        "group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg relative",
        viewMode === 'list' && "flex flex-col md:flex-row",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 rounded border-border bg-background"
        />
      </div>

      {/* Image Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          viewMode === 'list' ? "md:w-48 md:h-32 h-48" : "h-48"
        )}
      >
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {blog.category}
          </span>
        </div>

        {/* Folder Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-background/80 backdrop-blur text-xs">
            {folders.find(f => f.id === blog.folder)?.icon}
            <span className="ml-1">{folders.find(f => f.id === blog.folder)?.name}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "p-4 flex-1",
          viewMode === 'list' && "md:flex-1"
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3
              className={cn(
                "font-bold line-clamp-2 group-hover:text-primary transition-colors mb-2",
                viewMode === 'list' ? "text-lg" : "text-base"
              )}
            >
              {blog.title}
            </h3>

            <p
              className={cn(
                "text-muted-foreground line-clamp-2 mb-3",
                viewMode === 'list' ? "text-sm" : "text-xs"
              )}
            >
              {blog.excerpt}
            </p>
          </div>

          {/* Menu Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="h-8 w-8 p-0"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>

            {showMenu && (
              <div className="absolute right-0 top-8 bg-background border border-border rounded-lg shadow-lg z-20 w-48">
                <button
                  onClick={() => handleMoveToFolder('reading-list')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors"
                >
                  Move to Reading List
                </button>
                <button
                  onClick={() => handleMoveToFolder('technology')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-secondary transition-colors"
                >
                  Move to Technology
                </button>
                <div className="border-t border-border"></div>
                <button
                  onClick={handleRemoveBookmark}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Remove Bookmark
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>By {blog.author}</span>
            <span>{blog.readTime}</span>
            <span>Saved {new Date(blog.savedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {blog.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" className="text-xs h-7">
            Read Article
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            Share
          </Button>
        </div>
      </div>
    </article>
  );
}

// Input Component (if not already available)
const InputRef = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
InputRef.displayName = 'Input';