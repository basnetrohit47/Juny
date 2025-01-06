import { z } from "zod";

export const imageSchema = z.object({
    description:z.string().optional().nullable(),
    credential:z.string().optional().nullable(),
    title:z.string().optional().nullable(),
    image_url:z.string().url({message:"Invalid URL format"}),
    credential_link:z.string().url({message:"Invalid URL format"}).optional().nullable(),
    link:z.string().url({message:"Invalid URL format"}).optional().nullable(),
    credit:z.string().nullable().optional(),
    bg_position:z.string().nullable().optional(),


   
})

export type ImageField = z.infer<typeof imageSchema>