
import { useState, useEffect } from 'react'
import { BiBookmark, BiSearch, BiMenu, BiX } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  
  const navLinks = ['home', 'articles', 'explore', 'trending',"createBlog"]

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setWindowWidth(width)
      
      // Close mobile menu when window is resized to desktop size
      if (width >= 1200) {
        setIsMobileMenuOpen(false)
      }
      
      // Close search on medium screens when it's not needed
      if (width >= 768 && width < 1200) {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  // function handleClick(e, link){
  //   if (link === "Create Blog") return navigate('/createBlog')
  // }

  return (
    <nav className='flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15 py-4 md:py-6 lg:py-9 bg-[#111110] shadow-2xl relative'>
      {/* Logo */}
      <div className="flex items-center gap-3 text-white text-2xl sm:text-3xl lg:text-4xl">
        {/* <img src={logo} alt="" width="50px" /> */}
        News <span className='text-[#f17a31]'>24</span> 
      </div>
      
      {/* Navigation Links - Visible on screens 1200px and larger */}
      <div className="hidden xl:flex navLinks text-white text-lg transition-all duration-300">
        <ul className='flex gap-6 xl:gap-8 items-center'>
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link 
              to={`/${link}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveNav(link)
                }}
                  
                className={`${activeNav === link ? "text-[#f17a31]" : ""} capitalize  hover:border-b-2 hover:border-[#f17a31] px-1.5 pb-1.5 hover:text-[#f17a31] transition-colors duration-300`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right side content - Different layouts based on screen size */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
        {/* Search input - Visible on medium and large screens */}
        {windowWidth >= 768 && windowWidth < 1200 && (
          <div className="navSearch relative text-black cursor-pointer">
            <label htmlFor="search" className="flex items-center">
              <input 
                type="text" 
                id='search' 
                className='bg-gray-300 rounded-full px-3 py-1.5 text-black text-sm w-40 md:w-48 outline-none' 
                placeholder="Search..."
              />
              <BiSearch size={18} className='absolute right-2 cursor-pointer' />
            </label>
          </div>
        )}
        
        {/* Full right side - Visible on screens 1200px and larger */}
        {windowWidth >= 1200 && (
          <>
            <div className="navSearch relative text-black cursor-pointer">
              <label htmlFor="search" className="flex items-center">
                <input 
                  type="text" 
                  id='search' 
                  className='bg-gray-300 rounded-full px-3 py-1.5 text-black text-base outline-none' 
                  placeholder="Search..."
                />
                <BiSearch size={20} className='absolute right-2 cursor-pointer' />
              </label>
            </div>
            
            <div className="bookmark text-white cursor-pointer group">
              <BiBookmark size={28}/>
            </div>
            
            <div className="profile text-white flex gap-1 items-center cursor-pointer">
              <CgProfile size={28} /> 
              <span className='text-lg'></span>
            </div>
          </>
        )}
        
        {/* Search icon - Visible on small screens and when search is not open */}
        {(windowWidth < 768 || (windowWidth >= 1200 && isSearchOpen)) && (
          <div className="text-white cursor-pointer" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <BiSearch size={24} />
          </div>
        )}
        
        {/* Hamburger menu - Visible on screens smaller than 1200px */}
        {windowWidth < 1200 && (
          <div className="text-white cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <BiX size={30} /> : <BiMenu size={30} />}
          </div>
        )}
      </div>
      
      {/* Mobile Search Bar - Appears when search is toggled on small screens */}
      {isSearchOpen && windowWidth < 768 && (
        <div className="absolute top-full left-0 right-0 bg-[#111110] p-4 shadow-md">
          <div className="flex items-center">
            <input 
              type="text" 
              className='bg-gray-300 rounded-full px-4 py-2 text-black w-full outline-none' 
              placeholder="Search..."
              autoFocus
            />
            <BiSearch size={20} className='ml-2 text-white cursor-pointer' />
          </div>
        </div>
      )}
      
      {/* Mobile Menu - Appears when hamburger menu is toggled on screens < 1200px */}
      {isMobileMenuOpen && windowWidth < 1200 && (
        <div className="absolute top-full left-0 right-0 bg-[#111110] p-6 shadow-2xl z-50">
          <ul className='flex flex-col gap-4 text-white'>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={`/${link}`}
                  onClick={() => {
                    setActiveNav(link)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`${activeNav === link ? "text-[#f17a31]" : ""} capitalize hover:bg-gray-500/10 hover:rounded text-lg block py-2 border-b border-gray-800 last:border-b-0`}
                >
                  {link}
                </Link>
              </li>
            ))}
            
            {/* Additional menu items for mobile */}
            <li className="pt-4 mt-2">
              <div className="flex items-center gap-3 text-white cursor-pointer py-2">
                <BiBookmark size={22} />
                <span>Bookmarks</span>
              </div>
            </li>
            
            <li>
              <div className="flex items-center gap-3 text-white cursor-pointer py-2">
                <CgProfile size={24} /> 
                <span>Santhosh Kumar</span>
              </div>
            </li>
            
            {/* Search in mobile menu for medium screens */}
            {windowWidth >= 768 && windowWidth < 1200 && (
              <li className="pt-4">
                <div className="flex items-center bg-gray-300 rounded-full px-4 py-2">
                  <input 
                    type="text" 
                    className='bg-transparent text-black w-full outline-none' 
                    placeholder="Search..."
                  />
                  <BiSearch size={20} className='text-gray-600 cursor-pointer' />
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>  
  )
}

export default Navbar
