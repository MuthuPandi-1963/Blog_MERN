import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Plus, Edit, Trash2, Save, ChevronDown, 
  ShoppingBasket, ListTree, Ruler, LogOut, User 
} from 'lucide-react';

// Mock data based on your schema
const mockCategories = [
  { id: '1', name: 'Fruits', description: 'Fresh fruits', img: '/fruits.jpg' },
  { id: '2', name: 'Vegetables', description: 'Fresh vegetables', img: '/vegetables.jpg' },
];

const mockUnits = [
  { id: '1', name: 'Kilogram', symbol: 'kg', type: 'weight' },
  { id: '2', name: 'Liter', symbol: 'L', type: 'volume' },
  { id: '3', name: 'Piece', symbol: 'pc', type: 'pieces' },
];

const mockGroceries = [
  { 
    id: '1', 
    name: 'Apples', 
    img: '/apples.jpg', 
    quantity: 5, 
    defaultQty: 5, 
    categoryId: '1', 
    period: 7, 
    unitId: '1' 
  },
  { 
    id: '2', 
    name: 'Milk', 
    img: '/milk.jpg', 
    quantity: 2, 
    defaultQty: 2, 
    categoryId: '2', 
    period: 5, 
    unitId: '2' 
  },
];

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState(mockCategories);
  const [units, setUnits] = useState(mockUnits);
  const [groceries, setGroceries] = useState(mockGroceries);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    } else {
      setNewItem({ ...newItem, [field]: value });
    }
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      if (activeTab === 'categories') {
        setCategories(categories.map(cat => cat.id === editingItem.id ? editingItem : cat));
      } else if (activeTab === 'units') {
        setUnits(units.map(unit => unit.id === editingItem.id ? editingItem : unit));
      } else if (activeTab === 'groceries') {
        setGroceries(groceries.map(grocery => grocery.id === editingItem.id ? editingItem : grocery));
      }
      setEditingItem(null);
    } else {
      // Add new item
      const itemToAdd = {
        ...newItem,
        id: Date.now().toString(), // In a real app, this would come from the backend
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      if (activeTab === 'categories') {
        setCategories([...categories, itemToAdd]);
      } else if (activeTab === 'units') {
        setUnits([...units, itemToAdd]);
      } else if (activeTab === 'groceries') {
        setGroceries([...groceries, itemToAdd]);
      }
      
      setNewItem({});
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({});
  };

  const handleDelete = (id) => {
    if (activeTab === 'categories') {
      setCategories(categories.filter(cat => cat.id !== id));
    } else if (activeTab === 'units') {
      setUnits(units.filter(unit => unit.id !== id));
    } else if (activeTab === 'groceries') {
      setGroceries(groceries.filter(grocery => grocery.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setNewItem({});
  };

  const renderForm = () => {
    const item = editingItem || newItem;
    
    if (activeTab === 'categories') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Category' : 'Add New Category'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleInputChange(e, 'name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={item.description || ''}
                onChange={(e) => handleInputChange(e, 'description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={item.img || ''}
                onChange={(e) => handleInputChange(e, 'img')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
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
      );
    } else if (activeTab === 'units') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Unit' : 'Add New Unit'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleInputChange(e, 'name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
              <input
                type="text"
                value={item.symbol || ''}
                onChange={(e) => handleInputChange(e, 'symbol')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={item.type || 'weight'}
                onChange={(e) => handleInputChange(e, 'type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="weight">Weight</option>
                <option value="volume">Volume</option>
                <option value="pieces">Pieces</option>
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
      );
    } else if (activeTab === 'groceries') {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit Grocery Item' : 'Add New Grocery Item'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleInputChange(e, 'name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={item.img || ''}
                onChange={(e) => handleInputChange(e, 'img')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={item.quantity || ''}
                onChange={(e) => handleInputChange(e, 'quantity')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Quantity</label>
              <input
                type="number"
                value={item.defaultQty || ''}
                onChange={(e) => handleInputChange(e, 'defaultQty')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={item.categoryId || ''}
                onChange={(e) => handleInputChange(e, 'categoryId')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shelf Life (days)</label>
              <input
                type="number"
                value={item.period || ''}
                onChange={(e) => handleInputChange(e, 'period')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
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
      );
    }
  };

  const renderList = () => {
    let items = [];
    if (activeTab === 'categories') items = categories;
    else if (activeTab === 'units') items = units;
    else if (activeTab === 'groceries') items = groceries;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {activeTab === 'categories' && 'Categories'}
          {activeTab === 'units' && 'Units'}
          {activeTab === 'groceries' && 'Groceries'}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {activeTab === 'categories' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
                {activeTab === 'units' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
                {activeTab === 'groceries' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map(item => (
                <tr key={item.id}>
                  {activeTab === 'categories' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
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
                    </>
                  )}
                  {activeTab === 'units' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
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
                    </>
                  )}
                  {activeTab === 'groceries' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {categories.find(cat => cat.id === item.categoryId)?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {units.find(unit => unit.id === item.unitId)?.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(item)}
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
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-30 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ height: '100vh' }}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-xl font-bold">NutriGuide Admin</h1>
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center p-2 mb-4 bg-gray-800 rounded-lg">
            <User size={20} className="mr-2" />
            <span>Admin User</span>
          </div>
          
          <nav>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${activeTab === 'categories' ? 'bg-[#29f700] text-black' : 'hover:bg-gray-800'}`}
            >
              <ListTree size={20} className="mr-2" />
              Categories
            </button>
            
            <button
              onClick={() => setActiveTab('units')}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${activeTab === 'units' ? 'bg-[#29f700] text-black' : 'hover:bg-gray-800'}`}
            >
              <Ruler size={20} className="mr-2" />
              Units
            </button>
            
            <button
              onClick={() => setActiveTab('groceries')}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${activeTab === 'groceries' ? 'bg-[#29f700] text-black' : 'hover:bg-gray-800'}`}
            >
              <ShoppingBasket size={20} className="mr-2" />
              Groceries
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button className="w-full flex items-center p-2 text-red-500 hover:bg-gray-800 rounded-lg">
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">
              {activeTab === 'categories' && 'Category Management'}
              {activeTab === 'units' && 'Unit Management'}
              {activeTab === 'groceries' && 'Grocery Management'}
            </h2>
            <div></div> {/* Empty div for spacing */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            {renderForm()}
            {renderList()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;