import { useQuery } from "@tanstack/react-query"
import { BlogAPI } from "../api/blog"

export const useBlogs = ()=>{
    const {data , isLoading , isError,error} = useQuery({
        queryKey : ["blogs"],
        queryFn : BlogAPI.getAll,
        select : (res) => res.data
    })
    return {
        blogs : data?.data || [],
        isError,
        isLoading
    }
}