
import { useContext, useEffect } from 'react'
import AnimeApp from './Components/Anime App/AnimeApp'
import './index.css'
import { userContext } from './store/Context'
import axiosInstance from './helpers/AxiosInstance'
function App() {

  // const {user, setUser} = useContext(userContext);
  const {user,setUser} = useContext(userContext);
  console.log("User from context:", user);
  

  useEffect(() => {
    const fetUser = async () => {
      try{
        const response = await axiosInstance.get('/auth/refresh-token');
        console.log("User data:", response.data);
        setUser(response.data.data)
      }
      catch(err){
        console.log("Error fetching user data:", err);
      } 
    }
    fetUser();

  }, [])

  return (
    <div className="App">
      {/* <AdminPanel/> */}

      <AnimeApp/>
    </div>
  )
}

export default App
