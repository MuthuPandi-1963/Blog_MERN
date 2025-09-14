import Home from "../Sections/Home/Home"
import CreateBlog from "../Sections/CreateBlog/CreateBlog"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Sections/Navbar/Navbar'
import Register from "../../pages/auth/Register"
import Login from "../../pages/auth/Login"
import VerifyEmail from "../../pages/auth/VerifyEmail"
import { AdminRoutes } from "../../routes/AdminRoutes"


function AnimeApp() {
  return (
      <BrowserRouter>
        <Navbar/>
      <Routes>
              <Route path='/' element={<Home/>} />
              {AdminRoutes}
              <Route path='/createBlog' element={<CreateBlog/>} ></Route>
              <Route  path="/register" element={<Register/>} ></Route>
              <Route  path="/login" element={<Login/>} ></Route>
              <Route  path="/verify-email" element={<VerifyEmail/>} ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default AnimeApp