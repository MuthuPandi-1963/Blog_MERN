// src/components/AdminPanel/Units.jsx
import { useState } from 'react';
import { Save, Edit, Trash2 } from 'lucide-react';
import ImageUpload from '../../Components/Sections/cloudinary/ImageUpload.jsx';
import axiosInstance from '../../helpers/AxiosInstance.jsx';

const Countries = ({ countries, setCountries }) => {
  const [editingCountry, setEditingCountry] = useState(null);
  const [newCountry, setNewCountry] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCountry) {
      setEditingCountry({ ...editingCountry, [name]: value });
    } else {
      setNewCountry({ ...newCountry, [name]: value });
    }
  };

  const handleImageUpload = (url) => {
    if (editingCountry) {
      setEditingCountry(prev => ({
        ...prev,
        imgUrl: url
      }));
    } else {
      setNewCountry(prev => ({
        ...prev,
        imgUrl: url
      }));
    }
  };

  const handleSave = async () => {
    if (editingCountry) {
      try {
        await axiosInstance.put(`/countries/${editingCountry.id}`, editingCountry);
        setCountries(countries.map(country => country.id === editingCountry.id ? editingCountry : country));
        setEditingCountry(null);
      } catch (err) {
        console.log("err update countries", err);
      }
    } else {
      try {
        const response = await axiosInstance.post(`/countries`, newCountry);
        // If backend returns { success, data: {...} }
        const addedCountry = response.data.data || response.data;
        setCountries([...countries, addedCountry]);
        setNewCountry({});
      } catch (err) {
        console.log('err send countries:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/countries/${id}`);
      setCountries(countries.filter(country => country.id !== id));
    } catch (err) {
      console.log("delete errr", err);
    }
  };

  const handleCancel = () => {
    setEditingCountry(null);
    setNewCountry({});
  };

  const country = editingCountry || newCountry;

  return (
    <>
      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingCountry ? 'Edit Country' : 'Add New Country'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Name</label>
            <input
              type="text"
              name="name"
              value={country.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
            <input
              type="text"
              name="code"
              value={country.code || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Flag</label>
            <ImageUpload onUpload={handleImageUpload} />
            {country.imgUrl && (
              <img src={country.imgUrl} alt="flag" className="mt-2 w-32 h-20 object-cover rounded" />
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          {editingCountry && (
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
        <h2 className="text-xl font-semibold mb-4">Countries</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(Array.isArray(countries) ? countries : []).map(country => (
              <tr key={country.id}>
                <td className="px-6 py-4 whitespace-nowrap">{country.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{country.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {country.imgUrl ? (
                    <img src={country.imgUrl} alt="flag" style={{ width: '40px', height: '24px', objectFit: 'cover' }} />
                  ) : (
                    'No flag'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => setEditingCountry(country)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(country.id)}
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

export default Countries;
