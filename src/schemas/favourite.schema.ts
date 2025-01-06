import { z } from "zod";

export const favouriteSchema = z.object({
    id:z.number(),
    title:z.string().optional(),
    url:z.string().url({message:"Invalid URL format"}),
    created_at:z.string(),
})
 
export const createFavouriteSchema = favouriteSchema.omit({ id: true }); // id is omitted
export type CreateFavouriteField = z.infer< typeof createFavouriteSchema>

export type FavouriteField = z.infer<typeof favouriteSchema>