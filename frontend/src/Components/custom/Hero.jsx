import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  TrendingUp,
  Clock,
  Bookmark,
  Users,
  Tag,
  Globe,
  Calendar,
  ArrowRight,
  ThumbsUp,
  MessageCircle,
  Eye,
  PenTool
} from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useCountries } from '../../hooks/useCountries';
import { Link } from 'react-router-dom';
import { useBlogs } from '../../hooks/useBlogs';

const ThreeColumnLayout = () => {
  const [activeTab, setActiveTab] = useState('trending');
      const {categories} = useCategories()
      const {countries} = useCountries()
      const {blogs} = useBlogs()
      console.log(blogs);
      
  // Mock data for trending articles
  const trendingArticles = [
    {
      id: 1,
      title: "The Future of AI in Healthcare: What to Expect in 2024",
      excerpt: "Artificial intelligence is revolutionizing healthcare with breakthroughs in diagnostics, treatment planning, and patient care.",
      author: "Dr. Sarah Chen",
      date: "2 hours ago",
      readTime: "8 min read",
      category: "Technology",
      country: "United States",
      likes: 245,
      comments: 32,
      views: "12.4k",
      authorInitials: "SC"
    },
    {
      id: 2,
      title: "Sustainable Architecture: Building the Cities of Tomorrow",
      excerpt: "How innovative design and green technology are shaping sustainable urban development worldwide.",
      author: "Marco Rodriguez",
      date: "5 hours ago",
      readTime: "6 min read",
      category: "Design",
      country: "Spain",
      likes: 189,
      comments: 24,
      views: "8.7k",
      authorInitials: "MR"
    },
    {
      id: 3,
      title: "The Psychology Behind Viral Content",
      excerpt: "Understanding what makes content shareable and how to create meaningful engagement with your audience.",
      author: "Alex Johnson",
      date: "1 day ago",
      readTime: "5 min read",
      category: "Marketing",
      country: "United Kingdom",
      likes: 312,
      comments: 41,
      views: "15.2k",
      authorInitials: "AJ"
    }
  ];

  // Mock data for recent articles
  const recentArticles = [
    {
      id: 4,
      title: "The Rise of Digital Nomads: Work From Anywhere Culture",
      excerpt: "How remote work is transforming lifestyles and creating new opportunities for global citizens.",
      author: "James Wilson",
      date: "30 minutes ago",
      readTime: "7 min read",
      category: "Lifestyle",
      country: "Thailand",
      likes: 87,
      comments: 12,
      views: "3.2k",
      authorInitials: "JW"
    },
    {
      id: 5,
      title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
      excerpt: "Exploring how blockchain technology is being used in supply chain, healthcare, and digital identity.",
      author: "Priya Patel",
      date: "1 hour ago",
      readTime: "10 min read",
      category: "Technology",
      country: "India",
      likes: 134,
      comments: 18,
      views: "5.6k",
      authorInitials: "PP"
    }
  ];


  // Mock data for featured writers
  const featuredWriters = [
    { name: "Sarah Chen", followers: "12.4k", articles: 45, initials: "SC" },
    { name: "Alex Johnson", followers: "9.8k", articles: 32, initials: "AJ" },
    { name: "Marco Rodriguez", followers: "8.2k", articles: 28, initials: "MR" },
    { name: "Priya Patel", followers: "7.5k", articles: 36, initials: "PP" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Hero categories={categories}/>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex gap-8 ">
          


          {/* Main Content */}
          <main className="flex-1 ">
            {/* Content Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
                <p className="text-gray-600">Discover trending content from around the world</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Write a Story
                <PenTool className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent
                </TabsTrigger>
              </TabsList>

              {/* Trending Content */}
              <TabsContent value="trending" className="space-y-6 overflow-y-scroll max-h-screen">
                {blogs.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {article.category.name}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Globe className="h-3 w-3" />
                              {article.country.name}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {/* {article.readTime} */}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-1">
                            {article.content}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={article.author.avatar} />
                                <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                                  {article.authorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                                <p className="text-xs text-gray-500">{new Date(article.createdAt).toUTCString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                {/* <span>{article.likes}</span> */}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {/* <span>{article.comments}</span> */}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {/* <span>{article.views}</span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="hidden sm:block">
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <div className="text-4xl">📖</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Recent Content */}
              <TabsContent value="recent" className="space-y-6">
                {recentArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {article.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Globe className="h-3 w-3" />
                              {article.country}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                                  {article.authorInitials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{article.author}</p>
                                <p className="text-xs text-gray-500">{article.date}</p>
                              </div>
                            </div>
                            
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              Read More
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

            </Tabs>
          </main>

          {/* Right Sidebar */}
          <aside className="w-sm  grid gap-8 h-fit overflow-clip" >

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-600" />
                  Popular Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <img src={category.img} className="w-8 rounded-xl mr-4 group-hover:text-blue-600 transition-colors"/>
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Trending Countries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {countries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <img className="w-10 rounded-xl"src={country.flag}/>
                      <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                        {country.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {country.code}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Featured Writers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredWriters.map((writer, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {writer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {writer.name}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{writer.followers} followers</span>
                        <span>{writer.articles} stories</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;   


export const Hero = ({categories}) => {


  return (
    <div className="relative w-full h-screen bg-[url('./image.jpeg')] bg-center bg-cover grid place-content-center">
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-7xl tracking-wider font-bold text-white hover:scale-105 transition-transform duration-300"
        >
          News<span className="text-orange-500">24</span>
        </Link>

        {/* Tagline */}
        <p className="mt-4 text-xl text-gray-200 max-w-xl">
          Explore trending blogs and breaking news from around the world.
        </p>


        {/* Featured Categories (optional) */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant="outline"
              size="sm"
              className="text-white bg-black border-gray-300 hover:bg-orange-500 hover:border-orange-500"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
