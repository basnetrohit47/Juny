import { getFavStore } from "../db/favourite.db";
import { CreateFavouriteField, FavouriteField } from "../schemas/favourite.schema";
import { getDomainName } from "../utils/getDomainName";



export const addFavourite = async(newFavourite:CreateFavouriteField):Promise<void>=>{
    const store = await getFavStore();

    const favouriteWithDate: CreateFavouriteField = {
        ...newFavourite,
        title:newFavourite.title===""?getDomainName(newFavourite.url):newFavourite.title,
        created_at: new Date().toISOString(),
    };
    const request = store.add(favouriteWithDate);
    return new Promise((resolve,reject)=>{
        request.onsuccess = ()=>{
            resolve();

        }

        request.onerror = (event:Event)=>{
            const error = (event.target as IDBRequest).error;

            reject(error)
        }
    })


}
export const getFavourites = async():Promise<FavouriteField[]>=>{
    const store = await getFavStore();
    const request:IDBRequest<FavouriteField[]> = store.getAll();
    return new Promise((resolve,reject)=>{
        request.onsuccess = ()=>{
            resolve(request.result);

        }

        request.onerror = (event:Event)=>{
            const error = (event.target as IDBRequest).error;

            reject(error)
        }
    })


}
export const deleteFavourite = async(id:number):Promise<void>=>{
    const store = await getFavStore();

    return new Promise((resolve,reject)=>{
        const request = store.delete(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    })
    
}