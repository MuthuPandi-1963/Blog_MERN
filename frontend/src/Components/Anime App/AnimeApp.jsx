import Home from "../Sections/Home/Home"
import CreateBlog from "../Sections/CreateBlog/CreateBlog"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from '../Sections/Navbar/Navbar'


function AnimeApp() {
  return (
      <BrowserRouter>
        <Navbar/>
      <Routes>
              <Route path="/"  element={<Home/>} ></Route>
              <Route path='/createBlog' element={<CreateBlog/>} ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default AnimeApp