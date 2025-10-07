import { useState, useEffect, useContext } from "react";
import { BiBookmark, BiSearch, BiMenu, BiX, BiBell } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../../store/Context";
import { Button } from "@/components/ui/button";
import { useCategories } from "../../hooks/useCategories";
import { useCountries } from "../../hooks/useCountries";

function Navbar() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useCategories();
  const { countries } = useCountries();

  const [activeNav, setActiveNav] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Navigation links structure with dropdowns
  const navLinks = [
    {
      name: "home",
      path: "/",
      dropdown: null,
    },
    {
      name: "news",
      path: "/news",
      dropdown: {
        items: [...countries.map((val) => val.name)],
      },
    },
    {
      name: "categories",
      path: "/categories",
      dropdown: {
        items: [...categories.map((val) => val.name)],
      },
    },
    {
      name: "blogs",
      path: "/blog",
      dropdown: {
        items: [],
      },
    },
    {
      name: "createBlog",
      path: "/createBlog",
      dropdown: null,
      roleRequired: ["writer", "admin"],
    },
  ];

  // Role-specific links
  const roleSpecificLinks = {
    admin: [
      {
        name: "Manage Writers",
        path: "/admin/writers",
        color: "text-amber-500",
      },
      {
        name: "Approve Content",
        path: "/admin/approve",
        color: "text-amber-500",
      },
    ],
    writer: [
      {
        name: "My Submissions",
        path: "/writer/submissions",
        color: "text-purple-500",
      },
    ],
    reader: [],
  };

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width >= 1200) {
        setIsMobileMenuOpen(false);
      }

      if (width >= 768 && width < 1200) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set active nav based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = navLinks.find(
      (link) =>
        link.path === currentPath ||
        (link.path !== "/" && currentPath.startsWith(link.path))
    );
    if (activeLink) {
      setActiveNav(activeLink.name);
    }
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleNavClick = (linkName, linkPath) => {
    setActiveNav(linkName);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    navigate(linkPath);
  };

  const shouldShowLink = (link) => {
    if (!link.roleRequired) return true;
    return user?.isVerified && link.roleRequired.includes(user.role);
  };

  // Filter links based on user role
  const filteredNavLinks = navLinks.filter(shouldShowLink);
  const userRole = user?.isVerified ? user.role : "reader";
  const userSpecificLinks = roleSpecificLinks[userRole] || [];

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-800 hover:scale-105 transition-transform duration-300"
            onClick={() => setActiveNav("home")}
          >
            News<span className="text-orange-500">24</span>
          </Link>
        </div>

        {/* Desktop Navigation Links - Center */}
        <div className="hidden xl:flex items-center space-x-8">
          {filteredNavLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    className={`flex items-center text-gray-900 hover:text-blue-500 transition-colors duration-300 capitalize ${
                      activeNav === link.name ? "text-blue-800 font-bold" : ""
                    }`}
                  >
                    <Link to={`${link.path}`}>{link.name}</Link>
                    {link.dropdown.items.length > 0 && (
                      <svg
                        onClick={(e) => toggleDropdown(link.name, e)}
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      {link.dropdown.items.map((item) => (
                        <button
                          key={item}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => handleNavClick(link.name, link.path)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`text-gray-900 hover:text-blue-500 transition-colors duration-300 capitalize ${
                    activeNav === link.name ? "text-blue-800 font-bold" : ""
                  }`}
                  onClick={() => handleNavClick(link.name, link.path)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Role-specific links */}
          {userSpecificLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${link.color} font-medium hover:underline transition-all duration-300`}
              onClick={() => setActiveDropdown(null)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Visible on medium and large screens */}
          {windowWidth >= 768 && windowWidth < 1200 && (
            <div className="relative text-black cursor-pointer">
              <label htmlFor="search" className="flex items-center">
                <input
                  type="text"
                  id="search"
                  className="bg-gray-100 rounded-full px-3 py-2 text-black text-sm w-40 md:w-48 outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-800"
                  placeholder="Search..."
                />
                <BiSearch
                  size={18}
                  className="absolute right-3 cursor-pointer text-blue-500"
                />
              </label>
            </div>
          )}

          {/* Full right side - Visible on screens 1200px and larger */}
          {windowWidth >= 1200 && (
            <>
              <div className="relative text-black cursor-pointer">
                <label htmlFor="search" className="flex items-center">
                  <input
                    type="text"
                    id="search"
                    className="bg-gray-100 rounded-full truncate px-4  py-2 text-black text-base outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-800 w-64"
                    placeholder="country, or category"
                  />
                  <BiSearch
                    size={20}
                    className="absolute right-3 ml-2 cursor-pointer text-blue-500"
                  />
                </label>
              </div>

              {/* Bookmarks */}
              <button
                onClick={() =>
                  user?.isVerified ? navigate("/bookmarks") : navigate("/login")
                }
                className="text-gray-900 hover:text-blue-500 transition-colors duration-300"
              >
                <BiBookmark size={24} />
              </button>

              {/* Profile */}
              {user?.isVerified ? (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 focus:outline-none"
                    onClick={(e) => toggleDropdown("profile", e)}
                  >
                    <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium hover:scale-105 transition-transform duration-300">
                      <CgProfile size={20} />
                    </div>
                    <span className="text-gray-900">{user.name}</span>
                  </button>

                  {activeDropdown === "profile" && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">

                      <Link to={"/profile"} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                      {user.role !== "READER" && (
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Dashboard
                        </button>
                      )}
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 border-t mt-1">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="ring-1 ring-orange-500 text-lg bg-white text-black hover:text-white cursor-pointer hover:bg-gray-300"
                >
                  Login
                </Button>
              )}
            </>
          )}

          {/* Search icon - Visible on small screens and when search is not open */}
          {(windowWidth < 768 || (windowWidth >= 1200 && isSearchOpen)) && (
            <button
              className="text-gray-900 hover:text-blue-500 transition-colors duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <BiSearch size={24} />
            </button>
          )}

          {/* Hamburger menu - Visible on screens smaller than 1200px */}
          {windowWidth < 1200 && (
            <button
              className="text-gray-900 hover:text-blue-500 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <BiX size={30} /> : <BiMenu size={30} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar - Appears when search is toggled on small screens */}
      {isSearchOpen && windowWidth < 768 && (
        <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-md border-t">
          <div className="flex items-center">
            <input
              type="text"
              className="bg-gray-100 rounded-full px-4 py-2 text-black w-full outline-none transition-all duration-300 focus:ring-1 focus:ring-blue-800"
              placeholder="Search..."
              autoFocus
            />
            <BiSearch size={20} className="ml-2 text-blue-500 cursor-pointer" />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && windowWidth < 1200 && (
        <div className="fixed inset-0 bg-blue-800 z-40 pt-[70px]">
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Search */}
            <div className="mb-6">
              <div className="flex items-center bg-blue-700 rounded-lg px-3 py-2">
                <BiSearch size={20} className="text-blue-300 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-white w-full placeholder-blue-300"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {filteredNavLinks.map((link) => (
                <div key={link.name} className="text-white">
                  {link.dropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full py-2 text-lg font-medium capitalize"
                        onClick={(e) =>
                          toggleDropdown(`mobile-${link.name}`, e)
                        }
                      >
                        {link.name}
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeDropdown === `mobile-${link.name}`
                              ? "rotate-180"
                              : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeDropdown === `mobile-${link.name}` && (
                        <div className="pl-4 mt-2 space-y-2">
                          {link.dropdown.items.map((item) => (
                            <button
                              key={item}
                              className="block w-full text-left py-2 text-blue-100 hover:text-white transition-colors duration-200"
                              onClick={() =>
                                handleNavClick(link.name, link.path)
                              }
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className={`block w-full text-left py-2 text-lg font-medium hover:text-blue-300 transition-colors duration-200 capitalize ${
                        activeNav === link.name ? "text-blue-300" : ""
                      }`}
                      onClick={() => handleNavClick(link.name, link.path)}
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              ))}

              {/* Role-specific links for mobile */}
              {userSpecificLinks.map((link) => (
                <button
                  key={link.name}
                  className={`block w-full text-left py-2 text-lg font-medium ${link.color} hover:underline transition-all duration-300`}
                  onClick={() => handleNavClick(link.name, link.path)}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile User Info */}
            <div className="mt-8 pt-6 border-t border-blue-700">
              {user?.isVerified ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium mr-3">
                      <CgProfile size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-blue-300 text-sm capitalize">
                        {user.role}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="block w-full text-left text-blue-100 hover:text-white transition-colors duration-200">
                      Profile
                    </button>
                    {user.role !== "reader" && (
                      <button className="block w-full text-left text-blue-100 hover:text-white transition-colors duration-200">
                        Dashboard
                      </button>
                    )}
                    <button className="block w-full text-left text-red-400 hover:text-red-300 transition-colors duration-200">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full ring-1 ring-orange-500 text-lg bg-white text-black hover:text-white cursor-pointer hover:bg-gray-300"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
