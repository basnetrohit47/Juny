import { FavouriteForm } from "../components/favourite/forms/FavouriteForm";
import { useModalStore } from "../store/modal.store";

export const ModalManager = () => {
  const modalType = useModalStore((state) => state.modalType);

  if (!modalType) return null;

  switch (modalType) {
    case "new_favourite":
      return <FavouriteForm />;
    default:
      return null;
  }
};
