import { axiosInstance } from "./axiosInstance";

const url = "categories"
export const CategoryAPI = {

    getAll : ()=>axiosInstance.get(`/${url}`)
}