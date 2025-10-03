import { useQuery } from "@tanstack/react-query"
import { CategoryAPI } from "../api/category"

export const useCategories = ()=>{
    const {data , isLoading , isError,error} = useQuery({
        queryKey : ["categories"],
        queryFn : CategoryAPI.getAll,
        select : (res) => res.data
    })
    return {
        categories : data?.data || [],
        isError,
        isLoading
    }
}