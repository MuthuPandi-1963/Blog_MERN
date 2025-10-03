import React, { useState } from 'react';
import { User, Bookmark, Settings, Edit3, Mail, MapPin, Calendar, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogGrid } from './BlogGrid';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { userContext } from '../../store/Context';

// Mock user data
const currentUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'WRITER',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  bio: 'Passionate writer and technology enthusiast. Love to share insights about AI, web development, and digital transformation.',
  country: {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸'
  },
  createdAt: '2023-01-15',
  stats: {
    blogs: 24,
    followers: 1247,
    following: 89,
    bookmarks: 32
  }
};

// Mock bookmarked blogs
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
    featured: true
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
    featured: false
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
    featured: true
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
    featured: false
  }
];

// Mock user's own blogs
const userBlogs = [
  {
    id: '201',
    title: 'Getting Started with React Server Components',
    excerpt: 'A comprehensive guide to understanding and using React Server Components in your applications.',
    author: currentUser.name,
    date: 'Dec 12, 2023',
    readTime: '8 min',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: true,
    views: 1245,
    likes: 89,
    comments: 23
  },
  {
    id: '202',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices and patterns for creating robust and scalable RESTful APIs.',
    author: currentUser.name,
    date: 'Dec 5, 2023',
    readTime: '6 min',
    category: 'Programming',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: false,
    views: 892,
    likes: 45,
    comments: 12
  },
  {
    id: '203',
    title: 'The Art of Technical Writing',
    excerpt: 'Tips and techniques for writing clear, concise, and engaging technical documentation.',
    author: currentUser.name,
    date: 'Nov 28, 2023',
    readTime: '5 min',
    category: 'Writing',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    country: 'us',
    featured: true,
    views: 1567,
    likes: 112,
    comments: 34
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
    const {user : currentUser} = useContext(userContext)
  return (
    <div className="min-h-screen bg-background mt-16">


      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="flex gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.stats.blogs}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.stats.followers}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.stats.following}</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.stats.bookmarks}</div>
                  <div className="text-sm text-muted-foreground">Bookmarks</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              My Blogs
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  
                  {isEditing ? (
                    <EditProfileForm user={currentUser} />
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem icon={<User className="w-4 h-4" />} label="Full Name" value={currentUser.name} />
                        <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={currentUser.email} />
                        <InfoItem icon={<MapPin className="w-4 h-4" />} label="Country" value={currentUser.country?.name || "India"} />
                        <InfoItem icon={<Calendar className="w-4 h-4" />} label="Member Since" value={new Date(currentUser.createdAt).toLocaleDateString()} />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Bio</label>
                        <p className="mt-1 text-sm">{currentUser.bio}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <ActivityItem 
                      type="blog" 
                      title="Published 'Getting Started with React Server Components'" 
                      time="2 days ago" 
                    />
                    <ActivityItem 
                      type="comment" 
                      title="Commented on 'The Future of AI'" 
                      time="3 days ago" 
                    />
                    <ActivityItem 
                      type="like" 
                      title="Liked 'Sustainable Web Development'" 
                      time="1 week ago" 
                    />
                    <ActivityItem 
                      type="bookmark" 
                      title="Bookmarked 'Machine Learning in Healthcare'" 
                      time="1 week ago" 
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Verification Status */}
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <StatusItem 
                      label="Email Verification" 
                      status={currentUser.isVerified ? 'verified' : 'pending'} 
                    />
                    <StatusItem 
                      label="Writer Status" 
                      status={currentUser.role === 'WRITER' ? 'verified' : 'basic'} 
                    />
                    <StatusItem 
                      label="Profile Completeness" 
                      status="complete" 
                    />
                  </div>
                </div>

              </div>
            </div>
          </TabsContent>

          {/* My Blogs Tab */}
          <TabsContent value="blogs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">My Blogs</h3>
                  <p className="text-muted-foreground mt-1">
                    {userBlogs.length} published article{userBlogs.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Write New Blog
                </Button>
              </div>
              <BlogGrid blogs={userBlogs} showViewOptions={false} />
            </div>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">Bookmarks</h3>
                <p className="text-muted-foreground mt-1">
                  {bookmarkedBlogs.length} saved article{bookmarkedBlogs.length !== 1 ? 's' : ''}
                </p>
              </div>
              <BlogGrid blogs={bookmarkedBlogs} showViewOptions={true} />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
              <div className="space-y-6">
                <SettingsSection title="Privacy" description="Manage your privacy settings">
                  <div className="space-y-4">
                    <SettingsToggle label="Make profile public" defaultChecked />
                    <SettingsToggle label="Show email to followers" />
                    <SettingsToggle label="Allow comments on blogs" defaultChecked />
                  </div>
                </SettingsSection>

                <SettingsSection title="Notifications" description="Choose what notifications you receive">
                  <div className="space-y-4">
                    <SettingsToggle label="Email notifications" defaultChecked />
                    <SettingsToggle label="New follower alerts" defaultChecked />
                    <SettingsToggle label="Blog comment notifications" />
                    <SettingsToggle label="Weekly digest" defaultChecked />
                  </div>
                </SettingsSection>

                <SettingsSection title="Danger Zone" description="Irreversible and destructive actions">
                  <div className="space-y-3">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Export Data
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </SettingsSection>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper Components
function InfoItem({ icon, label, value }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </label>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function ActivityItem({ type, title, time }) {
  const getIcon = () => {
    switch (type) {
      case 'blog': return <Edit3 className="w-4 h-4 text-green-600" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'like': return <Heart className="w-4 h-4 text-red-600" />;
      case 'bookmark': return <Bookmark className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

function StatusItem({ label, status }) {
  const getStatusColor = () => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'complete': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'verified': return 'Verified';
      case 'pending': return 'Pending';
      case 'complete': return 'Complete';
      default: return 'Basic';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    </div>
  );
}

function SettingsSection({ title, description, children }) {
  return (
    <div className="border-b border-border pb-6 last:border-b-0 last:pb-0">
      <div className="mb-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function SettingsToggle({ label, defaultChecked = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );
}

function EditProfileForm({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    country: user.country?.id
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Updating profile:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-muted-foreground">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button type="button" variant="outline">Cancel</Button>
      </div>
    </form>
  );
}

// Add missing Lucide icons
const MessageSquare = ({ className }) => <div className={className}>💬</div>;
const Heart = ({ className }) => <div className={className}>❤️</div>;
const Activity = ({ className }) => <div className={className}>📈</div>;