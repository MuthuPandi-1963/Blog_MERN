import { useQuery } from "@tanstack/react-query"
import { CountriesAPI } from "../api/countries"

export const useCountries = ()=>{
    const {data , isLoading , isError,error} = useQuery({
        queryKey : ["countries"],
        queryFn : CountriesAPI.getAll,
        select : (res) => res.data
    })
    return {
        countries : data?.data || [],
        isError,
        isLoading
    }
}