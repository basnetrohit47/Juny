import { ClockComponent } from "../components/clock/ClockComponent";
import { GoogleAppComponent } from "../components/shortcut/GoogleAppComponent";
import { CreditComponent } from "../components/image/CreditComponent";
import { useGetImage } from "../queries/image.query";
import { FavouriteComponent } from "../components/favourite/FavouriteComponent";
import { ModalManager } from "../modals/ModalManager";
import { ToastManager } from "../components/toast/ToastManager";
import { SearchComponent } from "../components/search/SearchCompnent";
import TodoOpener from "../components/todo/TodoOpener";

export const MainLayout = () => {
  const { data: image, isLoading } = useGetImage();

  const backgroundStyle = isLoading
    ? {
        backgroundColor: "rgb(255 255 255 / 64%)",
      } // Use a fallback color while loading
    : {
        backgroundImage: `url(${image?.image_url})`,
        backgroundPosition: image?.bg_position || "center",
      };
  return (
    <>
      <div
        style={backgroundStyle}
        className={`bg-cover bg-center transition-opacity duration-500 ease-in-out h-screen opacity-0 p-5 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col h-full ">
          <div className="flex w-full">
            <div className="w-[30%]">
              <ClockComponent />
              <FavouriteComponent />
            </div>
            <div className="ml-auto">
              <GoogleAppComponent />
            </div>
          </div>
          <div className="mt-auto flex w-full justify-center items-center">
            <div className="mr-auto max-w-[500px] pl-5">
              <CreditComponent />
            </div>
            <div className="w-[50%]">
              <SearchComponent />
            </div>
            <div className="ml-auto">
              <TodoOpener />
            </div>
          </div>
        </div>
      </div>
      <ModalManager />
      <ToastManager />
    </>
  );
};
