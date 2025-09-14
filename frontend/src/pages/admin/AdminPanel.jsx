import { useState, useEffect } from "react";
import { Menu, X, ShoppingBasket, ListTree, Ruler, LogOut, User } from "lucide-react";
import Categories from "./Categories";
import Countries from "./Countries";
import Blogs from "./Blogs";
import axiosInstance from "../../helpers/AxiosInstance.jsx";
import { Outlet } from "react-router-dom";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, countryRes, blogRes] = await Promise.all([
          axiosInstance.get('/categories'),
          axiosInstance.get('/countries'),
          axiosInstance.get('/blogs'),
        ]);
        setCategories(Array.isArray(catRes.data.data) ? catRes.data.data : []);
        setCountries(Array.isArray(countryRes.data.data) ? countryRes.data.data : []);
        setBlogs(Array.isArray(blogRes.data.data) ? blogRes.data.data : []);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-xl font-bold">News_24 Admin Panel</h1>
          <button onClick={toggleSidebar} className="md:hidden text-white">
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
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                activeTab === "categories" ? "bg-[#29f700] text-black" : "hover:bg-gray-800"
              }`}
            >
              <ListTree size={20} className="mr-2" />
              Categories
            </button>
            <button
              onClick={() => setActiveTab("countries")}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                activeTab === "countries" ? "bg-[#29f700] text-black" : "hover:bg-gray-800"
              }`}
            >
              <Ruler size={20} className="mr-2" />
              Countries
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                activeTab === "blogs" ? "bg-[#29f700] text-black" : "hover:bg-gray-800"
              }`}
            >
              <ShoppingBasket size={20} className="mr-2" />
              Blogs
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
            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">
              {activeTab === "categories" && "Category Management"}
              {activeTab === "countries" && "Country Management"}
              {activeTab === "blogs" && "Blog Management"}
            </h2>
            <div></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
              <Outlet context={{categories, countries, blogs, setCategories, setBlogs, setCountries}} />
            {/* {activeTab === "categories" && <Categories categories={categories} setCategories={setCategories} />}
            {activeTab === "countries" && <Countries countries={countries} setCountries={setCountries} />}
            {activeTab === "blogs" && (
              <Blogs blogs={blogs} setBlogs={setBlogs} categories={categories} countries={countries} />
            )} */}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
