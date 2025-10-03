import { axiosInstance } from "./axiosInstance";

const url = "blogs"
export const BlogAPI = {

    getAll : ()=>axiosInstance.get(`/${url}`)
}