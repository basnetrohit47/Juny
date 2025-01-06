import { useQuery } from "@tanstack/react-query"
import { getImage } from "../api/image.api"

export const useGetImage = ()=>{
    return useQuery({
        queryFn:getImage,
        queryKey:['image'],
        retry: 2, // Retry a maximum of 3 times
        staleTime: 1000000, // Data stays fresh for 5 minutes



    })
}