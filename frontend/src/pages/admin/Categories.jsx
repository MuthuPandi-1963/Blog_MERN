import React, { useState } from 'react';
import axios from 'axios';
import { Save, Edit, Trash2 } from 'lucide-react';
import ImageUpload from '../../Components/Sections/cloudinary/ImageUpload.jsx';
import axiosInstance from '../../helpers/AxiosInstance.jsx';

const Categories = ({ categories, setCategories }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingItem) setEditingItem({ ...editingItem, [field]: value });
    else setNewItem({ ...newItem, [field]: value });
  };

  const handleImageUpload = (url) => {
    if (editingItem) {
      setEditingItem(prev => ({
        ...prev,
        img: url
      }));
    } else {
      setNewItem(prev => ({
        ...prev,
        img: url
      }));
    }
  };

  const handleSave = async () => {
    if (editingItem) {
      // Update category in backend
      try {
        await axiosInstance.put(`/categories/${editingItem.id}`, editingItem);
        setCategories(categories.map(cat => cat.id === editingItem.id ? editingItem : cat));
        setEditingItem(null);
      } catch (error) {
        console.error('Error updating category:', error);
      }
    } else {
      const newCategory = { ...newItem, id: Date.now().toString() };
      // Send to backend
      try {
        await axiosInstance.post('/categories', newCategory);
        setCategories([...categories, newCategory]);
        setNewItem({});
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCancel = () => { setEditingItem(null); setNewItem({}); };

  const item = editingItem || newItem;

  return (
    <>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? 'Edit Category' : 'Add New Category'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" value={item.name || ''} onChange={(e) => handleInputChange(e, 'name')} className="px-3 py-2 border rounded-md" />
          <input type="text" placeholder="Description" value={item.description || ''} onChange={(e) => handleInputChange(e, 'description')} className="px-3 py-2 border rounded-md" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <ImageUpload onUpload={handleImageUpload} />
            {item.img && (
              <img src={item.img} alt="category" className="mt-2 w-32 h-20 object-cover rounded" />
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          {editingItem && <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>}
          <button onClick={handleSave} className="px-4 py-2 bg-[#29f700] text-black rounded-md flex items-center">
            <Save size={18} className="mr-1" /> Save
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b">
                <td className="px-6 py-2">{cat.name}</td>
                <td className="px-6 py-2">{cat.description}</td>
                <td className="px-6 py-2">
                  <button onClick={() => setEditingItem(cat)} className="text-blue-600 mr-3"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categories;
