import React, { useContext, useState } from "react";
import { Save, Edit, Trash2 } from "lucide-react";
import ImageUpload from "../../Components/Sections/cloudinary/ImageUpload.jsx";
import axiosInstance from "../../helpers/AxiosInstance.jsx";
import { useOutletContext } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories.js";
import { userContext } from "../../store/Context.jsx";

const Blogs = () => {
  const {blogs,setBlogs} = useOutletContext()
  const [editingBlog, setEditingBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({});
  const blog = editingBlog || newBlog;
    const { categories, isLoading: catLoading } = useCategories();
    const {user} = useContext(userContext)
    console.log(user);
    
  
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingBlog) setEditingBlog({ ...editingBlog, [field]: value });
    else setNewBlog({ ...newBlog, [field]: value });
  };

  const handleImageUpload = (url) => {
    if (editingBlog) setEditingBlog((prev) => ({ ...prev, coverImage: url }));
    else setNewBlog((prev) => ({ ...prev, coverImage: url }));
  };

  const handleSave = async () => {
    if (editingBlog) {
      try {
        await axiosInstance.put(`/blogs/${editingBlog.id}`, editingBlog);
        // setBlogs(blogs.map((b) => (b.id === editingBlog.id ? editingBlog : b)));
        setEditingBlog(null);
      } catch (err) {
        console.log("err blog", err);
      }
    } else {
      try {
        const res = await axiosInstance.post(`/blogs`, {...newBlog,authorId:user?.id,countryId:user?.countryId});
        // Use backend response: res.data.data (if that's your format)
        console.log(res.data);
        
        const addedBlog = res.data?.data;
        // setBlogs([...blogs, addedBlog]);
        setNewBlog({});
      } catch (err) {
        console.log("err blog send", err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      console.log("err delete blog ", err);
    }
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setNewBlog({});
  };

  return (
    <>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{editingBlog ? "Edit Blog" : "Add New Blog"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={blog.title || ""}
            onChange={(e) => handleInputChange(e, "title")}
            className="px-3 py-2 border rounded-md"
          />
          {/* Author */}
          <input
            type="text"
            placeholder="Author"
            value={blog.author?.name || ""}
            onChange={(e) => handleInputChange(e, "author")}
            className="px-3 py-2 border rounded-md"
          />
          {/* Category */}
          <select
            value={blog.categoryId || ""}
            onChange={(e) => handleInputChange(e, "categoryId")}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {categories.length > 0 && categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            <ImageUpload onUpload={handleImageUpload} />
            {blog.coverImage && (
              <img src={blog.coverImage} alt="cover" className="mt-2 w-32 h-20 object-cover rounded" />
            )}
          </div>
          {/* Content */}
          <textarea
            placeholder="Content"
            value={blog.content || ""}
            onChange={(e) => handleInputChange(e, "content")}
            className="px-3 py-2 border rounded-md md:col-span-2"
            rows={5}
          />
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          {editingBlog && (
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md">
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Cover</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!blogs ? [] : blogs.map((blog) => (
              <tr key={blog.id} className="border-b">
                <td className="px-6 py-2">{blog.title}</td>
                <td className="px-6 py-2">{blog?.author?.name}</td>
                <td className="px-6 py-2">
                  {categories.length>0 && categories.find((cat) => cat.id === blog.categoryId)?.name || "-"}
                </td>
                <td className="px-6 py-2">
                  {blog.coverImage ? (
                    <img
                      src={blog.coverImage}
                      alt="cover"
                      style={{ width: "40px", height: "24px", objectFit: "cover" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="px-6 py-2">
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
    </>
  );
};

export default Blogs;
