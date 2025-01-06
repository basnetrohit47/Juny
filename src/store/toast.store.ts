import { create } from "zustand";

interface ToastStore{
    isOpen:boolean,
    message:string|null,
    toastType:string|null,
    showToast:(toastType:string,message:string,action?:(()=>void)|null)=>void,
    hideToast:()=>void,
    toastAction:(()=>void)|null

}
export const useToastStore = create<ToastStore>((set)=>({
    isOpen:false,
    message:null,
    toastType:null,
    toastAction:null,
    showToast:(toastType:string,message:string,toastAction?:(()=>void)|null)=>set(()=>({toastType,message,isOpen:true,toastAction:toastAction||null})),
    hideToast: () => set(() => ({ toastType: null,isOpen:false })),

    
}))