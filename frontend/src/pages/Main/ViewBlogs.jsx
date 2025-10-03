import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Globe,
  Tag,
  User,
  Send,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BlogViewPage = () => {
  const [comment, setComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  const [viewCount, setViewCount] = useState(2843);
  const {state : blog}  =useLocation()
  console.log(blog);
  
  

  const comments = [
    {
      id: '1',
      content: 'This is a fantastic overview of AI in healthcare! The section on personalized treatment particularly resonated with me.',
      user: {
        id: '2',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        isVerified: true
      },
      createdAt: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      content: 'As a medical professional, I\'ve seen firsthand how AI is transforming our field. Great article!',
      user: {
        id: '3',
        name: 'Dr. Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        isVerified: true
      },
      createdAt: '2024-01-16T09:15:00Z'
    }
  ];

  // Mock related blogs
  const relatedBlogs = [
    {
      id: '2',
      title: 'Machine Learning in Medical Diagnostics',
      excerpt: 'How ML algorithms are improving diagnostic accuracy across various medical specialties.',
      author: { name: 'Dr. Michael Brown' },
      readTime: '6 min read',
      createdAt: '2024-01-10T08:00:00Z'
    },
    {
      id: '3',
      title: 'The Ethics of AI in Healthcare',
      excerpt: 'Exploring the ethical considerations and responsibilities in AI-driven medical decisions.',
      author: { name: 'Dr. Lisa Wang' },
      readTime: '7 min read',
      createdAt: '2024-01-08T14:20:00Z'
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Handle comment submission
      console.log('New comment:', comment);
      setComment('');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      
      <div className=" mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Blog Header */}
            <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Cover Image */}
              <div className="relative h-80 md:h-96 bg-gray-200">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="flex items-center gap-4 justify-end pr-8 pt-4 absolute top-0 -right-2">
              <Button variant="" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Category and Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
                    {blog.category.name}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{viewCount.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={blog.author.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {blog.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{blog.author.name}</h3>
                        {blog.author.isVerified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <img src={blog.country.flag} alt="" className='mr-1 w-6 rounded-sm'/>
                        {blog.country.name} 
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLike}
                      className={isLiked ? 'text-red-600 border-red-200 bg-red-50' : ''}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {likeCount}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleBookmark}
                      className={isBookmarked ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map(tag => (
                    <Badge key={tag.id} variant="outline" className="text-gray-600 bg-gray-50">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                {/* Blog Content */}
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Additional Images */}
                {blog.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {blog.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Blog image ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{likeCount} likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{comments.length} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{viewCount.toLocaleString()} views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Comments ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={!comment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback className="bg-gray-200">
                          {comment.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{comment.user.name}</span>
                              {comment.user.isVerified && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <button className="hover:text-blue-600 transition-colors">Like</button>
                          <button className="hover:text-blue-600 transition-colors">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Author Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={blog.author.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg">
                      {blog.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-gray-900 mb-1">{blog.author.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Writer • {blog.country.name}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {blog.author.bio}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest stories from {blog.author.name} and other writers
                </p>
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/20 border-white/30 text-white placeholder-blue-200 mb-3"
                />
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogViewPage;