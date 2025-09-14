// import { useState } from 'react';
// import ImageUpload from './Components/Sections/cloudinary/ImageUpload'
// function App() {
//   const [imageUrl, setImageUrl] = useState('');
//   console.log(imageUrl);
  

//   return (
//     <div className="App">
//       <h2>Cloudinary Upload Widget Demo</h2>
//       <ImageUpload onUpload={setImageUrl} />
//       {imageUrl && (
//         <div>
//           <p>Uploaded Image:</p>
//           <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import AnimeApp from './Components/Anime App/AnimeApp'
import './index.css'
import AdminPanel from './pages/admin/AdminPanel'
import Register from './pages/auth/Register'
function App() {
  return (
    <div className="App">
      {/* <AdminPanel/> */}
      <Register/>
    </div>
  )
}

export default App
