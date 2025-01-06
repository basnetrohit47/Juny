import { ImageField } from "../schemas/image.schema";
import { apiClient } from "../utils/apiClient"
import { clearOldestImage } from "../utils/clearnOldestImage";
import {    getStoreValue, setStoreValue } from "../utils/localStorageUtil";

export const getImage =async ()=>{
   const today = new Date();

   const formattedDate = today.toISOString().split('T')[0]; // Extracts the YYYY-MM-DD part

   const key = `juny-bg-${formattedDate}`;

   const getStoredPhoto = await getStoreValue<ImageField>(key);
   if(getStoredPhoto){
      return getStoredPhoto;
   }
   const response = await apiClient<ImageField>({url:`api/photo`});
     setStoreValue<ImageField>(key,response)
     await clearOldestImage(); 

   return response;
}


