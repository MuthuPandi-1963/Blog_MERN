import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://newsdata.io/api/1";

/**
 * Fetch latest news from NewsData API
 */
export const useNews = ({ query = "ai", country = "in" } = {}) => {
  const apikey = import.meta.env.VITE_NEWS_API;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["news", query, country],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/latest?apikey=${apikey}&country=${country}`
      );
      console.log(res,"ress");
      
      return res.data?.results || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};
