import { create } from "zustand";

interface ModalStore<T = unknown> {
    modalType: string | null;  // Modal name or null if no modal is open
    openModal: (modalName: string,data?:unknown) => void;  // Function to open a modal
    closeModal: () => void;  // Function to close the modal
    modalData:T | null;
  }

export const useModalStore = create<ModalStore>((set) => ({
    modalType: null, // Stores the currently open modal's name (or null if no modal is open)
    modalData:null,
    openModal: (modalName: string,data?: unknown) => set(() => ({ modalType: modalName,modalData:data })),
    closeModal: () => set(() => ({ modalType: null })),
  }));