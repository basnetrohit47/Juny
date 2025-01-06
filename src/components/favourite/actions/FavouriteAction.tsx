import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import {
  CreateFavouriteField,
  FavouriteField,
} from "../../../schemas/favourite.schema";
import {
  useAddFavourite,
  useDeleteFavourite,
} from "../../../queries/favourite.query";
import { useToastStore } from "../../../store/toast.store";
interface Props {
  item: FavouriteField;
}
export const FavouriteAction = ({ item }: Props) => {
  let deletedItem: CreateFavouriteField | null = null;
  const openToast = useToastStore((state) => state.showToast);
  const { mutate: deleteFavourite } = useDeleteFavourite();
  const { mutate: addFavourite } = useAddFavourite();

  const handleRestore = () => {
    if (deletedItem) {
      addFavourite(deletedItem); // Restore the deleted item

      openToast("success", "Shortcut restored");
      deletedItem = null;
    }
  };
  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent default anchor tag behavior
    deletedItem = { url: item.url ?? "", title: item.title, created_at: "" };
    await deleteFavourite(item.id);
    openToast("info", "Shortcut removed ", handleRestore);
  };

  return (
    <>
      <IconButton
        className="absolute  "
        size="small"
        sx={{
          backgroundColor: "rgb(255 255 255 / 50%)",
          padding: "2px",
          "&:hover": {
            backgroundColor: "white", // Background color on hover
          },
        }}
        id="basic-button"
        onClick={handleDelete}
      >
        <ClearIcon className="text-black " sx={{ fontSize: "12px" }} />
      </IconButton>
    </>
  );
};
