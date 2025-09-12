import React, { useState } from 'react';
import { Save, Edit, Trash2 } from 'lucide-react';
import ImageUpload from '../../Components/Sections/cloudinary/ImageUpload.jsx';

const Blogs = ({ blogs, setBlogs, categories }) => {
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({});

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingBlog) {
      setEditingBlog({ ...editingBlog, [field]: value });
    } else {
      setNewBlog({ ...newBlog, [field]: value });
    }
  };

  const handleImageUpload = (url) => {
    if (editingBlog) {
      setEditingBlog(prev => ({
        ...prev,
        coverImage: url
      }));
    } else {
      setNewBlog(prev => ({
        ...prev,
        coverImage: url
      }));
    }
  };

  const handleSave = () => {
    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? editingBlog : b));
      setEditingBlog(null);
    } else {
      const blogToAdd = {
        ...newBlog,
        id: Date.now().toString(),
      };
      setBlogs([...blogs, blogToAdd]);
      setNewBlog({});
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setNewBlog({});
  };

  const blog = editingBlog || newBlog;

  return (
    <>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingBlog ? 'Edit Blog' : 'Add New Blog'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={blog.title || ''}
              onChange={(e) => handleInputChange(e, 'title')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              value={blog.author || ''}
              onChange={(e) => handleInputChange(e, 'author')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={blog.categoryId || ''}
              onChange={(e) => handleInputChange(e, 'categoryId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <ImageUpload onUpload={handleImageUpload} />
            {blog.coverImage && (
              <img src={blog.coverImage} alt="cover" className="mt-2 w-32 h-20 object-cover rounded" />
            )}
          </div>
          {/* Content */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={blog.content || ''}
              onChange={(e) => handleInputChange(e, 'content')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={5}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          {editingBlog && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#29f700] text-black rounded-md flex items-center"
          >
            <Save size={18} className="mr-1" />
            Save
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Blogs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{blog.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    { categories.find(cat => cat.id === blog.categoryId)?.name || '-' }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt="cover" style={{ width: '40px', height: '24px', objectFit: 'cover' }} />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Blogs;