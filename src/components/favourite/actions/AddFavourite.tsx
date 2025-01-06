import AddIcon from "@mui/icons-material/Add";
import { useModalStore } from "../../../store/modal.store";
import { IconButton } from "@mui/material";
export const AddFavourite = () => {
  const openModal = useModalStore((state) => state.openModal);
  const handleClick = () => {
    openModal("new_favourite");
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="w-14 h-14 rounded-lg cursor-pointer bg-white/20 backdrop-blur-md"
      >
        <div className="flex items-center justify-center w-full h-full rounded-lg pl-3 pr-3 bg-[rgba(18,18,18,0.2)]">
          <IconButton>
            <AddIcon fontSize="large" />
          </IconButton>
        </div>
        <p className="text-gray-50	text-xs	font-semibold	mt-2 truncate max-w-[10ch]">
          Add site
        </p>
      </div>
    </>
  );
};
