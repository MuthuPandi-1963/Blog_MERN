import Home from "../Sections/Home/Home"
import CreateBlog from "../Sections/CreateBlog/CreateBlog"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Sections/Navbar/Navbar'
import Mainroutes from "../../routes/Mainroutes"
import AdminRoutes from "../../routes/AdminRoutes"
import Register from "../../pages/auth/Register"
import Login from "../../pages/auth/Login"


function AnimeApp() {
  return (
      <BrowserRouter>
        <Navbar/>
      <Routes>
              <Route path='/' element={<Home/>} ></Route>
              <Route path='/createBlog' element={<CreateBlog/>} ></Route>
              <Route  path="/register" element={<Register/>} ></Route>
              <Route  path="/login" element={<Login/>} ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default AnimeApp