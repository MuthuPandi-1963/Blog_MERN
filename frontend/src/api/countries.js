import { axiosInstance } from "./axiosInstance";

const url = "countries"
export const CountriesAPI = {

    getAll : ()=>axiosInstance.get(`/${url}`)
}