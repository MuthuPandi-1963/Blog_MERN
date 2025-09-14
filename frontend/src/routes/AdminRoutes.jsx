import { Route } from "react-router-dom";
import Countries from "../pages/admin/Countries";
import Blogs from "../pages/admin/Blogs";
import AdminPanel from "../pages/admin/AdminPanel";
import Categories from "../pages/admin/Categories";


export const AdminRoutes = (
  <Route path="/admin" element={<AdminPanel />}>
    <Route index element={<Categories />}/>
    <Route path="countries" element={<Countries />} />
    <Route path="blogs" element={<Blogs />} />
  </Route>
)