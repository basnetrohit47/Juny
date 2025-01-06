import { useGetFavourite } from "../../queries/favourite.query";
import { FavoriteItemComponent } from "./FavoriteItemComponent";
import { AddFavourite } from "./actions/AddFavourite";

export const FavouriteComponent = () => {
  const { data: favourite } = useGetFavourite();

  return (
    <>
      <div className="m-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 p-4 ">
        {favourite?.map((item) => (
          <FavoriteItemComponent item={item} key={item.id} />
        ))}
        <AddFavourite />
      </div>
    </>
  );
};
