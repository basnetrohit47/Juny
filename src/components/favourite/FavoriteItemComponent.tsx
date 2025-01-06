import { useState } from "react";
import { FavouriteAction } from "./actions/FavouriteAction";
import { Link } from "@mui/material";
import { FavouriteField } from "../../schemas/favourite.schema";
import { getFavicon } from "../../utils/getFavicon";

interface Props {
  item: FavouriteField;
}

export const FavoriteItemComponent = ({ item }: Props) => {
  const favicon = getFavicon(item.url ?? "");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Link
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        href={item.url}
        className="w-14 h-14 rounded-lg relative bg-white/20 backdrop-blur-md no-underline"
      >
        {isHovered && (
          <div className="absolute -top-3 -right-2">
            <FavouriteAction item={item} />
          </div>
        )}

        <div className="flex items-center justify-center w-full h-full rounded-lg pl-3 pr-3 bg-[rgb(18,18,18)/20]">
          <img src={favicon} alt="" />
        </div>
        <p className="text-gray-50	text-xs	font-semibold	mt-2 truncate max-w-[10ch]">
          {item.title}
        </p>
      </Link>
    </>
  );
};
