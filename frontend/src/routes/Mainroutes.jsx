import { Route } from 'react-router-dom'
import Navbar from '../Components/Sections/Navbar/Navbar'


function Mainroutes() {
  return (
    <div>
      < Navbar/>
      <Route path="/"  element={<Home/>} ></Route>
    
    </div>
  )
}

export default Mainroutes