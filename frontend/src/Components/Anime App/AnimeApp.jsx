import Home from "../Sections/Home/Home"
import CreateBlog from "../Sections/CreateBlog/CreateBlog"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../custom/Navbar'
import Register from "../../pages/auth/Register"
import Login from "../../pages/auth/Login"
import VerifyEmail from "../../pages/auth/VerifyEmail"
import { AdminRoutes } from "../../routes/AdminRoutes"
import Hero from "../custom/Hero"
import BlogViewPage from "../../pages/Main/ViewBlogs"
import { NewsPage } from "../../pages/Main/News"
import { BlogGrid } from "../../pages/Main/BlogGrid"
import  Categories  from "../../pages/Main/Categories"
import Profile from "../../pages/Main/Profile"
import { BookmarksPage } from "../../pages/Main/Bookmarks"


function AnimeApp() {
  return (
      <BrowserRouter>
        <Navbar/>
      <Routes>
              <Route path='/' element={<Hero/>} />
              {AdminRoutes}
              <Route path='/createBlog' element={<CreateBlog/>} ></Route>
              <Route  path="/register" element={<Register/>} ></Route>
              <Route  path="/login" element={<Login/>} ></Route>
              <Route  path="/verify-email" element={<VerifyEmail/>} ></Route>
              <Route path="/blogs/:id" element={<BlogViewPage/>}/>
              <Route path="/news" element={<NewsPage/>}/>
              <Route path="/blogs" element={<BlogGrid/>}/>
              <Route path="/categories" element={<Categories/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="bookmarks" element={<BookmarksPage/>}/>
        </Routes> 
      </BrowserRouter>
    
  )
}

export default AnimeApp