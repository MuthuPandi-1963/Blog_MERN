import { useState } from 'react';
import ImageUpload from '../../Components/Sections/cloudinary/ImageUpload';
import flag from '/assets/white-flag.png';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../helpers/AxiosInstance.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const fetchCountries = async () => {
  const res = await axiosInstance.get("/countries");
  return res.data?.data || [];
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
    bio: '',
    countryId: '',
  });
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { data: countries = [], isLoading: countriesLoading, error: countriesError } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarUpload = (url) => {
    setFormData({ ...formData, avatar: url });
    setAvatarPreview(url);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar,
        bio: formData.bio,
        countryId: formData.countryId,
      };
      const response = await axiosInstance.post('/auth/register', payload);
      console.log("res",response);
      
      if (response.data?.success) {
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(
          response.data?.message ||
          'Registration failed. Please try again.'
        );
      }
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null,
        bio: '',
        countryId: '',
      });
      setAvatarPreview(null);
      setStep(1);
    } catch (err) {
      console.log("err",err);
      
      toast.error(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-orange-500">
        <div className="bg-orange-500 p-6 text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2">Join our community of writers and readers</p>
        </div>
        <div className="p-6">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 1 ? 'bg-orange-500' : 'bg-gray-700'}`}>
                <span className="font-bold">1</span>
              </div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-orange-500' : 'bg-gray-700'}`}>
                <span className="font-bold">2</span>
              </div>
            </div>
          </div>
          {countriesLoading && <div className="mb-4 text-orange-500 text-center">Loading countries...</div>}
          {countriesError && <div className="mb-4 text-red-500 text-center">Failed to load countries.</div>}
          <div >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 text-orange-500">Basic Information</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-orange-500'}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-orange-500'}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-orange-500'}`}
                    placeholder="Create a password"
                  />
                  {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-orange-500'}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <div className="gotologin">
                  Already have an account?{' '}
                  <span onClick={()=>navigate('/login')} className="cursor-pointer text-orange-500 hover:text-orange-400 font-medium">
                    Log in
                  </span>  
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  disabled={loading}
                >
                  Continue
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 text-orange-500">Profile Details</h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <label className="block text-sm font-medium mb-1">Profile Picture</label>
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-gray-800 border border-dashed border-gray-700 flex items-center justify-center mb-4 overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-500">No image</span>
                        )}
                      </div>
                      
                      <ImageUpload onUpload={handleAvatarUpload} />
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <select
                        name="countryId"
                        value={formData.countryId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={countriesLoading}
                      >
                        <option value="">Select your country</option>
                        {(Array.isArray(countries) ? countries : []).map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name} ({country.code})
                          </option>
                        ))}
                      </select>
                      {formData.countryId && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={
                              countries.find(c => c.id === formData.countryId)?.flag ||
                              flag
                            }
                            alt="Flag"
                            className="w-8 h-5 object-cover rounded border"
                          />
                          <span>
                            {countries.find(c => c.id === formData.countryId)?.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Tell us a little about yourself..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-orange-500 font-medium mb-1">Verification</p>
                  <p className="text-sm text-gray-400">
                    A verification link will be sent to your email address after registration. 
                    Please click on that link to verify your account.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    disabled={loading}
                  >
                    Back
                  </button>
                  <button
                  onClick={handleSubmit}
                    type="button"
                    className="flex-1 bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;