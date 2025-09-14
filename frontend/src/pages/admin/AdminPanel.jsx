import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBasket,
  ListTree,
  Ruler,
  LogOut,
  User,
} from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../helpers/AxiosInstance.jsx";

const AdminPanel = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /** ================================
   *  React Query API Calls
   *  ================================ */
  const { data : categoriesData, isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/categories");
      console.log(res.data);
      
      return res.data;
    },
    retry: 1,
  });

  const { data: countriesData, isLoading: countryLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axiosInstance.get("/countries");
      return res.data;
    },
    retry: 1,
  });

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blogs");
      return res.data;
    },
    retry: 1,
  });

  // Extract data safely
  const categories = categoriesData?.data || [];
  const countries = countriesData?.data || [];
  const blogs = blogsData?.data || [];
  // console.log(categories,countries,blogs);
  
  /** ================================
   *  Sidebar toggle on screen resize
   *  ================================ */
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /** ================================
   *  Logout Handler
   *  ================================ */
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  /** ================================
   *  Dynamic Title based on Path
   *  ================================ */
  const getTitle = () => {
    if (location.pathname.includes("countries")) return "Country Management";
    if (location.pathname.includes("blogs")) return "Blog Management";
    return "Category Management";
  };

  /** ================================
   *  Loading State
   *  ================================ */
  if (catLoading || countryLoading || blogsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ================================ Sidebar ================================ */}
      <div
        className={`fixed md:relative z-30 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h1 className="text-xl font-bold">News_24 Admin Panel</h1>
          <button onClick={toggleSidebar} className="md:hidden text-white">
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="p-4">
          <div className="flex items-center p-2 mb-4 bg-gray-800 rounded-lg">
            <User size={20} className="mr-2" />
            <span>Admin User</span>
          </div>
          <nav>
            {/* Categories */}
            <Link
              to={""}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                location.pathname === "/admin" || location.pathname === "/admin/"
                  ? "bg-[#29f700] text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              <ListTree size={20} className="mr-2" />
              Categories
            </Link>

            {/* Countries */}
            <Link
              to={"countries"}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                location.pathname.includes("countries")
                  ? "bg-[#29f700] text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              <Ruler size={20} className="mr-2" />
              Countries
            </Link>

            {/* Blogs */}
            <Link
              to={"blogs"}
              className={`w-full flex items-center p-2 mb-2 rounded-lg ${
                location.pathname.includes("blogs")
                  ? "bg-[#29f700] text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              <ShoppingBasket size={20} className="mr-2" />
              Blogs
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 text-red-500 hover:bg-gray-800 rounded-lg"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* ================================ Main Content ================================ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">{getTitle()}</h2>
            <div></div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <Outlet
              context={{
                categories,
                countries,
                blogs,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
