import axios, { AxiosRequestConfig } from "axios";
import { getEnvironment } from "./getEnvironment";


const env = getEnvironment();

const API_BASE_URL = env === "chrome"?"http://api.getjuny.com":"http://0.0.0.0:5000";


interface ApiConfig extends AxiosRequestConfig{
    url:string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export const apiClient = async<T>({url,method="GET",data=null,params=null,headers={}}:ApiConfig):Promise<T>=>{
    
    try{
        const response = await axios({
            url:`${API_BASE_URL}${url}`,
            method,
            params,
            data,
            headers:{
                ...headers,
            }
        })
        return response.data

    }catch(error){
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
          }
          throw new Error('Network Error');
    }
    
}


