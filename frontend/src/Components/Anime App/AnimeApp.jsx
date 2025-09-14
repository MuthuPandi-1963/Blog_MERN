import Home from "../Sections/Home/Home"
import CreateBlog from "../Sections/CreateBlog/CreateBlog"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Sections/Navbar/Navbar'
import Mainroutes from "../../routes/Mainroutes"
import AdminRoutes from "../../routes/AdminRoutes"


function AnimeApp() {
  return (
      <BrowserRouter>
        <Navbar/>
      <Routes>
        <Mainroutes/>
        <AdminRoutes/>
              <Route path='/createBlog' element={<CreateBlog/>} ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default AnimeApp