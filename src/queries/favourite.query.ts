// bookmarks.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavourite, deleteFavourite, getFavourites } from "../api/favourite.api";

export const useGetFavourite = () => {
  return useQuery({
    queryKey:['favourite'],
    queryFn:getFavourites,
    retry: 2, 
    staleTime: 6000000, // Data stays fresh for 5 minutes
  })
};


export const useAddFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addFavourite,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["favourite"]
            })
            queryClient.refetchQueries({ queryKey: ["favourite"] });

        }
    })
  };

export const useDeleteFavourite = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteFavourite,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['favourite']
            })
        }
    })
}

