// src/components/AdminPanel/Groceries.jsx
import React, { useState } from 'react';
import { Save, Edit, Trash2 } from 'lucide-react';

const Groceries = ({ groceries, setGroceries, categories, units }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    // For numeric fields, you may want to convert to number
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: field === 'quantity' || field === 'defaultQty' || field === 'period' ? Number(value) : value });
    } else {
      setNewItem({ 
        ...newItem, 
        [field]: field === 'quantity' || field === 'defaultQty' || field === 'period' ? Number(value) : value 
      });
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setGroceries(groceries.map(g => g.id === editingItem.id ? editingItem : g));
      setEditingItem(null);
    } else {
      const itemToAdd = {
        ...newItem,
        id: Date.now().toString(),
      };
      setGroceries([...groceries, itemToAdd]);
      setNewItem({});
    }
  };

  const handleDelete = (id) => {
    setGroceries(groceries.filter(g => g.id !== id));
  };

  const handleCancel = () => {
    setEditingItem(null);
    setNewItem({});
  };

  const item = editingItem || newItem;

  return (
    <>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingItem ? 'Edit Grocery Item' : 'Add New Grocery Item'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => handleInputChange(e, 'name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              value={item.img || ''}
              onChange={(e) => handleInputChange(e, 'img')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={item.quantity || ''}
              onChange={(e) => handleInputChange(e, 'quantity')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Default Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Quantity</label>
            <input
              type="number"
              value={item.defaultQty || ''}
              onChange={(e) => handleInputChange(e, 'defaultQty')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={item.categoryId || ''}
              onChange={(e) => handleInputChange(e, 'categoryId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          {/* Shelf Life (period) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life (days)</label>
            <input
              type="number"
              value={item.period || ''}
              onChange={(e) => handleInputChange(e, 'period')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={item.unitId || ''}
              onChange={(e) => handleInputChange(e, 'unitId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Unit</option>
              {units.map(unit => (
                <option key={unit.id} value={unit.id}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          {editingItem && (
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
        <h2 className="text-xl font-semibold mb-4">Groceries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groceries.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    { categories.find(cat => cat.id === item.categoryId)?.name || '-' }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    { units.find(un => un.id === item.unitId)?.symbol || '-' }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

export default Groceries;
